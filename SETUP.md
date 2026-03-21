# 🚀 Quick Setup Guide

## Step 1: Install MongoDB
### Option A: MongoDB Atlas (Recommended - Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster (free tier)
4. Get connection string
5. Update `.env` file with your connection string

### Option B: Local MongoDB
1. Download MongoDB Community Server
2. Install and start MongoDB service
3. Keep default connection string: `mongodb://localhost:27017/dating-app`

## Step 2: Update Environment Variables
Copy `.env.example` to `.env` and update:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dating-app  # or your Atlas connection
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

## Step 3: Install Dependencies & Run
```bash
# Install all dependencies
npm run install-all

# Start the application
npm run dev
```

## Step 4: Access the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 Test the Application

### 1. Create Test Accounts
- Register 2-3 users with different profiles
- Add photos, bio, interests
- Set location (uses default NYC coordinates)

### 2. Test Features
- **Discover**: Swipe through profiles
- **Matching**: Like users to create matches
- **Chat**: Send messages to matches
- **Safety**: Report inappropriate content

### 3. Default Test Data
- Location: New York City (40.7128, -74.0060)
- Default photos: Placeholder icons
- Sample interests: Travel, Music, Cooking, Sports

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string format
- Verify network/firewall settings

### Port Conflicts
- Backend uses port 5000
- Frontend uses port 3000
- Change if needed in `.env` and package.json

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version (16+ recommended)

## 📱 Mobile Testing
The app is fully responsive - test on:
- Chrome DevTools mobile view
- Actual mobile devices
- Different screen sizes

## 🚀 Production Deployment
When ready for production:
1. Set `NODE_ENV=production`
2. Use HTTPS
3. Configure production database
4. Add domain to CORS
5. Set up image hosting (Cloudinary)

## 🎨 Features Included
- ✅ User registration/login
- ✅ Profile management
- ✅ Location-based matching
- ✅ Real-time chat
- ✅ Swipe interface
- ✅ Match notifications
- ✅ User reporting
- ✅ Responsive design
- ✅ Security features

Your dating app is ready to run! 🎉
