// Node 25+ removed SlowBuffer, which firebase-admin's JWT dependency still reads at load time.
const buffer = require('buffer');
if (!buffer.SlowBuffer) buffer.SlowBuffer = buffer.Buffer;

const express = require('express');
const firebaseAdmin = require('firebase-admin');
const cors = require('cors'); 

const app = express();

const serviceAccount = require('./svasthmaitri-firebase-adminsdk.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://aushadhimitra-ef844-default-rtdb.firebaseio.com/'
});

app.use(express.json());

app.use(cors());

app.post('/submit-medicine', (req, res) => {
  const { medicineName, quantity, location, email, expiryDate } = req.body;

  const db = firebaseAdmin.database();
  const medicineDonationsRef = db.ref('medicineDonations');

  medicineDonationsRef.push({
    medicineName,
    quantity,
    location,
    email,
    expiryDate
  })
    .then(() => {
      res.status(201).json({ message: 'Donation submitted successfully.' });
    })
    .catch(error => {
      console.error('Error submitting donation:', error);
      res.status(500).json({ error: 'Failed to submit donation.' });
    });
});

app.post('/submit-blood', (req, res) => {
  const { fullName, age, bloodType, location, email } = req.body;

  const db = firebaseAdmin.database();
  const bloodDonationsRef = db.ref('bloodDonations');

  bloodDonationsRef.push({
    fullName,
    age,
    bloodType,
    location,
    email
  })
    .then(() => {
      res.status(201).json({ message: 'Donation submitted successfully.' });
    })
    .catch(error => {
      console.error('Error submitting donation:', error);
      res.status(500).json({ error: 'Failed to submit donation.' });
    });
});

app.post('/submit-equipment', (req, res) => {
  const { equipmentName, quantity, condition, location, email } = req.body;

  const db = firebaseAdmin.database();
  const equipmentDonationsRef = db.ref('equipmentDonations');

  equipmentDonationsRef.push({
    equipmentName,
    quantity,
    condition,
    location,
    email
  })
    .then(() => {
      res.status(201).json({ message: 'Donation submitted successfully.' });
    })
    .catch(error => {
      console.error('Error submitting donation:', error);
      res.status(500).json({ error: 'Failed to submit donation.' });
    });
});

const requireSignIn = async (req, res, next) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Sign in to use the community page.' });
  }

  try {
    req.user = await firebaseAdmin.auth().verifyIdToken(header.slice(7));
    next();
  } catch (error) {
    res.status(401).json({ error: 'Your sign-in could not be verified. Please log in again.' });
  }
};

app.get('/posts', requireSignIn, async (req, res) => {
  try {
    const snapshot = await firebaseAdmin.database().ref('communityPosts').limitToLast(50).once('value');
    const posts = [];
    snapshot.forEach(child => {
      const { title, content, author, createdAt } = child.val();
      posts.push({ id: child.key, title, content, author, createdAt });
    });
    res.json(posts.reverse());
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to load posts.' });
  }
});

app.post('/posts', requireSignIn, async (req, res) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  const content = typeof req.body.content === 'string' ? req.body.content.trim() : '';

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  if (title.length > 120 || content.length > 2000) {
    return res.status(400).json({ error: 'Keep the title under 120 characters and the content under 2000.' });
  }

  try {
    const db = firebaseAdmin.database();
    const username = (await db.ref(`users/${req.user.uid}/username`).once('value')).val();
    const post = {
      title,
      content,
      author: typeof username === 'string' && username ? username : 'Community member',
      uid: req.user.uid,
      createdAt: Date.now()
    };
    const ref = await db.ref('communityPosts').push(post);
    res.status(201).json({ id: ref.key, title, content, author: post.author, createdAt: post.createdAt });
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'Failed to add post.' });
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
