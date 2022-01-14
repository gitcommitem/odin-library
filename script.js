let bookList = [];

function book(title,author,volumes,pages,language,read){
    this.title = title,
    this.author = author,
    this.volumes = volumes,
    this.pages = pages,
    this.language = language,
    this.read = read
};

const bananafish = new book("Bananafish","Akimi Yoshida","19",null,"Japanese","Completed");
const yasha = new book("Yasha","Akimi Yoshida","12",null,"Japanese","Completed");
const akira = new book("Akira","Katsuhiro Otomo","6",null,"Japanese","Completed");
const iwata = new book("Iwata-San","Hobonichi Itoi Shinbun",null,"219","Japanese","Reading");

function pushToBookList(book){
    bookList.push(book);
};

pushToBookList(akira);
pushToBookList(bananafish);
pushToBookList(yasha);
pushToBookList(iwata);

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
    createInfoDiv(cardEl,"read-status",book.read);
    createThickDivider(cardEl);
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
    toggleModalDisplay();
});