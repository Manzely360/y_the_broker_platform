#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function scrapeLogo() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to ythebrokers.com...');
    await page.goto('https://ythebrokers.com', { waitUntil: 'networkidle' });
    
    // Try multiple selectors for the logo
    const logoSelectors = [
      'header img',
      '.logo img',
      '[class*="logo"] img',
      '.navbar img',
      '.header img',
      'nav img',
      'img[alt*="logo"]',
      'img[alt*="Logo"]',
      'img[src*="logo"]',
      'img[src*="Logo"]'
    ];
    
    let logoElement = null;
    let logoUrl = null;
    
    for (const selector of logoSelectors) {
      try {
        logoElement = await page.$(selector);
        if (logoElement) {
          logoUrl = await logoElement.getAttribute('src');
          if (logoUrl) {
            console.log(`Logo found with selector: ${selector}`);
            console.log('Logo URL:', logoUrl);
            break;
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (logoUrl && !logoUrl.startsWith('data:')) {
      const fullUrl = logoUrl.startsWith('http') ? logoUrl : 'https://ythebrokers.com' + logoUrl;
      console.log('Full logo URL:', fullUrl);
      
      try {
        // Download the logo
        const response = await page.goto(fullUrl);
        const buffer = await response.body();
        await fs.writeFile('public/logo.png', buffer);
        console.log('Logo saved to public/logo.png');
      } catch (downloadError) {
        console.error('Error downloading logo:', downloadError.message);
      }
    } else {
      console.log('No suitable logo found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
}

scrapeLogo().catch(console.error);
