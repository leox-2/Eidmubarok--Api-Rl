// netlify/functions/generate.js
const canvas = require('canvas');
const axios = require('axios');
const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage, registerFont } = canvas;

// Utility functions
const downloadImage = async (url) => {
  try {
    const response = await axios.get(url, { 
      responseType: 'arraybuffer',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Error downloading image:', error.message);
    return null;
  }
};

const createGradient = (ctx, x, y, width, height, colors) => {
  const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });
  return gradient;
};

const drawStar = (ctx, x, y, radius, points = 5) => {
  const angle = Math.PI / points;
  ctx.beginPath();
  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? radius : radius * 0.5;
    const a = i * angle;
    if (i === 0) {
      ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
    } else {
      ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
    }
  }
  ctx.closePath();
};

const drawCrescent = (ctx, x, y, radius) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.arc(x + radius * 0.6, y - radius * 0.2, radius * 0.8, 0, Math.PI * 2);
  ctx.fill('evenodd');
};

const drawLantern = (ctx, x, y, size) => {
  const gradient = createGradient(ctx, x - size/2, y - size, size, size * 2, 
    ['#FFD700', '#FFA500', '#FF6347']);
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(x, y, size * 0.6, size, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Lantern details
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - size * 0.6, y - size * 0.3);
  ctx.lineTo(x + size * 0.6, y - size * 0.3);
  ctx.moveTo(x - size * 0.6, y);
  ctx.lineTo(x + size * 0.6, y);
  ctx.moveTo(x - size * 0.6, y + size * 0.3);
  ctx.lineTo(x + size * 0.6, y + size * 0.3);
  ctx.stroke();
};

const drawIslamicPattern = (ctx, x, y, size) => {
  ctx.strokeStyle = '#DAA520';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  // Geometric pattern
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const x1 = x + Math.cos(angle) * size * 0.3;
    const y1 = y + Math.sin(angle) * size * 0.3;
    const x2 = x + Math.cos(angle) * size * 0.7;
    const y2 = y + Math.sin(angle) * size * 0.7;
    
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
  ctx.stroke();
};

// Style drawing functions
const drawClassicStyle = async (ctx, width, height, progress) => {
  // Animated crescent moon
  const moonX = 150 + Math.sin(progress * Math.PI * 2) * 10;
  const moonY = 100;
  
  ctx.fillStyle = '#FFD700';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 20;
  drawCrescent(ctx, moonX, moonY, 40);
  ctx.shadowBlur = 0;
  
  // Floating stars
  for (let i = 0; i < 15; i++) {
    const x = (i * 53 + progress * 50) % width;
    const y = 50 + Math.sin(progress * Math.PI * 2 + i) * 30;
    const size = 3 + Math.sin(progress * Math.PI * 4 + i) * 2;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 10;
    drawStar(ctx, x, y, size);
  }
  ctx.shadowBlur = 0;
  
  // Decorative border
  ctx.strokeStyle = '#DAA520';
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 5]);
  ctx.strokeRect(20, 20, width - 40, height - 40);
  ctx.setLineDash([]);
};

const drawLanternStyle = async (ctx, width, height, progress) => {
  // Floating lanterns
  for (let i = 0; i < 5; i++) {
    const x = 100 + i * 120;
    const y = 120 + Math.sin(progress * Math.PI * 2 + i * 0.5) * 20;
    const size = 30 + Math.sin(progress * Math.PI * 4 + i) * 5;
    
    drawLantern(ctx, x, y, size);
  }
  
  // Particles
  for (let i = 0; i < 20; i++) {
    const x = (i * 40 + progress * 100) % width;
    const y = 300 + Math.sin(progress * Math.PI * 3 + i) * 50;
    const size = 2 + Math.sin(progress * Math.PI * 6 + i) * 1;
    
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawStarryStyle = async (ctx, width, height, progress) => {
  // Twinkling stars
  for (let i = 0; i < 30; i++) {
    const x = (i * 27) % width;
    const y = (i * 13) % height;
    const size = 2 + Math.sin(progress * Math.PI * 8 + i) * 3;
    const opacity = 0.3 + Math.sin(progress * Math.PI * 6 + i * 0.5) * 0.7;
    
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 15;
    drawStar(ctx, x, y, size);
  }
  ctx.shadowBlur = 0;
  
  // Moving moon
  const moonX = width / 2 + Math.cos(progress * Math.PI * 2) * 100;
  const moonY = 80;
  
  ctx.fillStyle = '#C0C0C0';
  ctx.shadowColor = '#C0C0C0';
  ctx.shadowBlur = 25;
  ctx.beginPath();
  ctx.arc(moonX, moonY, 35, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
};

const drawGeometricStyle = async (ctx, width, height, progress) => {
  // Rotating geometric patterns
  for (let i = 0; i < 6; i++) {
    const x = 100 + i * 120;
    const y = 200;
    const rotation = progress * Math.PI * 2 + i * Math.PI / 3;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    drawIslamicPattern(ctx, 0, 0, 40);
    ctx.restore();
  }
  
  // Flowing lines
  ctx.strokeStyle = '#DAA520';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < width; i += 5) {
    const y = height / 2 + Math.sin((i + progress * 100) * 0.02) * 30;
    if (i === 0) ctx.moveTo(i, y);
    else ctx.lineTo(i, y);
  }
  ctx.stroke();
};

const drawAvatar = async (ctx, avatarUrl, x, y, size) => {
  try {
    const imageBuffer = await downloadImage(avatarUrl);
    if (imageBuffer) {
      const img = await loadImage(imageBuffer);
      
      // Create circular mask
      ctx.save();
      ctx.beginPath();
      ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
      ctx.clip();
      
      // Draw avatar
      ctx.drawImage(img, x, y, size, size);
      
      // Border
      ctx.restore();
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
      ctx.stroke();
    }
  } catch (error) {
    console.error('Error drawing avatar:', error);
    // Draw placeholder
    ctx.fillStyle = '#4A4A4A';
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawText = (ctx, userName, width, height) => {
  // Main title
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 5;
  ctx.fillText('عيد مبارك', width / 2, height / 2 - 40);
  ctx.fillText('EID MUBARAK', width / 2, height / 2);
  
  // User name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.fillText(userName, width / 2, height / 2 + 40);
  
  // Blessing message
  ctx.fillStyle = '#DAA520';
  ctx.font = '16px Arial, sans-serif';
  ctx.fillText('May Allah bless you with happiness and peace', width / 2, height - 60);
  
  ctx.shadowBlur = 0;
  ctx.textAlign = 'start';
};

// Banner generation functions
const generateStaticBanner = async (style, userName, avatarUrl, width, height) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background gradients for different styles
  const backgrounds = {
    1: ['#1a1a2e', '#16213e', '#0f3460'], // Classic night
    2: ['#2c1810', '#4a2c17', '#6b3410'], // Warm lantern
    3: ['#0f0f23', '#1a1a3e', '#2e2e5a'], // Starry night
    4: ['#1e3a5f', '#2e5a8f', '#4e7abf']  // Islamic blue
  };
  
  // Set background
  const bgGradient = createGradient(ctx, 0, 0, width, height, backgrounds[style] || backgrounds[1]);
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Draw style-specific elements
  switch (style) {
    case 1:
      await drawClassicStyle(ctx, width, height, 0);
      break;
    case 2:
      await drawLanternStyle(ctx, width, height, 0);
      break;
    case 3:
      await drawStarryStyle(ctx, width, height, 0);
      break;
    case 4:
      await drawGeometricStyle(ctx, width, height, 0);
      break;
  }
  
  // Draw avatar
  if (avatarUrl) {
    await drawAvatar(ctx, avatarUrl, width - 120, 60, 100);
  }
  
  // Draw text
  drawText(ctx, userName, width, height);
  
  return canvas.toBuffer('image/png');
};

const generateAnimatedBanner = async (style, userName, avatarUrl, width, height) => {
  const encoder = new GIFEncoder(width, height);
  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(100);
  encoder.setQuality(10);
  
  const frames = 20;
  
  for (let frame = 0; frame < frames; frame++) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Background
    const backgrounds = {
      1: ['#1a1a2e', '#16213e', '#0f3460'],
      2: ['#2c1810', '#4a2c17', '#6b3410'],
      3: ['#0f0f23', '#1a1a3e', '#2e2e5a'],
      4: ['#1e3a5f', '#2e5a8f', '#4e7abf']
    };
    
    const bgGradient = createGradient(ctx, 0, 0, width, height, backgrounds[style] || backgrounds[1]);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw animated elements
    const progress = frame / frames;
    switch (style) {
      case 1:
        await drawClassicStyle(ctx, width, height, progress);
        break;
      case 2:
        await drawLanternStyle(ctx, width, height, progress);
        break;
      case 3:
        await drawStarryStyle(ctx, width, height, progress);
        break;
      case 4:
        await drawGeometricStyle(ctx, width, height, progress);
        break;
    }
    
    // Draw avatar
    if (avatarUrl) {
      await drawAvatar(ctx, avatarUrl, width - 120, 60, 100);
    }
    
    // Draw text
    drawText(ctx, userName, width, height);
    
    encoder.addFrame(ctx);
  }
  
  encoder.finish();
  return encoder.out.getData();
};

// Main handler function
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body);
    const {
      style = 1,
      userName = 'User',
      userId,
      avatarUrl,
      animated = false,
      quality = 'high'
    } = body;

    console.log(`Generating banner: style=${style}, user=${userName}, animated=${animated}`);

    // Validate inputs
    if (style < 1 || style > 4) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid style. Must be 1-4.' })
      };
    }

    if (userName.length > 50) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Username too long. Max 50 characters.' })
      };
    }

    // Generate banner
    const width = 800;
    const height = 400;
    
    let bannerBuffer;
    if (animated) {
      bannerBuffer = await generateAnimatedBanner(style, userName, avatarUrl, width, height);
    } else {
      bannerBuffer = await generateStaticBanner(style, userName, avatarUrl, width, height);
    }

    // Return banner as base64 for Netlify Functions
    const contentType = animated ? 'image/gif' : 'image/png';
    const base64Banner = bannerBuffer.toString('base64');

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600'
      },
      body: base64Banner,
      isBase64Encoded: true
    };

  } catch (error) {
    console.error('Banner generation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to generate banner',
        message: error.message 
      })
    };
  }
};
