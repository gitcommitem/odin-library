let bookList = [];

function book(title,author,pages,volumes,language,readStatus,cardColor){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.volumes = volumes,
    this.language = language,
    this.readStatus = readStatus,
    this.cardColor = cardColor
};

const bananafish = new book("Bananafish","Akimi Yoshida",null,"19","Japanese","Finished","yellow");
const yasha = new book("Yasha","Akimi Yoshida",null,"12","Japanese","Finished","blue");
const akira = new book("Akira","Katsuhiro Otomo",null,"6","Japanese","Finished","green");
const iwata = new book("Iwata-San","Hobonichi Itoi Shinbun","219",null,"Japanese","Reading","green");
const color = new book("Color and Light","James Gurney","222",null,"English","Finished","red");
const morpho = new book("Morpho: Simplified Forms: Anatomy for Artists","Michel Lauricella","95",null,"English","Reading","blue");

let preLoadedBooks = [akira,color,bananafish,yasha,iwata,morpho]

function pushToBookList(book){
    bookList.push(book);
};

preLoadedBooks.forEach(function(book){
    pushToBookList(book);
});


const bookshelfEl = document.querySelector("section#bookshelf");

bookList.forEach(function(book){
    let prevCard = bookshelfEl.firstChild;

    const cardEl = document.createElement("div");
    cardEl.classList.add("book-item");
    bookshelfEl.insertBefore(cardEl,prevCard);

    createHeroDiv(cardEl,"title","h1",book.title);
    createHeroDiv(cardEl,"author","h2",book.author);
    createThickDivider(cardEl);

    if(book.pages === null){
    createInfoDiv(cardEl,"volumes",book.volumes);
    }
    else{
        createInfoDiv(cardEl,"pages",book.pages);
    }

    createDivider(cardEl);
    createInfoDiv(cardEl,"language",book.language);
    createDivider(cardEl);
    createInfoDiv(cardEl,"read-status",book.readStatus);
    createThickDivider(cardEl);
    addCardColor(cardEl,book.cardColor);
    createEditDiv(cardEl);
}
);

function createHeroDiv(cardEl,keyNameString,headingType,objectValue){
    const contDivEl = document.createElement("div");
    contDivEl.classList.add(keyNameString);
    cardEl.appendChild(contDivEl);

    const headingEl = document.createElement(headingType);
    contDivEl.appendChild(headingEl);

    const headingTxt = document.createTextNode(`${objectValue}`);
    headingEl.appendChild(headingTxt);

    const dividerEl = document.createElement("hr");
    contDivEl.appendChild(dividerEl);

    const pEl = document.createElement("p");
    contDivEl.appendChild(pEl);

    const pTxt = document.createTextNode(keyNameString);
    pEl.appendChild(pTxt);
};

function createThickDivider(cardEl){
    const thickDividerEl = document.createElement("hr");
    thickDividerEl.classList.add("thick-divider");
    cardEl.appendChild(thickDividerEl);
};

function createDivider(cardEl){
    const dividerEl = document.createElement("hr");
    cardEl.appendChild(dividerEl);
};

function createInfoDiv(cardEl,keyNameString,objectValue){
    const contDivEl = document.createElement("div");
    contDivEl.classList.add("hflex",keyNameString);
    cardEl.appendChild(contDivEl);

    const labelPEl = document.createElement("p");
    labelPEl.classList.add("key-name")
    contDivEl.appendChild(labelPEl);

    const labelTxt = document.createTextNode(keyNameString);
    labelPEl.appendChild(labelTxt);

    const valuePEl = document.createElement("p");
    valuePEl.classList.add("value");
    contDivEl.appendChild(valuePEl);

    const valueTxt = document.createTextNode(`${objectValue}`);
    valuePEl.appendChild(valueTxt);
};

function createEditDiv(cardEl){
    const contDivEl = document.createElement("div");
    contDivEl.classList.add("hflex","edit");
    cardEl.appendChild(contDivEl);

    const pEl = document.createElement("p");
    contDivEl.appendChild(pEl);

    const bookCountTxt = document.createTextNode("No."+`${bookList.length}`);
    pEl.appendChild(bookCountTxt);

    const buttonEl = document.createElement("button");
    contDivEl.appendChild(buttonEl);

    const buttonTxt = document.createTextNode("Edit");
    buttonEl.appendChild(buttonTxt);
};

function addCardColor(cardEl,objectValue){
    cardEl.classList.add(objectValue);
}

const modalDisplayButtonEl = document.querySelectorAll("button.modal-toggle");

modalDisplayButtonEl.forEach(function(button){
button.addEventListener("click",function(){
toggleModalDisplay();
});
});

function toggleModalDisplay(){
    const modalContEl = document.querySelector("div#add-book-modal");
    modalContEl.classList.toggle("hidden");
};

const submitNewBookButtonEl = document.querySelector("button#add-book")

submitNewBookButtonEl.addEventListener("click",function(){
    let title = document.querySelector("input#title").value;
    let author = document.querySelector("input#author").value;
    
    let hasPages = document.querySelector("input[name=count]:checked").value === "pages";
    let pages = document.querySelector("input#count").value;
    let volumes = document.querySelector("input#count").value;

    hasPages ? volumes = null : pages = null;

    let language = document.querySelector("input#language").value;
    let readStatus = document.querySelector("input[name=read-status]:checked").value;
    let cardColor = document.querySelector("input[name=card-color]:checked").value;

    let newBook = new book(title,author,pages,volumes,language,readStatus,cardColor);
    pushToBookList(newBook);
    createNewBookCard(newBook);
    toggleModalDisplay();
});

function createNewBookCard(book){
    let prevCard = bookshelfEl.firstChild;

    const cardEl = document.createElement("div");
    cardEl.classList.add("book-item");
    bookshelfEl.insertBefore(cardEl,prevCard);

    createHeroDiv(cardEl,"title","h1",book.title);
    createHeroDiv(cardEl,"author","h2",book.author);
    createThickDivider(cardEl);

    if(book.pages === null){
    createInfoDiv(cardEl,"volumes",book.volumes);
    }
    else{
        createInfoDiv(cardEl,"pages",book.pages);
    }

    createDivider(cardEl);
    createInfoDiv(cardEl,"language",book.language);
    createDivider(cardEl);
    createInfoDiv(cardEl,"read-status",book.readStatus);
    createThickDivider(cardEl);
    addCardColor(cardEl,book.cardColor);
    createEditDiv(cardEl);
};