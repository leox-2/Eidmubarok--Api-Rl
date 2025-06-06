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
# 🌙 Netlify Deployment Guide for Eid Banner API

## 📁 Project Structure

```
your-project/
├── netlify/
│   └── functions/
│       └── generate.js          ← Main function file
├── netlify.toml                 ← Netlify configuration
├── package.json
└── README.md
```

## 🚀 Deployment Steps

### 1. Create Project Structure
```bash
mkdir eid-banner-api
cd eid-banner-api
mkdir -p netlify/functions
```

### 2. Add Files
- Copy `generate.js` to `netlify/functions/generate.js`
- Add `netlify.toml` to root
- Add `package.json` to root

### 3. Install Dependencies
```bash
npm install
```

### 4. Deploy to Netlify

#### Option A: Netlify CLI (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

#### Option B: Git + Netlify Dashboard
1. Push to GitHub/GitLab
2. Connect repo in Netlify dashboard
3. Auto-deploy on push

## 📡 API Usage

### Your API URL
```
https://your-site-name.netlify.app/.netlify/functions/generate
```

### Example Request
```javascript
const response = await fetch('https://your-site-name.netlify.app/.netlify/functions/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    style: 1,
    userName: 'Ahmed',
    avatarUrl: 'https://example.com/avatar.jpg',
    animated: true
  })
});

const bannerBlob = await response.blob();
```

### Update Your Bot Code
```javascript
// In your bot's eidmubarak command
const API_BASE = "https://your-site-name.netlify.app";
const apiUrl = `${API_BASE}/.netlify/functions/generate`;

const response = await axios.post(apiUrl, requestData, {
  responseType: 'arraybuffer',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

## 🔧 Local Development

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run locally
netlify dev

# Test function
curl -X POST http://localhost:8888/.netlify/functions/generate \
  -H "Content-Type: application/json" \
  -d '{"style":1,"userName":"Test","animated":false}'
```

## 📊 Function Limits

### Netlify Free Tier:
- **Runtime**: 10 seconds max
- **Memory**: 1008 MB
- **Requests**: 125K/month
- **Bandwidth**: 100 GB/month

### Netlify Pro Tier:
- **Runtime**: 26 seconds max
- **Memory**: 3008 MB
- **Requests**: Unlimited
- **Background Functions**: Available

## ⚙️ Environment Variables

If needed, add in Netlify dashboard:
```
NODE_ENV=production
```

## 🎯 Function Names

**Important**: The function name is determined by the file name:
- `netlify/functions/generate.js` → `/.netlify/functions/generate`
- `netlify/functions/create-banner.js` → `/.netlify/functions/create-banner`

## 🔍 Monitoring

### Check Function Logs
1. Go to Netlify dashboard
2. Select your site
3. Go to **Functions** tab
4. Click on function name
5. View logs and metrics

### Local Testing
```bash
# Test with curl
curl -X POST http://localhost:8888/.netlify/functions/generate \
  -H "Content-Type: application/json" \
  -d '{
    "style": 1,
    "userName": "Ahmed",
    "animated": false
  }' \
  --output test-banner.png
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Canvas not working**:
   - Netlify supports canvas with some limitations
   - Use Node 18+ for better compatibility

2. **Function timeout**:
   - Animated GIFs take longer (8-15 seconds)
   - Consider upgrading to Pro for longer timeouts

3. **Memory issues**:
   - Reduce animation frames for large GIFs
   - Use smaller canvas sizes if needed

4. **Build fails**:
   ```bash
   # Clear and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📝 Example Netlify Sites

Your API URL will be:
- `https://eid-banner-api.netlify.app/.netlify/functions/generate`
- `https://your-custom-domain.com/.netlify/functions/generate`

## 🚀 Performance Tips

1. **Caching**: Function responses are cached for 1 hour
2. **Optimization**: Use static banners for faster response
3. **Error Handling**: Function includes comprehensive error handling
4. **CORS**: Pre-configured for cross-origin requests

## 📞 Support

- Netlify Functions docs: https://docs.netlify.com/functions/overview/
- Canvas library: https://github.com/Automattic/node-canvas
- GIF encoder: https://github.com/eugeneware/gifencoder

---

**Your Eid Banner API is now ready for deployment! 🌙✨**
