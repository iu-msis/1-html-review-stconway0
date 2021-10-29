const BooksApp = {
  data() {
    return {
      books: [],
      bookForm: {},
      selectedBook: null
    }
  },
  computed: {},
  methods: {
    /* Adding the "$" sign to float */
    prettyDollar(n) {
        const d = new Intl.NumberFormat("en-US").format(n);
        return "$ " + d;
    },

    /* Fetching data for books.html */
    fetchBooksData() {
        fetch('/api/books/')
        .then( response => response.json() )
        .then( (responseJson) => {
            console.log(responseJson);
            this.books = responseJson;
        })
        .catch( (err) => {
            console.error(err);
        })
    },

    /* Function to check if a new book is being added or a data point is being edited */
    postBook(evt){
      console.log ("Test:", this.selectedBook);
      if (this.selectedBook) {
          this.postEditBook(evt);
      } else {
          this.postNewBook(evt);
      }
    },

    /* Post new book */
    postNewBook(evt) {
        fetch('api/books/create.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
            
            // reset the form
            this.handleResetEdit();
          });
    },

    /* Editing book information */
    handleEditBook(book) {
      this.selectedBook = book;
      this.bookForm = Object.assign({}, this.selectedBook);
    },

    handleResetEdit() {
      this.selectedBook = null;
      this.bookForm = {};
    },

    postEditBook(evt) {
      this.bookForm.id = this.selectedBook.id;
  
      console.log("Editing!", this.bookForm);
  
      fetch('api/books/update.php', {
          method:'POST',
          body: JSON.stringify(this.bookForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          
          this.books = json;
          
          this.handleResetEdit();
        });
    },

    /* Deleting book information */
    postDeleteBook(book) {
      if (!confirm("Are you sure you want to delete the selected book?")) {
          return;
      }
  
      console.log("Delete!", book);
  
      fetch('api/books/delete.php', {
          method: 'POST',
          body: JSON.stringify(book),
          headers: {
              "Content-Type": "application/json; charset=utf-8"
          }
          })
          .then(response => response.json())
          .then(json => {
              console.log("Returned from post:", json);
              
              this.books = json;
  
              
              this.handleResetEdit();
          });
    }
  },
  created() {
      this.fetchBooksData();
  }
}

Vue.createApp(BooksApp).mount('#booksApp');


