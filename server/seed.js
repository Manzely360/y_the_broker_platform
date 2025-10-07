const fs = require('fs');
const path = require('path');

// Read the projects data
const projectsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'projects.json'), 'utf8')
);

// Sample agents data
const agentsData = [
  {
    name: "Ahmed Hassan",
    email: "ahmed@ythebrokers.com",
    phone: "+20 123 456 7890",
    bio: "Senior Real Estate Consultant with 10+ years of experience in luxury properties.",
    avatar: "/media/img/agent-ahmed.jpg",
    specialties: ["Luxury Properties", "Coastal Developments", "Commercial Real Estate"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Sarah Mohamed",
    email: "sarah@ythebrokers.com",
    phone: "+20 123 456 7891",
    bio: "Expert in residential properties and investment opportunities.",
    avatar: "/media/img/agent-sarah.jpg",
    specialties: ["Residential Properties", "Investment Properties", "First-time Buyers"],
    createdAt: new Date().toISOString()
  },
  {
    name: "Omar Ali",
    email: "omar@ythebrokers.com",
    phone: "+20 123 456 7892",
    bio: "Commercial real estate specialist with focus on office spaces and retail.",
    avatar: "/media/img/agent-omar.jpg",
    specialties: ["Commercial Properties", "Office Spaces", "Retail Properties"],
    createdAt: new Date().toISOString()
  }
];

// Homepage content
const homepageData = {
  title: "Y The Brokers - Premium Real Estate Solutions",
  description: "Discover exceptional properties across Egypt's most prestigious locations. From luxury coastal resorts to prime commercial spaces, we bring you the finest real estate opportunities.",
  heroVideo: "/media/video/Y-The-Brokers-Video-Website-1.mp4",
  featuredProjects: ["1", "2", "3", "4", "5", "6"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

console.log('🌱 Seeding database with projects, agents, and homepage data...');

// This would typically be used with Manifest's seeding system
// For now, we'll create seed files that can be imported
const seedData = {
  projects: projectsData,
  agents: agentsData,
  homepage: homepageData
};

// Write seed data to a file that can be imported
fs.writeFileSync(
  path.join(__dirname, 'seed-data.json'),
  JSON.stringify(seedData, null, 2)
);

console.log('✅ Seed data created successfully!');
console.log(`📊 Projects: ${projectsData.length}`);
console.log(`👥 Agents: ${agentsData.length}`);
console.log(`🏠 Homepage: 1`);

module.exports = seedData;
