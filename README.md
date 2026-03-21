# Dating App - Modern Web Application

A secure and modern dating web application with real-time chat, matching algorithm, and comprehensive safety features.

## Features

### Core Functionality
- **User Authentication**: Secure registration/login with JWT tokens
- **User Profiles**: Detailed profiles with photos, bio, interests, and location
- **Smart Matching**: Location-based matching with preference filters
- **Real-time Chat**: Instant messaging with Socket.io
- **Swipe Interface**: Like/pass functionality with match notifications

### Security & Safety
- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API endpoint protection
- **Input Validation**: Comprehensive server-side validation
- **User Reporting**: Report inappropriate users/messages
- **Privacy Controls**: Age/distance visibility settings

### Technical Features
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Socket.io for live messaging
- **Geospatial Queries**: Location-based matching
- **Image Upload**: Cloudinary integration (ready)
- **Database**: MongoDB with Mongoose ODM

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Socket.io** for real-time features
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Helmet** for security headers
- **Rate Limiting** for API protection

### Frontend
- **React** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Socket.io Client** for real-time chat
- **Axios** for API calls
- **Lucide React** for icons

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone and install dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

2. **Environment Setup**
```bash
# Copy .env file and update values
cp .env.example .env
```

Update `.env` with your values:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dating-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

3. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or connect to MongoDB Atlas
# Update MONGODB_URI in .env
```

4. **Run the application**
```bash
# Start both backend and frontend
npm run dev

# Or start separately
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users/discover` - Get potential matches
- `POST /api/users/interact/:userId` - Like/pass user
- `GET /api/users/matches` - Get user matches
- `POST /api/users/report/:userId` - Report user

### Matches
- `GET /api/matches/` - Get all matches
- `GET /api/matches/:matchId` - Get match details
- `DELETE /api/matches/:matchId` - Unmatch user

### Chat
- `GET /api/chat/:matchId` - Get messages
- `POST /api/chat/:matchId` - Send message
- `PUT /api/chat/:messageId` - Edit message
- `DELETE /api/chat/:messageId` - Delete message
- `POST /api/chat/:messageId/report` - Report message

## Database Schema

### Users
- Authentication credentials
- Profile information (name, age, gender, bio, photos)
- Location data (coordinates, city, country)
- Preferences (age range, max distance)
- Privacy settings
- Statistics (likes, matches)

### Matches
- User pairings
- Match status (pending, matched, rejected, unmatched)
- Like tracking
- Unread message counts

### Messages
- Chat messages
- Read status
- Edit/delete tracking
- Report functionality

## Security Features

- **Password Security**: Bcrypt with 12 salt rounds
- **JWT Tokens**: Secure authentication with expiration
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation on all inputs
- **Security Headers**: Helmet.js for security headers
- **CORS Protection**: Proper CORS configuration
- **Data Sanitization**: Input sanitization to prevent XSS

## Deployment

### Production Setup
1. Set `NODE_ENV=production` in environment
2. Use HTTPS for all connections
3. Configure production database
4. Set up proper CORS origins
5. Use strong JWT secrets
6. Configure Cloudinary for image uploads

### Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-strong-jwt-secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue on GitHub.

---

**Note**: This is a demonstration application. For production use, ensure proper security measures, legal compliance, and thorough testing.
