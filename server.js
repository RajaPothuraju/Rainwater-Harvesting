require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/aquaharvest')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('AquaHarvest Backend Running');
});

// Calculator API
app.post('/api/calculator', (req, res) => {
  const { roofArea, rainfall, runoffCoefficient, waterCost, usagePercentage } = req.body;
  
  // Calculation
  const harvestPotential = roofArea * (rainfall * 0.001) * runoffCoefficient * 0.8 * 1000;
  const annualSavings = (harvestPotential / 1000) * waterCost * (usagePercentage / 100);
  
  // In a real app, save to database here
  console.log('New calculation saved:', { 
    roofArea, 
    rainfall, 
    harvestPotential: Math.round(harvestPotential),
    annualSavings: Math.round(annualSavings)
  });
  
  res.json({
    success: true,
    data: {
      harvestPotential,
      annualSavings
    }
  });
});

// Products API
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: "AquaHome 2000",
        description: "Premium residential rainwater harvesting system",
        price: 1299,
        capacity: 2000,
        type: "residential",
        rating: 4.5,
        reviewCount: 42,
        features: ["Smart pump", "Self-cleaning filter", "Installation kit"],
        imageUrl: "https://images.unsplash.com/photo-1605000767815-61a850da9b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        badge: "BEST SELLER",
        badgeColor: "#2ecc71"
      },
      {
        id: 2,
        name: "EcoTank Pro",
        description: "Commercial-grade water collection system",
        price: 2499,
        capacity: 5000,
        type: "commercial",
        rating: 4.8,
        reviewCount: 28,
        features: ["5000L capacity", "UV treatment", "Smart monitoring"],
        imageUrl: "https://images.unsplash.com/photo-1605000767815-61a850da9b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        badge: "PREMIUM",
        badgeColor: "#1a6f8b"
      },
      {
        id: 3,
        name: "FarmHarvest XL",
        description: "Agricultural water collection system",
        price: 3999,
        capacity: 20000,
        type: "agricultural",
        rating: 4.0,
        reviewCount: 15,
        features: ["Large capacity", "Irrigation ready", "Durable construction"],
        imageUrl: "https://images.unsplash.com/photo-1605000767815-61a850da9b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  });
});

// Team Members API
app.get('/api/team', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        position: "Water Systems Engineer",
        description: "PhD in Environmental Engineering with 15 years of experience in water conservation systems.",
        imageUrl: "https://images.unsplash.com/photo-1605000767815-61a850da9b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 2,
        name: "Michael Chen",
        position: "Product Designer",
        description: "Specializes in sustainable product design with a focus on rainwater harvesting solutions.",
        imageUrl: "https://images.unsplash.com/photo-1605000767815-61a850da9b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 3,
        name: "Lisa Rodriguez",
        position: "Installation Specialist",
        description: "Certified installer with expertise in residential and commercial rainwater systems.",
        imageUrl: "https://images.unsplash.com/photo-1605000767815-61a850da9b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  });
});

// Success Stories API
app.get('/api/success-stories', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        title: "Suburban Family Reduces Water Bill by 65%",
        location: "Portland, OR",
        summary: "The Johnson family installed a 3,000L system that now supplies all their outdoor water needs and toilet flushing, saving over 100,000L annually.",
        imageUrl: "https://images.unsplash.com/photo-1605000767815-61a850da9b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "residential"
      },
      {
        id: 2,
        title: "School's Rainwater Project Teaches Sustainability",
        location: "Austin, TX",
        summary: "Maplewood Elementary's student-led rainwater harvesting system now irrigates their school garden and serves as a hands-on learning tool for 600 students.",
        imageUrl: "https://images.unsplash.com/photo-1605000767815-61a850da9b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "community"
      },
      {
        id: 3,
        title: "Vineyard Thrives During Drought",
        location: "Napa Valley, CA",
        summary: "Sunrise Vineyards' 50,000L rainwater harvesting system allowed them to maintain production during severe water restrictions when neighbors struggled.",
        imageUrl: "https://images.unsplash.com/photo-1605000767815-61a850da9b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "agricultural"
      }
    ]
  });
});

// Contact Form API
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // In a real app, save to database and send email
  console.log('New contact form submission:', { name, email, subject, message });
  
  res.json({
    success: true,
    message: "Thank you for your message! We will get back to you soon."
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});