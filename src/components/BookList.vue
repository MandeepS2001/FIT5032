<template>
  <div class="book-list-wrapper">
    <!-- Header Section -->
    <div class="list-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <span class="header-icon">📚</span>
          <div class="icon-glow"></div>
        </div>
        <div class="header-text">
          <h2 class="list-title">Library Collection</h2>
          <p class="list-subtitle">Browse and manage your books</p>
        </div>
      </div>
      <div class="book-count-badge">
        <span class="count-number">{{ books.length }}</span>
        <span class="count-text">{{ books.length === 1 ? 'book' : 'books' }}</span>
      </div>
    </div>

    <!-- Query Filters -->
    <div class="query-section">
      <div class="query-label">
        <span class="query-icon">🔍</span>
        <span>Filter Options</span>
      </div>
      <div class="query-buttons">
        <button @click="fetchBooks('where')" class="query-btn active">
          <span class="btn-icon">🔍</span>
          <span class="btn-text">ISBN > 1000</span>
        </button>
        <button @click="fetchBooks('order')" class="query-btn">
          <span class="btn-icon">📝</span>
          <span class="btn-text">Sort A-Z</span>
        </button>
        <button @click="fetchBooks('limit')" class="query-btn">
          <span class="btn-icon">🔢</span>
          <span class="btn-text">First 5</span>
        </button>
      </div>
    </div>

    <!-- Books Grid -->
    <transition-group name="book-list" tag="div" class="books-grid" v-if="books.length > 0">
      <div v-for="book in books" :key="book.id" class="book-card">
        <div class="book-card-inner">
          <!-- Book Header -->
          <div class="book-header">
            <div class="book-icon-circle">
              <span class="book-icon">📖</span>
            </div>
            <div class="book-actions">
              <template v-if="editingBook === book.id">
                <button @click="saveBook(book.id)" class="action-btn save-btn" title="Save">
                  <span class="action-icon">💾</span>
                </button>
                <button @click="cancelEdit" class="action-btn cancel-btn" title="Cancel">
                  <span class="action-icon">❌</span>
                </button>
              </template>
              <template v-else>
                <button @click="editBook(book)" class="action-btn edit-btn" title="Edit">
                  <span class="action-icon">✏️</span>
                </button>
                <button @click="deleteBook(book.id)" class="action-btn delete-btn" title="Delete">
                  <span class="action-icon">🗑️</span>
                </button>
              </template>
            </div>
          </div>

          <!-- Book Content -->
          <div class="book-content">
            <div class="book-field">
              <label class="field-label">
                <span class="field-icon">📚</span>
                <span>Title</span>
              </label>
              <input
                v-if="editingBook === book.id"
                v-model="editForm.name"
                class="field-input"
                placeholder="Book title"
              />
              <div v-else class="field-value">{{ book.name }}</div>
            </div>

            <div class="book-field">
              <label class="field-label">
                <span class="field-icon">🔢</span>
                <span>ISBN</span>
              </label>
              <input
                v-if="editingBook === book.id"
                v-model="editForm.isbn"
                class="field-input"
                type="number"
                placeholder="ISBN number"
              />
              <div v-else class="field-value isbn-value">{{ book.isbn }}</div>
            </div>
          </div>

          <!-- Book Footer -->
          <div class="book-footer">
            <div class="book-id">
              <span class="id-label">ID:</span>
              <span class="id-value">{{ book.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition-group>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-animation">
        <span class="empty-icon">📚</span>
      </div>
      <h3 class="empty-title">No books found</h3>
      <p class="empty-text">Try adjusting your filters or add new books to get started</p>
    </div>

    <!-- Success Toast -->
    <transition name="toast">
      <div v-if="message" class="toast-message">
        <span class="toast-icon">✅</span>
        <span class="toast-text">{{ message }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import db from '../firebase/init'
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const message = ref('')
    const editingBook = ref(null)
    const editForm = ref({ name: '', isbn: '' })

    const fetchBooks = async (queryType) => {
      try {
        let q = collection(db, 'books')

        if (queryType === 'where') {
          q = query(q, where('isbn', '>', 1000))
        } else if (queryType === 'order') {
          q = query(q, orderBy('name', 'asc'))
        } else if (queryType === 'limit') {
          q = query(q, limit(5))
        }

        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (e) {
        console.error('Error:', e)
      }
    }

    const editBook = (book) => {
      editingBook.value = book.id
      editForm.value = { name: book.name, isbn: book.isbn }
    }

    const saveBook = async (bookId) => {
      try {
        await updateDoc(doc(db, 'books', bookId), {
          name: editForm.value.name,
          isbn: parseInt(editForm.value.isbn),
        })
        editingBook.value = null
        showMessage('Book updated successfully!')
        fetchBooks('where')
      } catch (e) {
        console.error('Error updating:', e)
      }
    }

    const cancelEdit = () => {
      editingBook.value = null
    }

    const deleteBook = async (bookId) => {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          await deleteDoc(doc(db, 'books', bookId))
          books.value = books.value.filter((book) => book.id !== bookId)
          showMessage('Book deleted successfully!')
        } catch (e) {
          console.error('Error deleting:', e)
        }
      }
    }

    const showMessage = (msg) => {
      message.value = msg
      setTimeout(() => {
        message.value = ''
      }, 3000)
    }

    onMounted(() => {
      fetchBooks('where')
    })

    return {
      books,
      message,
      editingBook,
      editForm,
      fetchBooks,
      editBook,
      saveBook,
      cancelEdit,
      deleteBook,
    }
  },
}
</script>

<style scoped>
.book-list-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Header */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 2px solid #e9ecef;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
}

.header-icon {
  font-size: 1.8rem;
  position: relative;
  z-index: 1;
  animation: float 3s ease-in-out infinite;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.header-text {
  flex: 1;
}

.list-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 5px 0;
}

.list-subtitle {
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
}

.book-count-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
}

.count-number {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.count-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 4px;
}

/* Query Section */
.query-section {
  margin-bottom: 30px;
}

.query-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1rem;
}

.query-icon {
  font-size: 1.2rem;
}

.query-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.query-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: white;
  color: #0ea5e9;
  border: 2px solid #0ea5e9;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1);
}

.query-btn:hover {
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
}

.query-btn.active {
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  color: white;
  border-color: transparent;
}

.btn-icon {
  font-size: 1.1rem;
}

/* Books Grid */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin-bottom: 20px;
}

.book-card {
  transition: all 0.3s ease;
}

.book-card-inner {
  height: 100%;
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.book-card-inner:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(14, 165, 233, 0.2);
  border-color: #0ea5e9;
}

/* Book Header */
.book-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
}

.book-icon-circle {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(14, 165, 233, 0.3);
}

.book-icon {
  font-size: 1.5rem;
}

.book-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-btn {
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
}

.save-btn {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.cancel-btn {
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
}

.delete-btn {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
}

.action-btn:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.action-icon {
  font-size: 1rem;
}

/* Book Content */
.book-content {
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.book-field {
  display: flex;
  flex-direction: column;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.field-icon {
  font-size: 1rem;
}

.field-value {
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 10px;
  color: #2c3e50;
  font-weight: 500;
  min-height: 22px;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.field-value:hover {
  background: #e9ecef;
}

.isbn-value {
  font-family: 'Courier New', monospace;
  color: #0ea5e9;
  font-weight: 600;
}

.field-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  font-family: inherit;
}

.field-input:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

/* Book Footer */
.book-footer {
  padding: 15px 20px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.book-id {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
}

.id-label {
  font-weight: 600;
  color: #6c757d;
}

.id-value {
  font-family: 'Courier New', monospace;
  color: #495057;
  background: #e9ecef;
  padding: 4px 10px;
  border-radius: 6px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-animation {
  margin-bottom: 25px;
}

.empty-icon {
  font-size: 5rem;
  display: inline-block;
  opacity: 0.3;
  animation: float 3s ease-in-out infinite;
}

.empty-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.empty-text {
  font-size: 1.1rem;
  color: #6c757d;
  margin: 0;
}

/* Toast Message */
.toast-message {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
  font-weight: 600;
  z-index: 1000;
}

.toast-icon {
  font-size: 1.3rem;
}

.toast-text {
  font-size: 1rem;
}

/* Transitions */
.book-list-enter-active,
.book-list-leave-active {
  transition: all 0.5s ease;
}

.book-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.book-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive */
@media (max-width: 768px) {
  .book-list-wrapper {
    padding: 25px;
  }

  .list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .header-content {
    gap: 15px;
  }

  .header-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .list-title {
    font-size: 1.5rem;
  }

  .books-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .query-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .query-btn {
    justify-content: center;
  }

  .toast-message {
    bottom: 20px;
    right: 20px;
    left: 20px;
  }
}
</style>
