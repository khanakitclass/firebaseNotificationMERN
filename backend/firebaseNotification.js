const admin = require('firebase-admin');

// Path to your Firebase service account key
const serviceAccount = require('./webdemo-b0a30-firebase-adminsdk-cwkrh-70f76bb23f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://<your-database-name>.firebaseio.com'
});

module.exports = admin;
