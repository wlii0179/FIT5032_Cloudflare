<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    
    <!-- Query Control Panel -->
    <div class="query-controls">
      <h3>Query Controls</h3>
      <div>
        <label>Min ISBN:</label>
        <input type="number" v-model="minIsbn" placeholder="1000" />
      </div>
      <div>
        <label>Sort By:</label>
        <select v-model="sortBy">
          <option value="isbn">By ISBN</option>
          <option value="name">By Name</option>
        </select>
        <select v-model="sortOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div>
        <label>Limit Count:</label>
        <input type="number" v-model="limitCount" placeholder="10" min="1" max="50" />
      </div>
      <button @click="fetchBooks">Apply Query</button>
    </div>

    <!-- Book List -->
    <ul>
      <li v-for="book in books" :key="book.id" class="book-item">
        <div v-if="!book.editing">
          <span>{{ book.name }} - ISBN: {{ book.isbn }}</span>
          <div class="actions">
            <button @click="startEdit(book)" class="edit-btn">Edit</button>
            <button @click="deleteBook(book.id)" class="delete-btn">Delete</button>
          </div>
        </div>
        
        <!-- Edit Mode -->
        <div v-else class="edit-form">
          <input v-model="book.editName" placeholder="Book Name" />
          <input v-model="book.editIsbn" type="number" placeholder="ISBN" />
          <button @click="saveEdit(book)">Save</button>
          <button @click="cancelEdit(book)">Cancel</button>
        </div>
      </li>
    </ul>
    
    <!-- Query Result Info -->
    <div class="query-info">
      <p>Showing {{ books.length }} books</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const minIsbn = ref(1000);
    const sortBy = ref('isbn');
    const sortOrder = ref('asc');
    const limitCount = ref(10);

    const fetchBooks = async () => {
      try {
        // Build query conditions
        let q = collection(db, 'books');
        
        // Add where condition
        if (minIsbn.value) {
          q = query(q, where('isbn', '>', minIsbn.value));
        }
        
        // Add sorting
        q = query(q, orderBy(sortBy.value, sortOrder.value));
        
        // Add limit
        if (limitCount.value > 0) {
          q = query(q, limit(limitCount.value));
        }
        
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ 
            id: doc.id, 
            ...doc.data(),
            editing: false,
            editName: doc.data().name,
            editIsbn: doc.data().isbn
          });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
        alert('Query failed: ' + error.message);
      }
    };

    const startEdit = (book) => {
      book.editing = true;
      book.editName = book.name;
      book.editIsbn = book.isbn;
    };

    const saveEdit = async (book) => {
      try {
        const bookRef = doc(db, 'books', book.id);
        await updateDoc(bookRef, {
          name: book.editName,
          isbn: Number(book.editIsbn)
        });
        
        // Update local data
        book.name = book.editName;
        book.isbn = Number(book.editIsbn);
        book.editing = false;
        
        alert('Update successful!');
      } catch (error) {
        console.error('Error updating book: ', error);
        alert('Update failed: ' + error.message);
      }
    };

    const cancelEdit = (book) => {
      book.editing = false;
    };

    const deleteBook = async (bookId) => {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          const bookRef = doc(db, 'books', bookId);
          await deleteDoc(bookRef);
          
          // Remove from local array
          books.value = books.value.filter(book => book.id !== bookId);
          
          alert('Delete successful!');
        } catch (error) {
          console.error('Error deleting book: ', error);
          alert('Delete failed: ' + error.message);
        }
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      minIsbn,
      sortBy,
      sortOrder,
      limitCount,
      fetchBooks,
      startEdit,
      saveEdit,
      cancelEdit,
      deleteBook
    };
  }
};
</script>

<style scoped>
.query-controls {
  background: #f5f5f5;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.query-controls div {
  margin: 10px 0;
}

.query-controls label {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}

.query-controls input,
.query-controls select {
  margin-left: 10px;
  padding: 5px;
}

.book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.delete-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.edit-form {
  display: flex;
  gap: 10px;
  align-items: center;
}

.edit-form input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.edit-form button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.edit-form button:first-of-type {
  background: #2196F3;
  color: white;
}

.edit-form button:last-of-type {
  background: #ff9800;
  color: white;
}

.query-info {
  margin-top: 20px;
  font-style: italic;
  color: #666;
}
</style>