# 🚀 Deploy Your Portfolio to Vercel

## Quick Deploy (5 minutes)

### Method 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to your project**:
   ```bash
   cd c:\Users\aakas\OneDrive\Desktop\portfolio-main\portfolio-main
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Login when prompted
   - Accept default settings
   - Your site will be live in seconds!

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

---

### Method 2: GitHub + Vercel Dashboard

1. **Create GitHub repository** and push your code:
   ```bash
   cd c:\Users\aakas\OneDrive\Desktop\portfolio-main\portfolio-main
   git init
   git add .
   git commit -m "Initial commit: React portfolio"
   git branch -M main
   git remote add origin https://github.com/akashmdshetty/portfolio.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Done!** Your site will be live at `https://your-project.vercel.app`

---

## What Happens During Deployment

Vercel will automatically:
- Detect it's a Vite project
- Run `npm install`
- Run `npm run build`
- Deploy the `dist` folder
- Give you a live URL

---

## After Deployment

### Custom Domain (Optional)

1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Update Your Portfolio

Whenever you make changes:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Vercel will automatically rebuild and deploy!

---

## Troubleshooting

**Build fails?**
- Check `npm run build` works locally first
- Verify all dependencies are in `package.json`

**Site not updating?**
- Clear Vercel cache in project settings
- Redeploy manually from dashboard

---

**Need help?** Check the [Vercel documentation](https://vercel.com/docs) or contact support.
