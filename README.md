# 🌙 Eid Mubarak Banner API

A beautiful Node.js API that generates stunning animated Eid Mubarak banners with Islamic patterns, moving elements, and user profile pictures.

## 🎨 Features

- **4 Beautiful Styles**: Classic Golden Crescent, Floating Lanterns, Stars & Moon, Islamic Geometric
- **Animated Banners**: Support for both static PNG and animated GIF banners
- **Profile Integration**: Include user avatars in banners
- **High Quality**: Crisp, professional-looking banners at 800x400 resolution
- **Islamic Elements**: Authentic crescents, stars, lanterns, and geometric patterns
- **Multiple Languages**: Arabic and English text support

## 🚀 Quick Start

### Installation

```bash
npm install
npm start
```

### Development
```bash
npm run dev
```

## 📡 API Endpoints

### POST `/generate`

Generate an Eid Mubarak banner.

**Request Body:**
```json
{
  "style": 1,
  "userName": "John Doe",
  "userId": "123456789",
  "avatarUrl": "https://example.com/avatar.jpg",
  "animated": true,
  "quality": "high"
}
```

**Parameters:**
- `style` (1-4): Banner style
  - 1: Classic Golden Crescent
  - 2: Floating Lanterns Style
  - 3: Stars & Moon Animation
  - 4: Islamic Geometric Pattern
- `userName` (string): Name to display on banner (max 50 chars)
- `userId` (string): User identifier (optional)
- `avatarUrl` (string): Profile picture URL (optional)
- `animated` (boolean): Generate GIF (true) or PNG (false)
- `quality` (string): Image quality ("high" or "standard")

**Response:**
- Content-Type: `image/png` or `image/gif`
- Binary image data

### GET `/health`
Check API health status.

### GET `/`
API information and documentation.

## 🎨 Banner Styles

### Style 1: Classic Golden Crescent
- Animated crescent moon with golden glow
- Twinkling stars floating across
- Elegant Islamic border
- Deep blue night sky gradient

### Style 2: Floating Lanterns
- Animated paper lanterns swaying gently
- Golden particle effects
- Warm amber and orange tones
- Traditional festival atmosphere

### Style 3: Stars & Moon Animation
- Twinkling stars with varying opacity
- Moving moon across the sky
- Silver and white color scheme
- Peaceful night scene

### Style 4: Islamic Geometric Pattern
- Rotating geometric Islamic patterns
- Flowing mathematical curves
- Royal blue and gold colors
- Sophisticated artistic design

## 🛠️ Technical Details

### Dependencies
- **Express**: Web framework
- **Canvas**: HTML5 Canvas for Node.js
- **Axios**: HTTP client for image downloads
- **GIFEncoder**: Animated GIF generation

### Image Specifications
- **Resolution**: 800x400 pixels
- **Formats**: PNG (static) or GIF (animated)
- **Animation**: 20 frames at 100ms delay
- **Quality**: Optimized for web and social media

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
```env
NODE_ENV=production
PORT=3000
```

## 📝 Usage Examples

### Generate Classic Banner
```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "style": 1,
    "userName": "Ahmed",
    "animated": false
  }' \
  --output banner.png
```

### Generate Animated Lantern Banner
```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "style": 2,
    "userName": "Fatima",
    "avatarUrl": "https://example.com/avatar.jpg",
    "animated": true
  }' \
  --output banner.gif
```

### JavaScript Example
```javascript
const response = await fetch('http://localhost:3000/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    style: 3,
    userName: 'Ali',
    animated: true,
    quality: 'high'
  })
});

const bannerBlob = await response.blob();
```

## 🔧 Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (invalid parameters)
- `500`: Internal Server Error

Error responses include:
```json
{
  "error": "Error description",
  "message": "Detailed error message"
}
```

## 🎯 Performance

- **Response Time**: < 3 seconds for static banners
- **Response Time**: < 10 seconds for animated banners
- **Memory Usage**: Optimized for serverless environments
- **Caching**: 1 hour browser cache for generated banners

## 📄 License

MIT License - feel free to use in your projects!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues and questions:
- Open a GitHub issue
- Check the API health endpoint
- Review the console logs

---

**May Allah bless your projects with success! 🌙✨**
