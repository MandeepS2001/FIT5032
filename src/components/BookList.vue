<template>
    <div>
        <h1>Books with ISBN > 1000 </h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
            </li>
        </ul>
    </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import db from '../firebase/init'
import { collection, query, where, getDocs } from 'firebase/firestore';
export default {
    setup() {
        const books = ref([])

        const fetchBooks = async () => {
            try {
                const q = query(collection(db, 'books'), where('isbn', '>', 1000));
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    booksArray.push({ id: doc.id, ...doc.data() });
                })
                books.value = booksArray;
                console.log(booksArray)
            } catch (e) {
                console.error('Error fetching books:', e)
            }
        }

        onMounted(() => {
            fetchBooks();
        })

        return {
            books
        }
    }
}
</script>