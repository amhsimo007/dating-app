# 🚀 MongoDB Atlas Quick Setup (5 minutes)

## Step 1: Go to MongoDB Atlas
**Visit**: https://www.mongodb.com/cloud/atlas

## Step 2: Create Free Account
- Click "Try Free" 
- Sign up with Google/GitHub or email
- Verify email if needed

## Step 3: Create Cluster
1. Click "Create Cluster" 
2. Select "M0 (Free)" - $0/month
3. Cloud Provider: AWS (or any)
4. Region: Choose closest to you
5. Cluster Name: "dating-app"
6. Click "Create Cluster" (wait 2-3 minutes)

## Step 4: Create Database User
1. Go to "Database Access" (left menu)
2. Click "Add New Database User"
3. Username: `datingapp`
4. Password: `datingapp123`
5. Permissions: "Read and write to any database"
6. Click "Add User"

## Step 5: Add IP Access
1. Go to "Network Access" (left menu)
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 6: Get Connection String
1. Go back to "Clusters"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with `datingapp123`

## Step 7: Update Your .env
Replace the MONGODB_URI line with your connection string

## Step 8: Restart Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run server
```

## ✅ Done!
Your dating app will now be fully functional with real database!
