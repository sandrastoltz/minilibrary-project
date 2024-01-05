const infoPage = document.querySelector('#info-container');
const backBtn = document.getElementById('back-btn');

// Lägger till tillbaka-knappen och gör den klickbar
backBtn?.addEventListener('click', () => {
    infoPage?.classList.add('hide');
});

// Ett interface av objekten i arrayen.
interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    year: number;
    pages: number;
    plot: string;
    audience: string;
    color: string;
  }

// Funktion för att hämta datan.
async function fetchData() {
    let bookResp = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');

    let bookData: Book[] = await bookResp.json();

    return bookData;
}

// Funktion för att göra varje bok till en knapp.
async function bookBtns() {
    try {
        let bookData = await fetchData();

        // Gör en forEach loop på arrayen 'bookData' som går genom varje element i arrayen, där varje element är ett objekt som representerar en bok 'book'.
        bookData.forEach(book => {

            let titleBtn = btnsDesign(book);

            // Lägger knapparna i en div i html.
            let bookContainer = document.getElementById('book-container');
            bookContainer?.append(titleBtn);

            titleBtn.addEventListener('click', () => {
                bookInfo(book);
                changeBookColor(book);
                infoPage?.classList.remove('hide');
            })
        })
    } catch (error) {
        console.error('bookBtns', error);
    }
};
bookBtns();

// Varje 'title' i listan blir en knapp med det specifika namnet som rubrik och 'author' som underrubrik. Varje knapp/bok får ett id med bokens id som finns i objektet.
function btnsDesign(book: Book) {
    const titleBtn = document.createElement('button');

    titleBtn.style.backgroundColor = book.color;

    const titleSpan = document.createElement('span');
    titleSpan.textContent = book.title;
    titleSpan.classList.add('book_title'); 
    titleBtn.appendChild(titleSpan);

    const authorSpan = document.createElement('span');
    authorSpan.textContent = book.author;
    authorSpan.classList.add('book_author'); 
    titleBtn.appendChild(authorSpan);

    titleBtn.setAttribute('data-title', book.title);
    titleBtn.setAttribute('id', book.id.toString());
    titleBtn.classList.add('book-title');

    return titleBtn;
}

// Funktion för att hämta info om varje bok.
function bookInfo(book: Book) {
    try {
        const infoDiv = document.getElementById('info-div');

        // Lista med info som hämtas.
        if(infoDiv) {
            infoDiv.textContent = '';

            let h2 = document.createElement('h2');
            h2.classList.add('info_book_title');
            h2.textContent = book.title;
            infoDiv.appendChild(h2);

            let h3 = document.createElement('h3');
            h3.classList.add('info_book_author');
            h3.textContent = book.author;
            infoDiv.appendChild(h3);

            let p = document.createElement('p');
            p.classList.add('info_book_plot');
            p.textContent = book.plot;
            infoDiv.appendChild(p);

            let div = document.createElement('div');
            div.classList.add('info_div_box');
            let section1 = document.createElement('section');
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            
            p1.textContent = 'Audience: ' + book.audience;
            p1.classList.add('info_book_audience');
            p2.textContent = 'First published: ' + book.year;
            p2.classList.add('info_book_year');
            
            section1.appendChild(p1);
            section1.appendChild(p2);
            div.appendChild(section1);
            
            let section2 = document.createElement('section');
            let p3 = document.createElement('p');
            let p4 = document.createElement('p');
            
            p3.textContent = 'Pages: ' + book.pages;
            p3.classList.add('info_book_pages');
            p4.textContent = 'Publisher: ' + book.publisher;
            p4.classList.add('info_book_publisher');
            
            section2.appendChild(p3);
            section2.appendChild(p4);
            div.appendChild(section2);
            
            infoDiv.appendChild(div);
        }
    } catch (error) {
        console.error('bookInfo', error);
    }
}

// Funktion för att ändra färg på boken på infosidan och lägga till titel + författare.
function changeBookColor(book: Book) {
    let divBook = document.getElementById('book');

    // En while-loop som tar bort alla barn till divBook (nollställer).
    while (divBook?.firstChild) {
        divBook.removeChild(divBook.firstChild);
    }

    const titleSpan = document.createElement('span');
    titleSpan.textContent = book.title;
    titleSpan.classList.add('info_title_book'); 
    divBook?.appendChild(titleSpan);

    const authorSpan = document.createElement('span');
    authorSpan.textContent = book.author;
    authorSpan.classList.add('info_author_book'); 
    divBook?.appendChild(authorSpan);

    if (divBook) {
        divBook.style.backgroundColor = book.color;
    } else {
        console.log("Error, 'book' finns ej i html");
    }
}