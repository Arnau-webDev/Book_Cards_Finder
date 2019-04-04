
let allButtons;

// Fetch Books Class

class Books {
    constructor() {
        this.url = "https://api.myjson.com/bins/zyv02";
    }

    async getBooks() {
        const response = await fetch(this.url);
        const responseData = await response.json();

        return responseData
    }
}

// UI CLass

class UI {
    constructor() {
        this.container = document.getElementById("wrapper");
        this.modal = document.querySelector(".modal-body");
        this.modalTitle = document.getElementById("bookModal");
        this.counter = 0;
    }

    displayBooks(data) {
        let output = "";
        console.log(data.books);

        data.books.forEach((element) => {
            output += `
                <div class="m-2 text-center cardContainer">
                    <div class="card">
                        <div class="back">
                            <ul class="list-group">
                                <li class="list-group-item text-uppercase font-weight-bold">Book title</li>
                                <li class="list-group-item text-capitalize">${element.title}</li>
                                <li class="list-group-item text-uppercase font-weight-bold">Book Description</li>
                                <li class="list-group-item">${element.description}</li>
                                <li class="list-group-item text-uppercase font-weight-bold">Book Language</li>
                                <li class="list-group-item text-capitalize">${element.language}</li>
                                <button id="${this.counter}" class="btn btn-dark p-2" data-toggle="modal" data-target="#exampleModalCenter">See More!</button>
                            </ul>
                        </div>
                        <div class="front">
                            <img class="img-fluid" src="${element.detail}"/>
                        </div>
                    </div>
                </div>`;
            this.counter++;
        });

        this.container.innerHTML = output;
        allButtons = document.querySelectorAll(".btn");

        allButtons.forEach(element => {
            element.addEventListener("click", () => {
                const selectedBook = element.id;
                ui.displayModal(data, selectedBook);
            })
        })
        console.log(allButtons);
    }

    displayModal(data, id) {
        this.modalTitle.innerHTML = data.books[id].title;
        this.modal.innerHTML = `
            <img class="img-fluid" src="${data.books[id].cover}" />
        `;
    }
}


// Call Classes

const books = new Books();
const ui = new UI();

books.getBooks()
    .then((books) => {
        console.log(books);
        ui.displayBooks(books);
    })
    .catch(err => console.log(err));


// Modal
