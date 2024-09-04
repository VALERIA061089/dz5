let library = JSON.parse(localStorage.getItem('library')) || [];
window.onload = showBooks;

const add = document.getElementById('add');
add.onclick = addBook;

//Добавить книгу
function addBook() {
    const bookName = document.getElementById('bookName').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookYear = document.getElementById('bookYear').value;
    const bookGenre = document.getElementById('bookGenre').value;
    const status_read = document.getElementById('status_read').value;

    library.push({ name: bookName, author: bookAuthor, year: bookYear, genre: bookGenre, status: status_read })
    localStorage.setItem('library', JSON.stringify(library));
    showBooks();

    document.getElementById('bookName').value = "";
    document.getElementById('bookAuthor').value = "";
    document.getElementById('bookYear').value = "";
    document.getElementById('bookGenre').value = "";
    document.getElementById('status_read').value = "";

    displayTotalBooks();
}

//Показать книгу
function showBooks() {
    const innerHTML = library.reduce((acc, book, index) => {
        return acc + `<div>
            <b>Название:</b> ${book.name}
            <b>Автор:</b> ${book.author}
            <b>Год издания:</b> ${book.year}
            <b>Жанр:</b> ${book.genre}
            <b>Статус:</b> ${book.status}
        </div>
        <div>
          <button onclick="editBook(${index})">Редактировать</button>
          <button onclick="deleteBook(${index})">Удалить</button>
        </div>`
    }, '')
    document.getElementById('result').innerHTML = innerHTML;
}

//Редактировать книгу
function editBook(index) {
    const book = library[index]
     document.getElementById('bookName').value = book.name;
     document.getElementById('bookAuthor').value = book.author;
     document.getElementById('bookYear').value = book.year;
     document.getElementById('bookGenre').value = book.genre;
     document.getElementById('status_read').value = book.status;
        
     deleteBook(index);
     displayTotalBooks();
 }    

//Удалить книгу
function deleteBook(index) {
    library.splice(index, 1);
    localStorage.setItem('library', JSON.stringify(library));
    showBooks();
    displayTotalBooks();
}

//Фильтрация книг
const filterButton = document.getElementById('filterBookButton');
filterButton.onclick = filterBooks;

function filterBooks() {
    library = JSON.parse(localStorage.getItem('library')) || [];
    const filterBook = document.getElementById('filterBook').value;
    
    library = library.filter(function (book) {
        return book.genre.toLowerCase().includes(filterBook.toLowerCase()) || book.status.toLowerCase().includes(filterBook.toLowerCase())
    })

    showBooks();  
    displayTotalBooks();  

    document.getElementById('filterBook').value = "";
}

//Всего книг
function displayTotalBooks() {
    const totalBooksElement = document.getElementById("totalBooks");
    totalBooksElement.textContent = library.length;
    showBooks(); 
}
displayTotalBooks();

//Удалить все
const deleteAllBook = document.getElementById('btn_delete_all');
deleteAllBook.onclick = deleteAll;

function deleteAll () {
    library = [];
    localStorage.removeItem('library');
    showBooks();
}