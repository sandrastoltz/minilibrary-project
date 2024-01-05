"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const infoPage = document.querySelector('#info-container');
const backBtn = document.getElementById('back-btn');
backBtn === null || backBtn === void 0 ? void 0 : backBtn.addEventListener('click', () => {
    infoPage === null || infoPage === void 0 ? void 0 : infoPage.classList.add('hide');
});
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        let bookResp = yield fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
        let bookData = yield bookResp.json();
        return bookData;
    });
}
function bookBtns() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let bookData = yield fetchData();
            bookData.forEach(book => {
                let titleBtn = btnsDesign(book);
                let bookContainer = document.getElementById('book-container');
                bookContainer === null || bookContainer === void 0 ? void 0 : bookContainer.append(titleBtn);
                titleBtn.addEventListener('click', () => {
                    bookInfo(book);
                    changeBookColor(book);
                    infoPage === null || infoPage === void 0 ? void 0 : infoPage.classList.remove('hide');
                });
            });
        }
        catch (error) {
            console.error('bookBtns', error);
        }
    });
}
;
bookBtns();
function btnsDesign(book) {
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
function bookInfo(book) {
    try {
        const infoDiv = document.getElementById('info-div');
        if (infoDiv) {
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
    }
    catch (error) {
        console.error('bookInfo', error);
    }
}
function changeBookColor(book) {
    let divBook = document.getElementById('book');
    while (divBook === null || divBook === void 0 ? void 0 : divBook.firstChild) {
        divBook.removeChild(divBook.firstChild);
    }
    const titleSpan = document.createElement('span');
    titleSpan.textContent = book.title;
    titleSpan.classList.add('info_title_book');
    divBook === null || divBook === void 0 ? void 0 : divBook.appendChild(titleSpan);
    const authorSpan = document.createElement('span');
    authorSpan.textContent = book.author;
    authorSpan.classList.add('info_author_book');
    divBook === null || divBook === void 0 ? void 0 : divBook.appendChild(authorSpan);
    if (divBook) {
        divBook.style.backgroundColor = book.color;
    }
    else {
        console.log("Error, 'book' finns ej i html");
    }
}
