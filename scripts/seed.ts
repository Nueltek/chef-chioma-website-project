import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Models
import User from '../models/User';
import Service from '../models/Service';
import MenuItem from '../models/MenuItem';
import Gallery from '../models/Gallery';
import Testimonial from '../models/Testimonial';
import Settings from '../models/Settings';
import BlogPost from '../models/BlogPost';

const MONGODB_URI = process.env.MONGODB_URI!;

async function seed() {
  console.log('🌱 Starting seed...');

  await mongoose.connect(MONGODB_URI);
  console.log('📦 Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Service.deleteMany({}),
    MenuItem.deleteMany({}),
    Gallery.deleteMany({}),
    Testimonial.deleteMany({}),
    Settings.deleteMany({}),
    BlogPost.deleteMany({}),
  ]);
  console.log('🗑️  Cleared existing data');

  // Create admin user
  await User.create({
    email: process.env.ADMIN_EMAIL || 'chef@chiomaokonkwo.com',
    name: 'Chef Chioma Okonkwo',
    password: process.env.ADMIN_PASSWORD || 'chefchioma123',
    role: 'admin',
  });
  console.log('👤 Created admin user');

  // Create services
  const services = await Service.create([
    {
      title: 'Private Dining',
      slug: 'private-dining',
      tagline: 'Your Home, Transformed',
      description: 'Experience restaurant-quality dining in the comfort of your own space. Chef Chioma arrives with her team, fresh ingredients, and complete kitchen setup to create a bespoke multi-course meal.',
      longDescription: 'From intimate dinners for two to gatherings of twenty, every private dining experience is customized to your vision. We handle everything—from menu creation and ingredient sourcing to service and cleanup—leaving you free to be a guest at your own table. Each course is prepared fresh in your kitchen, allowing you to witness the artistry firsthand.',
      features: [
        'Personalized menu consultation',
        'Premium ingredient sourcing',
        'Complete kitchen setup and breakdown',
        'Professional table styling available',
        'Wine pairing recommendations',
        'Dietary accommodations honored',
      ],
      priceRange: 'From ₦350,000 for 2 guests',
      image: {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85',
        publicId: '',
      },
      order: 1,
      featured: true,
      isActive: true,
    },
    {
      title: 'Event Catering',
      slug: 'event-catering',
      tagline: 'Celebrations Elevated',
      description: 'Weddings, corporate functions, milestone celebrations—your events deserve food that creates lasting memories. Full-service catering with meticulous attention to detail.',
      longDescription: 'We scale our signature quality to events of any size while maintaining the personalized touch that defines Chef Chioma\'s approach. From canapé receptions to seated multi-course dinners, every element is crafted to complement your celebration. Our team handles logistics seamlessly, so you can focus on your guests.',
      features: [
        'Events from 20 to 500+ guests',
        'Customized menu development',
        'Professional service staff',
        'Equipment and setup included',
        'Tasting sessions available',
        'Coordination with event planners',
      ],
      priceRange: 'Custom quotes based on requirements',
      image: {
        url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85',
        publicId: '',
      },
      order: 2,
      featured: true,
      isActive: true,
    },
    {
      title: 'Cooking Classes',
      slug: 'cooking-classes',
      tagline: 'Master the Art',
      description: 'Hands-on experiences for individuals, couples, or groups. Learn the secrets of Nigerian cuisine from perfecting jollof rice to mastering complex traditional techniques.',
      longDescription: 'Whether you\'re a home cook looking to expand your repertoire or a professional seeking to incorporate Nigerian flavors, these interactive sessions provide the skills and knowledge to elevate your cooking. Each class includes all ingredients, printed recipes, and of course, you\'ll enjoy the meal you create together.',
      features: [
        'Individual or group sessions',
        'Corporate team-building events',
        'Bridal party experiences',
        'All skill levels welcome',
        'Take-home recipe packets',
        'Ingredients and equipment provided',
      ],
      priceRange: 'From ₦150,000 per person',
      image: {
        url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=85',
        publicId: '',
      },
      order: 3,
      featured: false,
      isActive: true,
    },
    {
      title: 'Menu Development',
      slug: 'menu-development',
      tagline: 'Culinary Consulting',
      description: 'For restaurants and hospitality brands seeking authentic Nigerian flavors. Recipe development, menu curation, and comprehensive training for your culinary team.',
      longDescription: 'Bring the depth and sophistication of Nigerian cuisine to your establishment. Chef Chioma works closely with your team to develop recipes that align with your brand while maintaining authenticity and global appeal. Services include staff training to ensure consistent execution long after the engagement ends.',
      features: [
        'Custom recipe development',
        'Menu engineering',
        'Staff training programs',
        'Brand consulting',
        'Ongoing support available',
        'International project experience',
      ],
      priceRange: 'Project-based pricing',
      image: {
        url: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=85',
        publicId: '',
      },
      order: 4,
      featured: false,
      isActive: true,
    },
  ]);
  console.log(`🍽️  Created ${services.length} services`);

  // Create menu items with original Nigerian fusion dishes
  const menuItems = await MenuItem.create([
    // Signature Dishes
    {
      name: 'Suya-Crusted Lamb Rack',
      slug: 'suya-crusted-lamb-rack',
      description: 'Tender lamb rack with traditional suya spice crust, served with silky yam purée, wilted ugu greens, and a rich pepper sauce reduction. A celebration of Northern Nigerian flavors elevated to fine dining.',
      category: 'Modern Nigerian',
      ingredients: ['Lamb rack', 'Suya spice blend', 'Yam', 'Ugu leaves', 'Scotch bonnet'],
      dietaryInfo: ['Gluten-Free'],
      image: { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', publicId: '' },
      featured: true,
      isSignature: true,
      order: 1,
      isActive: true,
    },
    {
      name: 'Ofada Risotto',
      slug: 'ofada-risotto',
      description: 'Creamy ofada rice cooked risotto-style, finished with vibrant ayamase sauce, crispy plantain crisps, and a drizzle of palm oil. The beloved Lagos specialty reimagined.',
      category: 'Fusion',
      ingredients: ['Ofada rice', 'Green bell peppers', 'Locust beans', 'Palm oil', 'Plantain'],
      dietaryInfo: ['Vegetarian', 'Gluten-Free'],
      image: { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80', publicId: '' },
      featured: true,
      isSignature: true,
      order: 2,
      isActive: true,
    },
    {
      name: 'Egusi Velouté',
      slug: 'egusi-veloute',
      description: 'Silky egusi soup reimagined as an elegant velouté, finished with bitter leaf oil, pan-seared tiger prawns, and edible flowers. Tradition meets haute cuisine.',
      category: 'Modern Nigerian',
      ingredients: ['Egusi seeds', 'Tiger prawns', 'Bitter leaf', 'Palm oil', 'Crayfish'],
      dietaryInfo: ['Gluten-Free'],
      image: { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', publicId: '' },
      featured: true,
      isSignature: true,
      order: 3,
      isActive: true,
    },
    {
      name: 'Moin Moin Soufflé',
      slug: 'moin-moin-souffle',
      description: 'Light and airy take on the beloved steamed bean pudding, with a smoked mackerel center and palm oil emulsion. Served with micro herbs and pepper sauce dots.',
      category: 'Nigerian Classics',
      ingredients: ['Black-eyed beans', 'Smoked mackerel', 'Bell peppers', 'Palm oil', 'Scotch bonnet'],
      dietaryInfo: ['Gluten-Free', 'Dairy-Free'],
      image: { url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80', publicId: '' },
      featured: false,
      isSignature: true,
      order: 4,
      isActive: true,
    },
    // Appetizers
    {
      name: 'Jollof Arancini',
      slug: 'jollof-arancini',
      description: 'Crispy rice balls filled with slow-cooked party jollof, served with suya-spiced aioli and tomato chutney. The perfect party starter.',
      category: 'Appetizers',
      ingredients: ['Jollof rice', 'Panko breadcrumbs', 'Suya spice', 'Tomatoes', 'Onions'],
      dietaryInfo: [],
      image: { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', publicId: '' },
      featured: true,
      isSignature: false,
      order: 5,
      isActive: true,
    },
    {
      name: 'Kilishi Carpaccio',
      slug: 'kilishi-carpaccio',
      description: 'Thinly sliced beef tenderloin air-dried in the kilishi tradition, served with arugula, shaved Parmesan, and a tangy tamarind dressing.',
      category: 'Appetizers',
      ingredients: ['Beef tenderloin', 'Kilishi spices', 'Arugula', 'Parmesan', 'Tamarind'],
      dietaryInfo: ['Gluten-Free'],
      image: { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', publicId: '' },
      featured: false,
      isSignature: false,
      order: 6,
      isActive: true,
    },
    // Soups & Stews
    {
      name: 'Pepper Soup Consommé',
      slug: 'pepper-soup-consomme',
      description: 'Crystal-clear goat meat pepper soup, clarified to perfection, served with tender goat medallions and aromatic herbs. Pure, intense flavor.',
      category: 'Soups & Stews',
      ingredients: ['Goat meat', 'Pepper soup spices', 'Uziza', 'Scent leaf', 'Ehuru'],
      dietaryInfo: ['Gluten-Free', 'Dairy-Free'],
      image: { url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80', publicId: '' },
      featured: false,
      isSignature: false,
      order: 7,
      isActive: true,
    },
    {
      name: 'Oha Soup',
      slug: 'oha-soup',
      description: 'Traditional Igbo delicacy featuring fresh oha leaves, assorted meats, stockfish, and cocoyam thickener. Served with pounded yam.',
      category: 'Soups & Stews',
      ingredients: ['Oha leaves', 'Cocoyam', 'Assorted meats', 'Stockfish', 'Crayfish'],
      dietaryInfo: ['Gluten-Free'],
      image: { url: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80', publicId: '' },
      featured: false,
      isSignature: false,
      order: 8,
      isActive: true,
    },
    // Desserts
    {
      name: 'Palm Wine Panna Cotta',
      slug: 'palm-wine-panna-cotta',
      description: 'Delicate Italian custard infused with aged palm wine, topped with coconut tuile, tropical fruit coulis, and edible gold leaf.',
      category: 'Desserts',
      ingredients: ['Palm wine', 'Cream', 'Coconut', 'Mango', 'Passion fruit'],
      dietaryInfo: ['Gluten-Free', 'Vegetarian'],
      image: { url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', publicId: '' },
      featured: true,
      isSignature: true,
      order: 9,
      isActive: true,
    },
    {
      name: 'Puff Puff Beignets',
      slug: 'puff-puff-beignets',
      description: 'Nigerian street food elevated: warm puff puff dusted with cinnamon sugar, served with rich chocolate dipping sauce and fresh berries.',
      category: 'Desserts',
      ingredients: ['Flour', 'Yeast', 'Nutmeg', 'Dark chocolate', 'Berries'],
      dietaryInfo: ['Vegetarian'],
      image: { url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80', publicId: '' },
      featured: false,
      isSignature: false,
      order: 10,
      isActive: true,
    },
    // Grills
    {
      name: 'Asun Lamb Chops',
      slug: 'asun-lamb-chops',
      description: 'Grilled lamb chops marinated in fiery asun spices, charred to perfection and served with roasted peppers and caramelized onions.',
      category: 'Grills',
      ingredients: ['Lamb chops', 'Scotch bonnet', 'Onions', 'Bell peppers', 'Thyme'],
      dietaryInfo: ['Gluten-Free', 'Dairy-Free'],
      image: { url: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80', publicId: '' },
      featured: false,
      isSignature: false,
      order: 11,
      isActive: true,
    },
  ]);
  console.log(`🍲 Created ${menuItems.length} menu items`);

  // Create gallery items
  const galleryItems = await Gallery.create([
    {
      title: 'Suya-Crusted Lamb Presentation',
      description: 'Signature dish plated for a private dining experience in Ikoyi',
      category: 'Signature Dishes',
      image: { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=85', publicId: '' },
      featured: true,
      order: 1,
      isActive: true,
    },
    {
      title: 'Private Dining Setup',
      description: 'Elegant table setting for an intimate anniversary dinner',
      category: 'Private Dining',
      image: { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85', publicId: '' },
      featured: true,
      order: 2,
      isActive: true,
    },
    {
      title: 'Wedding Reception Catering',
      description: 'Serving 300 guests at a Lagos wedding celebration',
      category: 'Event Catering',
      image: { url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85', publicId: '' },
      featured: true,
      order: 3,
      isActive: true,
    },
    {
      title: 'In the Kitchen',
      description: 'Chef Chioma preparing mise en place for a private event',
      category: 'Behind the Scenes',
      image: { url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=85', publicId: '' },
      featured: false,
      order: 4,
      isActive: true,
    },
    {
      title: 'Egusi Velouté Plating',
      description: 'The final touches on our signature soup course',
      category: 'Plating & Presentation',
      image: { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85', publicId: '' },
      featured: true,
      order: 5,
      isActive: true,
    },
    {
      title: 'Fresh Market Ingredients',
      description: 'Morning sourcing at Mile 12 market for local produce',
      category: 'Ingredients',
      image: { url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&q=85', publicId: '' },
      featured: false,
      order: 6,
      isActive: true,
    },
    {
      title: 'Cooking Class in Progress',
      description: 'Teaching a group to perfect their jollof rice technique',
      category: 'Cooking Classes',
      image: { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=85', publicId: '' },
      featured: false,
      order: 7,
      isActive: true,
    },
    {
      title: 'Dessert Course',
      description: 'Palm wine panna cotta with tropical coulis',
      category: 'Signature Dishes',
      image: { url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=85', publicId: '' },
      featured: false,
      order: 8,
      isActive: true,
    },
  ]);
  console.log(`📸 Created ${galleryItems.length} gallery items`);

  // Create testimonials with compelling stories
  const testimonials = await Testimonial.create([
    {
      name: 'Ngozi & Emeka Adeyemi',
      title: 'Celebrating 25 Years',
      location: 'Ikoyi, Lagos',
      content: 'Chef Chioma transformed our silver anniversary into the most memorable evening of our lives. Every course was a revelation—familiar Nigerian flavors elevated to something we\'d never experienced before. Our 12 guests are still talking about the moin moin soufflé months later. She didn\'t just cook for us; she created a love letter to our marriage through food.',
      eventType: 'Private Dining',
      rating: 5,
      featured: true,
      isActive: true,
    },
    {
      name: 'David & Sarah Okafor',
      title: 'Wedding Celebration',
      location: 'Abuja',
      content: 'Choosing Chef Chioma for our 300-guest wedding was the best decision we made. She didn\'t just cater our event—she told our love story through food. The palm wine panna cotta brought tears to my mother\'s eyes because it reminded her of my late father\'s palm wine tapping days in the village. That\'s the level of thoughtfulness she brings.',
      eventType: 'Wedding',
      rating: 5,
      featured: true,
      isActive: true,
    },
    {
      name: 'Michael Chen',
      title: 'Managing Director, Goldman Sachs West Africa',
      location: 'Victoria Island, Lagos',
      content: 'We brought Chef Chioma in for a corporate dinner with 50 executives from around the world. She introduced them to Nigerian cuisine in a way that was sophisticated, surprising, and absolutely delicious. The conversation around the table kept returning to the food—which is exactly what you want when you\'re building relationships. A masterclass in hospitality.',
      eventType: 'Corporate Event',
      rating: 5,
      featured: true,
      isActive: true,
    },
    {
      name: 'Adaeze Nwosu',
      title: 'Restaurateur & Food Writer',
      location: 'Port Harcourt',
      content: 'The cooking class with Chef Chioma wasn\'t just educational—it was transformative. I thought I knew Nigerian cooking after running restaurants for 15 years, but she opened my eyes to techniques and flavor combinations I\'d never considered. My menu has evolved completely since. Worth every kobo.',
      eventType: 'Cooking Class',
      rating: 5,
      featured: false,
      isActive: true,
    },
    {
      name: 'The Bakare Family',
      title: 'Chief Bakare\'s 70th Birthday',
      location: 'Ikeja, Lagos',
      content: 'We wanted something special for Daddy\'s 70th—not just good food, but a celebration of his life. Chef Chioma spent hours with us, learning about his childhood in Abeokuta, his favorite dishes, his memories. The menu she created was essentially his biography on a plate. He wept at the first course. We all did.',
      eventType: 'Private Dining',
      rating: 5,
      featured: true,
      isActive: true,
    },
    {
      name: 'Yemi Alade',
      title: 'Music Artist',
      location: 'Lagos',
      content: 'After months of touring, I wanted to host an intimate dinner for my team. Chef Chioma created magic in my home. The energy, the aromas, the presentation—it felt like being wrapped in a warm embrace. This is what Nigerian hospitality looks like at its finest.',
      eventType: 'Private Dining',
      rating: 5,
      featured: false,
      isActive: true,
    },
  ]);
  console.log(`💬 Created ${testimonials.length} testimonials`);

  // Create blog posts
  const blogPosts = await BlogPost.create([
    {
      title: 'The Art of Perfect Jollof Rice: Secrets from My Kitchen',
      slug: 'the-art-of-perfect-jollof-rice',
      excerpt: 'After years of perfecting my jollof rice technique in professional kitchens across three continents, I\'m sharing the secrets that make my version stand out—from the base tomato blend to the final smoky party jollof finish.',
      content: `<p>Jollof rice is more than a dish—it's a cultural institution. Across West Africa, families and nations proudly stake their claim to having the best version. After cooking jollof in professional kitchens from Lagos to London to Dubai, I've developed techniques that honor tradition while elevating the final result.</p>

<h2>The Foundation: Building Your Tomato Base</h2>

<p>The secret to exceptional jollof begins long before the rice touches the pot. Your tomato base—what we call the "stew"—is everything. I use a blend of fresh Roma tomatoes, red bell peppers, and scotch bonnets, roasted until charred and blended smooth.</p>

<p>Here's what most recipes won't tell you: fry this blend twice. The first fry removes the raw tomato taste. Let it cool, then fry again until the oil separates and floats on top. This double-fry technique creates a depth of flavour that single-fry methods simply cannot achieve.</p>

<h2>Rice Selection Matters</h2>

<p>Not all rice is created equal for jollof. Long-grain parboiled rice holds up best to the cooking process without becoming mushy. I specifically look for aged rice when I can find it—the grains cook up more separate and fluffy.</p>

<h2>The Party Jollof Secret</h2>

<p>Ah, the smoky flavour of party jollof that everyone chases. In my grandmother's time, this came naturally from cooking over wood fire. In a modern kitchen, I achieve this in the final minutes of cooking by increasing the heat and letting the bottom layer catch slightly—just enough to create that distinctive smoky aroma without actually burning.</p>`,
      featuredImage: { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=85', publicId: '', alt: 'Jollof Rice' },
      category: 'Recipes',
      tags: ['Jollof Rice', 'Nigerian Cuisine', 'Rice Dishes', 'Cooking Tips'],
      author: { name: 'Chef Chioma Okonkwo', bio: 'Award-winning Nigerian chef with over 15 years of experience.' },
      publishedAt: new Date(),
      views: 1247,
      readTime: 8,
      featured: true,
      isPublished: true,
    },
    {
      title: 'Understanding Egusi: From Market to Masterpiece',
      slug: 'understanding-egusi-from-market-to-masterpiece',
      excerpt: 'Egusi soup is more than a dish—it\'s a canvas for creativity. Learn how to select the best melon seeds at the market and transform them into a silky, flavour-packed soup that rivals any fine dining experience.',
      content: `<p>Egusi soup holds a special place in Nigerian cuisine. These ground melon seeds create one of our most beloved dishes, yet there's so much variation in how it's prepared across different regions and families.</p>

<h2>Selecting the Best Egusi</h2>

<p>At the market, look for egusi that is cream-colored with no dark spots or signs of moisture damage. Fresh egusi has a subtle, pleasant aroma—avoid any that smells rancid. If buying pre-ground, ensure it was recently processed; egusi loses flavor quickly once ground.</p>

<h2>The Two Methods</h2>

<p>There are two primary schools of thought in egusi preparation: the ball method and the frying method. Each produces distinct textures and flavors.</p>

<p>The ball method, favored in the Southeast, involves mixing the ground egusi with a bit of water to form balls that are dropped into the soup. These balls create pockets of rich, meaty texture throughout the dish.</p>

<p>The frying method, which I learned in Lagos, involves frying the egusi in palm oil until fragrant before adding liquid. This creates a more uniform, silky texture that I find particularly elegant for fine dining presentations.</p>`,
      featuredImage: { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=85', publicId: '', alt: 'Egusi Soup' },
      category: 'Nigerian Cuisine',
      tags: ['Egusi', 'Nigerian Soup', 'Traditional Cooking', 'Market Guide'],
      author: { name: 'Chef Chioma Okonkwo' },
      publishedAt: new Date(Date.now() - 86400000 * 3),
      views: 892,
      readTime: 6,
      featured: true,
      isPublished: true,
    },
    {
      title: 'Behind the Scenes: Catering a 300-Guest Nigerian Wedding',
      slug: 'behind-the-scenes-300-guest-nigerian-wedding',
      excerpt: 'A look inside the meticulous planning, early mornings, and coordinated chaos that goes into delivering a memorable wedding feast. From menu planning to the final service, here\'s what really happens.',
      content: `<p>Last month, I had the honor of catering the Adeyemi wedding in Abuja. Three hundred guests, a menu spanning seven courses, and a couple whose love story deserved nothing less than perfection. Here's a glimpse behind the curtain.</p>

<h2>Six Weeks Out: The Menu Process</h2>

<p>Every wedding begins with conversation. I sat with Chidi and Amaka for three hours, listening to their story—how they met at a mutual friend's birthday party over a shared plate of small chops, their first date at a seafood restaurant in Victoria Island, their engagement during a trip to his family's village in Anambra.</p>

<p>From these conversations, a menu emerged: small chops elevated to canapé standards for cocktail hour, a nod to his mother's famous banga soup reimagined as an amuse-bouche, seafood that celebrated their first date, and village-style cooking for the family-style main course.</p>

<h2>The Day Before: Controlled Chaos</h2>

<p>Prep began at 5 AM. My team of twelve arrived to find the venue's kitchen transformed into our command center. Each station had its mise en place, each chef their assigned responsibilities.</p>`,
      featuredImage: { url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=85', publicId: '', alt: 'Wedding Catering' },
      category: 'Behind the Scenes',
      tags: ['Wedding', 'Catering', 'Events', 'Behind the Scenes'],
      author: { name: 'Chef Chioma Okonkwo' },
      publishedAt: new Date(Date.now() - 86400000 * 7),
      views: 654,
      readTime: 10,
      featured: false,
      isPublished: true,
    },
    {
      title: 'The Suya Spice Blend: My Secret Formula',
      slug: 'the-suya-spice-blend-my-secret-formula',
      excerpt: 'Suya is Nigeria\'s beloved street food, but in my kitchen, it becomes something more refined. I\'m revealing my personal suya spice blend and how I use it to elevate everything from lamb to vegetables.',
      content: `<p>The intoxicating aroma of suya grilling on an evening Lagos street is one of my earliest food memories. That complex, nutty, slightly spicy fragrance has stayed with me through all my years of culinary training, and suya spice remains one of my most-used seasonings—even in decidedly non-traditional applications.</p>

<h2>The Core Components</h2>

<p>Traditional yaji (suya spice) starts with ground kuli-kuli—the pressed cakes left over from groundnut oil production. This gives suya its distinctive nutty base. To this, we add ginger, garlic, paprika, cayenne, onion powder, and the essential ingredient that many recipes miss: ground bouillon cubes for that umami depth.</p>

<h2>My Professional Additions</h2>

<p>Over the years, I've refined my blend with a few non-traditional additions that enhance without betraying the character: a touch of smoked paprika for depth, a whisper of cumin for earthiness, and dried uziza leaves ground fine for their subtle peppery complexity.</p>`,
      featuredImage: { url: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1200&q=85', publicId: '', alt: 'Suya Spices' },
      category: 'Cooking Tips',
      tags: ['Suya', 'Spices', 'Recipes', 'Street Food'],
      author: { name: 'Chef Chioma Okonkwo' },
      publishedAt: new Date(Date.now() - 86400000 * 10),
      views: 1089,
      readTime: 5,
      featured: false,
      isPublished: true,
    },
    {
      title: 'Palm Oil: The Misunderstood Ingredient',
      slug: 'palm-oil-the-misunderstood-ingredient',
      excerpt: 'Palm oil has been central to West African cooking for centuries. Let\'s explore its culinary uses, health considerations, and why I believe it deserves a place in modern gastronomy.',
      content: `<p>Few ingredients spark as much controversy in the culinary world as palm oil. In Western kitchens, it's often vilified for environmental and health concerns. But in Nigerian cooking, palm oil isn't just an ingredient—it's a foundation, a cultural marker, and an irreplaceable source of flavor and color.</p>

<h2>Understanding Palm Oil Varieties</h2>

<p>Not all palm oil is created equal. The bright orange, unrefined palm oil we use in Nigerian cooking is fundamentally different from the highly processed palm oil found in commercial food products. Our palm oil retains its beta-carotene (that gorgeous orange color), vitamin E, and distinctive flavor profile.</p>

<h2>The Health Perspective</h2>

<p>Yes, palm oil is high in saturated fats. But when used as part of a balanced diet—as it has been in West Africa for millennia—it provides valuable nutrients and doesn't deserve the blanket condemnation it often receives. Context matters.</p>`,
      featuredImage: { url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=85', publicId: '', alt: 'Palm Oil' },
      category: 'Ingredients',
      tags: ['Palm Oil', 'Ingredients', 'Nigerian Cooking', 'Health'],
      author: { name: 'Chef Chioma Okonkwo' },
      publishedAt: new Date(Date.now() - 86400000 * 14),
      views: 723,
      readTime: 7,
      featured: false,
      isPublished: true,
    },
    {
      title: 'Food as Memory: My Grandmother\'s Kitchen in Enugu',
      slug: 'food-as-memory-grandmothers-kitchen-enugu',
      excerpt: 'Every chef has an origin story. Mine begins in a modest kitchen in Enugu, where my grandmother taught me that cooking is not just about ingredients—it\'s about love, heritage, and the stories we pass down.',
      content: `<p>I was seven years old when I first understood the power of food. Not in a restaurant, not from a cookbook, but standing on a wooden stool beside my grandmother in her kitchen in Enugu, watching her weathered hands move with practiced precision through a pot of ofe nsala.</p>

<h2>The Wooden Spoon</h2>

<p>Mama Nnukwu's kitchen was small—a separate structure behind the main house, with a wood-burning stove and shelves lined with dried ingredients in old containers. Her most prized possession was a wooden stirring spoon, darkened with years of use, that her own mother had given her. When I graduated from Le Cordon Bleu, she pressed that spoon into my hands.</p>

<p>I still have it. I use it for every family meal I cook.</p>

<h2>Lessons Without Words</h2>

<p>My grandmother never wrote down a recipe in her life. Measurements were "small-small" or "like so" with a gesture. Cooking times were "until it looks right" or "when it smells ready." Yet her food was always perfect—consistent in a way that seemed almost magical.</p>`,
      featuredImage: { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=85', publicId: '', alt: 'Traditional Kitchen' },
      category: 'Culture & Heritage',
      tags: ['Family', 'Heritage', 'Enugu', 'Personal Story', 'Grandmother'],
      author: { name: 'Chef Chioma Okonkwo' },
      publishedAt: new Date(Date.now() - 86400000 * 21),
      views: 1456,
      readTime: 12,
      featured: true,
      isPublished: true,
    },
  ]);
  console.log(`📝 Created ${blogPosts.length} blog posts`);

  // Create settings with comprehensive content
  await Settings.create({
    chefName: 'Chef Chioma Okonkwo',
    chefTitle: 'Private Chef & Culinary Artist',
    tagline: 'Elevated Nigerian Cuisine',
    shortBio: 'Award-winning Nigerian chef bringing the rich, complex flavors of West Africa to intimate dining experiences worldwide.',
    fullBio: `With over fifteen years of culinary expertise spanning Lagos, London, and Dubai, Chef Chioma Okonkwo has dedicated her career to elevating Nigerian cuisine on the global stage.

Her journey began in her grandmother's kitchen in Enugu, where she first discovered the magic of combining local ingredients with time-honored techniques. She learned that food was more than sustenance—it was memory, celebration, connection.

After earning her Grand Diplôme at Le Cordon Bleu Paris, Chef Chioma honed her skills in some of the world's most demanding kitchens: The Ledbury in London, Dinner by Heston Blumenthal, and Pierchic in Dubai. Each experience added new dimensions to her craft while deepening her appreciation for the flavors of home.

In 2017, she returned to Lagos with a mission: to showcase Nigerian cuisine with the precision and presentation of fine dining, while honoring the soulful traditions that make it extraordinary.

Today, Chef Chioma creates bespoke dining experiences for discerning clients across Nigeria and beyond. Whether an intimate dinner for two or a grand celebration for hundreds, she brings the same passion, precision, and profound respect for ingredients to every plate.

"Food is memory made edible. I don't just cook—I translate love, history, and belonging onto a plate."`,
    email: 'hello@chefchioma.com',
    phone: '+234 801 234 5678',
    whatsapp: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    serviceAreas: ['Lagos', 'Abuja', 'Port Harcourt', 'International'],
    instagram: 'https://instagram.com/chefchioma',
    facebook: 'https://facebook.com/chefchioma',
    twitter: 'https://twitter.com/chefchioma',
    heroTitle: 'Chef Chioma Okonkwo',
    heroSubtitle: 'This is more than a meal.',
    heroTagline: "It's a refined culinary journey, woven from the rich tapestry of Nigerian heritage and crafted exclusively for you—designed to linger long after the last bite.",
    heroCTA: 'Reserve Your Private Experience',
    aboutTitle: 'Where Heritage Meets Modern Elegance',
    aboutContent: 'Welcome to a new chapter of private dining. Chef Chioma Okonkwo brings the soulful depth of West African cuisine to your most cherished gatherings, delivering Michelin-caliber experiences with the warmth of home.',
    philosophy: 'Every dish tells a story of heritage, innovation, and passion. I believe food is the most intimate gift you can offer—a direct connection to culture, memory, and love.',
    experience: '15+ years',
    pressFeatures: [
      { name: 'Forbes Africa', logo: '', link: '' },
      { name: 'CNN African Voices', logo: '', link: '' },
      { name: 'Guardian Life', logo: '', link: '' },
      { name: 'Bella Naija', logo: '', link: '' },
    ],
    businessHours: 'By appointment only',
    bookingLeadTime: '2 weeks advance booking recommended',
    minGuestCount: 2,
    seoTitle: 'Chef Chioma Okonkwo | Private Chef & Nigerian Cuisine Expert',
    seoDescription: 'Experience elevated Nigerian cuisine with Chef Chioma Okonkwo. Private dining, event catering, and cooking classes in Lagos, Abuja, and beyond.',
    seoKeywords: ['Nigerian chef', 'private chef Lagos', 'Nigerian cuisine', 'catering Lagos', 'private dining Nigeria', 'cooking classes Lagos', 'West African cuisine', 'luxury catering'],
  });
  console.log('⚙️  Created settings');

  await mongoose.disconnect();
  console.log('✅ Seed completed successfully!');
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});
