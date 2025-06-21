# EatsBuddy - Environment Setup

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Authentication and Firestore enabled

## Local Development Setup

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd food-planner
```

### 2. Install dependencies
```bash
npm install
```

### 3. Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Go to Project Settings → General → Your apps
6. Register a web app and copy the configuration

### 4. Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Firebase configuration:
   ```env
   VUE_APP_FIREBASE_API_KEY=your_actual_api_key
   VUE_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VUE_APP_FIREBASE_PROJECT_ID=your_project_id
   VUE_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VUE_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VUE_APP_FIREBASE_APP_ID=your_app_id
   ```

### 5. Run the development server
```bash
npm run serve
```

The app will be available at `http://localhost:8080`

## Deployment

### Vercel Deployment
1. Push your code to GitHub (make sure .env is in .gitignore)
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all VUE_APP_FIREBASE_* variables

### Environment Variables for Production
Set these in your hosting platform (Vercel, Netlify, etc.):
- `VUE_APP_FIREBASE_API_KEY`
- `VUE_APP_FIREBASE_AUTH_DOMAIN`
- `VUE_APP_FIREBASE_PROJECT_ID`
- `VUE_APP_FIREBASE_STORAGE_BUCKET`
- `VUE_APP_FIREBASE_MESSAGING_SENDER_ID`
- `VUE_APP_FIREBASE_APP_ID`

## Security Notes
- Never commit your `.env` file to version control
- Regenerate Firebase API keys if they're ever exposed
- Use Firebase Security Rules to protect your database
- Monitor Firebase usage for suspicious activity

## Troubleshooting
- If you see "Missing Firebase configuration" error, check your environment variables
- Make sure all required environment variables are set
- Verify Firebase project settings match your configuration
