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

exports.addBook = onRequest({
  cors: true
}, async (req, res) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      res.status(405).send('Method not allowed')
      return
    }

    const { isbn, name } = req.body

    // Validate input
    if (!isbn || !name) {
      res.status(400).send('ISBN and name are required')
      return
    }

    // Add book to Firestore using Cloud Function with capitalized data
    const booksCollection = admin.firestore().collection('books')
    const docRef = await booksCollection.add({
      isbn: Number(isbn),
      name: name.toUpperCase(), // Capitalize the book name
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })

    console.log(`Book added with ID: ${docRef.id}, Original Name: ${name}, Capitalized Name: ${name.toUpperCase()}`)

    res.status(200).send({ 
      success: true, 
      id: docRef.id,
      originalName: name,
      capitalizedName: name.toUpperCase(),
      message: `Book added successfully via Cloud Function! Name capitalized: ${name} → ${name.toUpperCase()}`
    })
  } catch (error) {
    console.error('Error adding book:', error)
    res.status(500).send('Error adding book')
  }
})

exports.getAllBooks = onRequest({
  cors: true
}, async (req, res) => {
  try {
    // Get all books from Firestore
    const booksCollection = admin.firestore().collection('books')
    const snapshot = await booksCollection.get()
    
    const books = []
    snapshot.forEach((doc) => {
      books.push({
        id: doc.id,
        ...doc.data()
      })
    })

    console.log(`Retrieved ${books.length} books from Firestore`)

    res.status(200).send({ 
      success: true,
      count: books.length,
      books: books
    })
  } catch (error) {
    console.error('Error getting all books:', error)
    res.status(500).send('Error getting all books')
  }
})
