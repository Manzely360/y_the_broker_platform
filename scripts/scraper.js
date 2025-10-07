#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');
const { got } = require('got');
const sharp = require('sharp');
const cheerio = require('cheerio');

// Configuration
const BASE_URL = 'https://ythebrokers.com';
const CONCURRENCY_LIMIT = 3;
const JITTER_MIN = 300;
const JITTER_MAX = 700;
const MAX_WIDTH = 2560;

// Check copyright permission
if (process.env.COPYRIGHT_OK !== '1') {
  console.error('❌ Scraper disabled. Set COPYRIGHT_OK=1 to enable.');
  process.exit(1);
}

// Data structures
const pages = [];
const projects = [];
const assets = {
  images: [],
  videos: [],
  fonts: [],
  broken: []
};
const designTokens = {
  colors: {},
  fonts: {},
  spacing: {}
};
/** Skip noisy or dead assets and avoid re-downloading */
const ASSET_DENYLIST = [
  /logo-houzez-white\.png$/i,
  /placehold\.it/i,
  /placeholder\.com/i
];
const seenAssets = new Set();
function isDenied(url) {
  try { return ASSET_DENYLIST.some(rx => rx.test(url)); } catch { return false; }
}

// Rate limiting
class RateLimiter {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async execute(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { fn, resolve, reject } = this.queue.shift();

    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }
}

const rateLimiter = new RateLimiter(CONCURRENCY_LIMIT);

// Utility functions
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomJitter() {
  return Math.floor(Math.random() * (JITTER_MAX - JITTER_MIN + 1)) + JITTER_MIN;
}

function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin === BASE_URL;
  } catch {
    return false;
  }
}

function extractSlug(url) {
  const pathname = new URL(url).pathname;
  return pathname.replace(/^\//, '').replace(/\/$/, '') || 'home';
}

function isInternal(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin === BASE_URL;
  } catch {
    return false;
  }
}

function slugOf(url) {
  try {
    return extractSlug(url);
  } catch {
    return 'asset';
  }
}

// Asset download and processing
async function downloadAsset(url, type, outputPath) {
  try {
    const response = await got(url, { responseType: 'buffer' });
    const buffer = response.body;
    
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    if (type === 'image') {
      // Process image with Sharp
      const image = sharp(buffer);
      const metadata = await image.metadata();
      
      if (metadata.width > MAX_WIDTH) {
        await image.resize(MAX_WIDTH).jpeg({ quality: 85 }).toFile(outputPath);
      } else {
        await fs.writeFile(outputPath, buffer);
      }
      
      // Create WebP version
      const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      await image.webp({ quality: 85 }).toFile(webpPath);
      
      return { success: true, width: metadata.width, height: metadata.height };
    } else {
      await fs.writeFile(outputPath, buffer);
      return { success: true };
    }
  } catch (e) {
    // log once per unique asset URL
    if (!seenAssets.has(`${url}:error`)) {
      console.error('asset error', url, e.message);
      seenAssets.add(`${url}:error`);
    }
    assets.broken.push(url);
    return { success: false, error: e.message };
  }
}

// Extract design tokens from CSS
function extractDesignTokens(page) {
  const $ = cheerio.load(page);
  
  // Extract CSS variables
  const styleTags = $('style, link[rel="stylesheet"]');
  styleTags.each((i, el) => {
    if (el.tagName === 'style') {
      const css = $(el).html();
      extractCSSVariables(css);
    }
  });
  
  // Extract computed styles from elements
  $('*').each((i, el) => {
    const $el = $(el);
    const color = $el.css('color');
    const bgColor = $el.css('background-color');
    const fontSize = $el.css('font-size');
    const fontFamily = $el.css('font-family');
    
    if (color && color !== 'rgba(0, 0, 0, 0)') {
      designTokens.colors[`text-${i}`] = color;
    }
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
      designTokens.colors[`bg-${i}`] = bgColor;
    }
    if (fontSize) {
      designTokens.fonts[`size-${i}`] = fontSize;
    }
    if (fontFamily) {
      designTokens.fonts[`family-${i}`] = fontFamily;
    }
  });
}

function extractCSSVariables(css) {
  const varRegex = /--([^:]+):\s*([^;]+);/g;
  let match;
  
  while ((match = varRegex.exec(css)) !== null) {
    const [, name, value] = match;
    if (name.includes('color')) {
      designTokens.colors[name] = value.trim();
    } else if (name.includes('font')) {
      designTokens.fonts[name] = value.trim();
    } else if (name.includes('spacing') || name.includes('margin') || name.includes('padding')) {
      designTokens.spacing[name] = value.trim();
    }
  }
}

// Extract page data
function extractPageData(url, html) {
  const $ = cheerio.load(html);
  const slug = extractSlug(url);
  
  const pageData = {
    slug,
    url,
    title: $('title').text().trim(),
    description: $('meta[name="description"]').attr('content') || '',
    canonical: $('link[rel="canonical"]').attr('href') || url,
    ogTitle: $('meta[property="og:title"]').attr('content') || '',
    ogDescription: $('meta[property="og:description"]').attr('content') || '',
    ogImage: $('meta[property="og:image"]').attr('content') || '',
    headings: [],
    paragraphs: [],
    images: [],
    videos: [],
    links: []
  };
  
  // Extract headings
  $('h1, h2, h3, h4, h5, h6').each((i, el) => {
    pageData.headings.push({
      level: parseInt(el.tagName.substring(1)),
      text: $(el).text().trim()
    });
  });
  
  // Extract paragraphs
  $('p').each((i, el) => {
    const text = $(el).text().trim();
    if (text.length > 20) {
      pageData.paragraphs.push(text);
    }
  });
  
  // Extract images
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    const alt = $(el).attr('alt') || '';
    if (src) {
      const fullUrl = new URL(src, url).href;
      pageData.images.push({ src: fullUrl, alt });
    }
  });
  
  // Extract videos
  $('video, iframe[src*="youtube"], iframe[src*="vimeo"]').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src) {
      const fullUrl = new URL(src, url).href;
      pageData.videos.push(fullUrl);
    }
  });
  
  // Extract internal links
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && isValidUrl(href)) {
      pageData.links.push(href);
    }
  });
  
  return pageData;
}

// Extract project data
function extractProjectData(url, html) {
  const $ = cheerio.load(html);
  const slug = extractSlug(url);
  
  // Look for project-specific elements
  const projectData = {
    slug,
    url,
    name: $('h1').first().text().trim() || $('.project-title').text().trim(),
    location: $('.location, .address').text().trim(),
    category: extractCategory($),
    area: extractArea($),
    price: extractPrice($),
    features: extractFeatures($),
    gallery: [],
    description: $('.project-description, .description').text().trim()
  };
  
  // Extract gallery images
  $('.gallery img, .project-gallery img, .slider img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src) {
      const fullUrl = new URL(src, url).href;
      projectData.gallery.push(fullUrl);
    }
  });
  
  return projectData;
}

function extractCategory($) {
  const categoryText = $('.category, .type, .property-type').text().trim().toLowerCase();
  if (categoryText.includes('residential')) return 'Residential';
  if (categoryText.includes('commercial')) return 'Commercial';
  if (categoryText.includes('coastal')) return 'Coastal';
  return 'Residential'; // default
}

function extractArea($) {
  const areaText = $('.area, .sqft, .sq-ft').text().trim();
  const match = areaText.match(/(\d+(?:,\d+)*)/);
  return match ? match[1] : '';
}

function extractPrice($) {
  const priceText = $('.price, .cost').text().trim();
  const match = priceText.match(/(\$|AED|USD)\s*(\d+(?:,\d+)*)/);
  return match ? match[0] : '';
}

function extractFeatures($) {
  const features = [];
  $('.feature, .amenity, .facility').each((i, el) => {
    const text = $(el).text().trim();
    if (text) features.push(text);
  });
  return features;
}

// Main scraping function
async function scrapePage(url) {
  return rateLimiter.execute(async () => {
    try {
      console.log(`🔍 Scraping: ${url}`);
      
      const browser = await chromium.launch();
      const page = await browser.newPage();
      
      await page.goto(url, { waitUntil: 'networkidle' });
      const html = await page.content();
      
      await browser.close();
      
      // Extract page data
      const pageData = extractPageData(url, html);
      pages.push(pageData);
      
      // Extract design tokens
      extractDesignTokens(html);
      
      // Check if this is a project page
      if (isProjectPage(url, html)) {
        const projectData = extractProjectData(url, html);
        projects.push(projectData);
      }
      
      // Download assets
      await downloadPageAssets(pageData);
      
      await sleep(randomJitter());
      
      return pageData;
    } catch (error) {
      console.error(`❌ Failed to scrape ${url}:`, error.message);
      assets.broken.push(url);
      return null;
    }
  });
}

function isProjectPage(url, html) {
  const $ = cheerio.load(html);
  return (
    url.includes('/project') ||
    url.includes('/listing') ||
    $('.project-details, .property-details').length > 0 ||
    $('.gallery, .project-gallery').length > 0
  );
}

async function downloadPageAssets(pageData) {
  // images
  const imgJobs = pageData.images.map(async (img) => {
    try {
      const u = img.src;
      // skip external or denied, skip repeats
      if (!isInternal(u) || isDenied(u)) return;
      if (seenAssets.has(u)) return;
      seenAssets.add(u);

      const filename = path.basename(new URL(u).pathname) || `${slugOf(u)}.jpg`;
      const out = path.join(__dirname, '..', 'public', 'media', 'img', filename);
      const ok = await downloadAsset(u, 'image', out);
      if (ok.success) {
        assets.images.push({
          url: u,
          local: `/media/img/${filename}`,
          alt: img.alt
        });
      }
    } catch (e) {
      console.error('Error downloading image asset:', e.message);
    }
  });
  await Promise.all(imgJobs);

  // videos (only internal direct assets)
  const vidJobs = pageData.videos.map(async (v) => {
    try {
      if (!isInternal(v) || isDenied(v)) return; // skip YT/Vimeo or denied
      if (seenAssets.has(v)) return;
      seenAssets.add(v);

      const filename = path.basename(new URL(v).pathname);
      const out = path.join(__dirname, '..', 'public', 'media', 'video', filename);
      const ok = await downloadAsset(v, 'video', out);
      if (ok.success) {
        assets.videos.push({
          url: v,
          local: `/media/video/${filename}`
        });
      }
    } catch (e) {
      console.error('Error downloading video asset:', e.message);
    }
  });
  await Promise.all(vidJobs);
}

// Discover URLs to scrape
async function discoverUrls() {
  const urls = new Set([BASE_URL]);
  const visited = new Set();
  
  while (urls.size > 0) {
    const currentUrl = urls.values().next().value;
    urls.delete(currentUrl);
    
    if (visited.has(currentUrl)) continue;
    visited.add(currentUrl);
    
    try {
      const pageData = await scrapePage(currentUrl);
      if (pageData) {
        // Add discovered links
        for (const link of pageData.links) {
          if (!visited.has(link) && isValidUrl(link)) {
            urls.add(link);
          }
        }
      }
    } catch (error) {
      console.error(`Failed to process ${currentUrl}:`, error.message);
    }
  }
  
  return Array.from(visited);
}

// Save data to files
async function saveData() {
  const dataDir = path.join(__dirname, '..', 'data');
  await fs.mkdir(dataDir, { recursive: true });
  
  // Save pages
  await fs.writeFile(
    path.join(dataDir, 'cms.json'),
    JSON.stringify(pages, null, 2)
  );
  
  // Save projects
  await fs.writeFile(
    path.join(dataDir, 'projects.json'),
    JSON.stringify(projects, null, 2)
  );
  
  // Save design tokens
  await fs.writeFile(
    path.join(dataDir, 'design-tokens.json'),
    JSON.stringify(designTokens, null, 2)
  );
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    pagesScraped: pages.length,
    projectsFound: projects.length,
    imagesDownloaded: assets.images.length,
    videosDownloaded: assets.videos.length,
    fontsDownloaded: assets.fonts.length,
    brokenLinks: assets.broken.length,
    brokenUrls: assets.broken,
    designTokens: Object.keys(designTokens).length
  };
  
  await fs.writeFile(
    path.join(dataDir, 'report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('📊 Report:', report);
}

// Main execution
async function main() {
  console.log('🚀 Starting ythebrokers.com scraper...');
  console.log(`📍 Target: ${BASE_URL}`);
  console.log(`⚡ Concurrency: ${CONCURRENCY_LIMIT}`);
  console.log(`⏱️  Jitter: ${JITTER_MIN}-${JITTER_MAX}ms`);
  
  try {
    await discoverUrls();
    await saveData();
    console.log('✅ Scraping completed successfully!');
  } catch (error) {
    console.error('❌ Scraping failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { scrapePage, extractPageData, extractProjectData };
