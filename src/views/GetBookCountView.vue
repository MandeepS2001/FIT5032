<template>
    <div id="app">
        <h1>Book Counter</h1>
        <button @click="getBookCount">Get Book Count</button>
        <p v-if="count !== null"> Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            count: null,
            error: null
        }
    },
    methods: {
        async getBookCount() {
            try {
                const res = await axios.get('https://us-central1-fit5032-week6-5d1b1.cloudfunctions.net/countBooks');
                this.count = res.data.count;
                this.error = null
            } catch (e) {
                this.error = e;
                this.count = null;
            }
        }
    }
}
</script>