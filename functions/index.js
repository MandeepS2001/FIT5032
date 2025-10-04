/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { onRequest } = require('firebase-functions/https')
const admin = require('firebase-admin')

admin.initializeApp()

exports.countBooks = onRequest({
  cors: true
}, async (req, res) => {
  try {
    const booksCollection = admin.firestore().collection('books')
    const snapshot = await booksCollection.get()
    const count = snapshot.size

    res.status(200).send({ count })
  } catch (error) {
    console.error('Error counting books:', error)
    res.status(500).send('Error counting books')
  }
})
