# Deploying to Digital Ocean App Platform

This guide will help you deploy your Vue.js food planner application to Digital Ocean App Platform using your GitHub Student benefits.

## Prerequisites

1. Digital Ocean account with GitHub Student Pack benefits activated
2. GitHub repository with your Vue.js application
3. Production-ready application code

## Step 1: Prepare Your Application

Before deploying, ensure that:

1. Your Firebase and Spoonacular API keys are properly set up
2. Your application has been tested locally
3. You have a proper `.gitignore` file (ignoring `node_modules`, `.env`, etc.)

## Step 2: Create a Production Build

Run the production build locally to ensure everything works:

```bash
npm run build
```

## Step 3: Set Up Digital Ocean App Platform

1. Log in to your [Digital Ocean account](https://cloud.digitalocean.com/)
2. Click on "Apps" in the left sidebar
3. Click "Create App"
4. Connect your GitHub repository
5. Select the branch you want to deploy (usually `main` or `master`)

## Step 4: Configure Your App

1. Configure Build Command: `npm run build`
2. Configure Output Directory: `dist`
3. Set up environment variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_SPOONACULAR_API_KEY`

## Step 5: Deploy Your App

1. Review your settings
2. Click "Launch App"
3. Wait for the build and deployment process to complete (5-10 minutes)

## Step 6: Test Your Deployed App

1. Once deployed, Digital Ocean will provide you with a URL
2. Test all functionality:
   - Authentication
   - Recipe search
   - Recipe saving
   - Grocery list management
   - Meal planning

## Step 7: Set Up Custom Domain (Optional)

1. Go to your app's settings
2. Click on "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting

### Common Issues:

1. **API Keys Not Working**: Ensure environment variables are correctly set in Digital Ocean App Platform
2. **Blank Screen**: Check the browser console for errors. May indicate build issues or missing dependencies
3. **Routing Issues**: Configure the proper redirect rules for your SPA in the Digital Ocean App Platform settings:
   - Add a rule to redirect all requests to `index.html`

### Fixing Issues:

1. Make changes to your code locally
2. Test thoroughly
3. Push changes to GitHub
4. Digital Ocean will automatically rebuild and redeploy your app

## Monitoring & Maintenance

- Set up monitoring in Digital Ocean to track errors and performance
- Check the logs regularly for any issues
- Consider setting up automatic backups for your Firebase data

---

Remember to redeem your $200 Digital Ocean credit as part of your GitHub Student benefits through the GitHub Student Developer Pack.
