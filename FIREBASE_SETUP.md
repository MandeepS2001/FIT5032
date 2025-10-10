# 🔥 Firebase Setup Guide for MDAN Library

## Step 1: Create Your Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: **`mdan-library`** (or your preferred name)
4. Click **Continue**
5. Disable Google Analytics (or enable if you want)
6. Click **Create project**

## Step 2: Create a Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Enter app nickname: **`mdan-library-web`**
3. Click **"Register app"**
4. **IMPORTANT:** Copy the `firebaseConfig` object that appears

## Step 3: Update Your Configuration

1. Open `src/firebase/init.js` in your project
2. Replace the `firebaseConfig` object with your own configuration
3. It should look something like this:

```javascript
const firebaseConfig = {
  apiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'mdan-library-xxxxx.firebaseapp.com',
  projectId: 'mdan-library-xxxxx',
  storageBucket: 'mdan-library-xxxxx.firebasestorage.app',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:xxxxxxxxxxxxxxxxxx',
}
```

## Step 4: Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click **"Get started"**
3. Click on **"Email/Password"** under Sign-in providers
4. Toggle **Enable** to ON
5. Click **Save**

## Step 5: Create Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose your preferred location
5. Click **Enable**

## Step 6: Set Up Firestore Rules (Optional)

Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 7: Test Your Setup

1. Save all your changes
2. Run `npm run dev`
3. Navigate to http://localhost:5173
4. Try registering a new user
5. Check Firebase Console → Authentication → Users to see registered users
6. Check Firestore Database to see books collection

## ✅ You're All Set!

Your MDAN Library project is now using your own Firebase backend!

---

### Troubleshooting

**Error: Firebase not initialized**

- Make sure you've replaced ALL the config values in `init.js`
- Check that your API key doesn't have quotes or extra spaces

**Error: Auth domain not authorized**

- Go to Firebase Console → Authentication → Settings → Authorized domains
- Add `localhost` if not already there

**Error: Permission denied in Firestore**

- Check your Firestore Rules
- Make sure test mode is enabled or rules allow your operations

---

Need help? Check the [Firebase Documentation](https://firebase.google.com/docs)
