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
   createNewBookCard(book);
});

function createNewBookCard(book){
    let prevCard = bookshelfEl.firstChild;

    let findBookTitle = (bookObject) => bookObject.title === book.title;
    let indexOfBook = bookList.findIndex(findBookTitle);

    const cardEl = document.createElement("div");
    cardEl.classList.add("book-item");

    createIndexDataAtt(cardEl,indexOfBook);

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
    createEditDiv(cardEl,indexOfBook);
};

function createIndexDataAtt(targetEl,indexOfBook){
    const indexDataAtt = document.createAttribute("data-index")
    indexDataAtt.value = `${indexOfBook}`;
    targetEl.setAttributeNode(indexDataAtt);
};

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

function createEditDiv(cardEl,indexOfBook){
    const contDivEl = document.createElement("div");
    contDivEl.classList.add("hflex","edit");
    cardEl.appendChild(contDivEl);

    const pEl = document.createElement("p");
    contDivEl.appendChild(pEl);

    const bookCountTxt = document.createTextNode("No."+`${indexOfBook + 1}`);
    pEl.appendChild(bookCountTxt);

    createButtonEl("delete-button","Delete",indexOfBook,contDivEl);
    createButtonEl("edit-button","Edit",indexOfBook,contDivEl);
};

function createButtonEl(className,textString,indexOfBook,contDivEl){
    const buttonEl = document.createElement("button");
    buttonEl.classList.add(className);
    contDivEl.appendChild(buttonEl);

    const buttonTxt = document.createTextNode(textString);
    buttonEl.appendChild(buttonTxt);

    createIndexDataAtt(buttonEl,indexOfBook);
};

function addCardColor(cardEl,objectValue){
    cardEl.classList.add(objectValue);
}

const modalDisplayButtonEl = document.querySelectorAll("button.modal-toggle");

modalDisplayButtonEl.forEach(function(button){
button.addEventListener("click",function(){

const isEditModalButton = button.classList.contains("edit");

isEditModalButton ? toggleModalDisplay("div#edit-book-modal") : toggleModalDisplay("div#add-book-modal");

});
});

function toggleModalDisplay(modalId){
    const modalContEl = document.querySelector(modalId);
    modalContEl.classList.toggle("hidden");
};

const AddBookSubmitButtonEl = document.querySelector("button#add-book");

AddBookSubmitButtonEl.addEventListener("click",function(){
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
    document.querySelector("div#add-book-modal form").reset();
    
    if(bookList.length ===1){
        document.querySelector("p.empty-state").remove();
     };

    toggleModalDisplay("div#add-book-modal");
});

bookshelfEl.addEventListener("click",function(event){
    let deleteButtonEl = event.target.classList.contains("delete-button");
    let editButtonEl = event.target.classList.contains("edit-button");
    let button = event.target;

    if(deleteButtonEl){
        deleteBook(button);
        updateBookShelf();
    }

    if(editButtonEl){
        getBookData(button);
        attachIndexToSubmitButton(button);
        toggleModalDisplay("div#edit-book-modal");
    }
});

function deleteBook(button){
    let index = button.dataset.index;

    bookList.splice(index,1);
    console.log(bookList);
};

function updateBookShelf(){
    let bookCardEl = document.querySelectorAll("div.book-item")
    bookCardEl.forEach(function(card){
        card.remove();
     });

    bookList.forEach(function(book){
        createNewBookCard(book);
     });

     const emptyBookshelf = bookList.length === 0;
     if(emptyBookshelf){
        const pEl = document.createElement("p");
        pEl.classList.add("empty-state")
        bookshelfEl.appendChild(pEl);
    
        const pTxt = document.createTextNode("No books yet.");
        pEl.appendChild(pTxt);
     };

};

function getBookData(button){
    let index = button.dataset.index;

    let title = bookList[index].title;
    let author = bookList[index].author;
    let pages = bookList[index].pages;
    let volumes = bookList[index].volumes;
    let language = bookList[index].language;
    let readStatus = bookList[index].readStatus;
    let cardColor = bookList[index].cardColor;

    const titleInputEl = document.querySelector("#edit-book-modal input#title")
    titleInputEl.value = title;

    const authorInputEl = document.querySelector("#edit-book-modal input#author")
    authorInputEl.value = author;

    if(pages === null){
        const pageOrVolInputEl = document.querySelector("#edit-book-modal input[value=volumes][name=count]")
        pageOrVolInputEl.checked = true;

        const volumesInputEl = document.querySelector("#edit-book-modal input#count")
        volumesInputEl.value = volumes;
    }
    else{
        const pageOrVolInputEl = document.querySelector("#edit-book-modal input[value=pages][name=count]")
        pageOrVolInputEl.checked = true;

        const pagesInputEl = document.querySelector("#edit-book-modal input#count")
        pagesInputEl.value = pages;
    };
    
    const languageInputEl = document.querySelector("#edit-book-modal input#language")
    languageInputEl.value = language;

    const readStatusInputEl = document.querySelector(`#edit-book-modal input[value="${readStatus}"][name=read-status]`)
    readStatusInputEl.checked = true;

    const cardColorInputEl = document.querySelector(`#edit-book-modal input[value=${cardColor}][name=card-color]`)
    cardColorInputEl.checked = true;
   
};

const editBookSubmitButtonEl = document.querySelector("#edit-book-modal button#edit-book");

function attachIndexToSubmitButton(button){
    let index = button.dataset.index;
    editBookSubmitButtonEl.dataset.index = index;
};

editBookSubmitButtonEl.addEventListener("click",function(){
    let index = editBookSubmitButtonEl.dataset.index
    updateBookData(index);
    updateBookCard(index);
    toggleModalDisplay("div#edit-book-modal");
});

function updateBookData(index){
    let updatedTitle = document.querySelector("#edit-book-modal input#title").value;
    let updatedAuthor = document.querySelector("#edit-book-modal input#author").value;
    
    let hasPages = document.querySelector("#edit-book-modal input[name=count]:checked").value === "pages";
    let updatedPages = document.querySelector("#edit-book-modal input#count").value;
    let updatedVolumes = document.querySelector("#edit-book-modal input#count").value;

    hasPages ? updatedVolumes = null : updatedPages = null;

    let updatedLanguage = document.querySelector("#edit-book-modal input#language").value;
    let updatedReadStatus = document.querySelector("#edit-book-modal input[name=read-status]:checked").value;
    let updatedCardColor = document.querySelector("#edit-book-modal input[name=card-color]:checked").value;

    let updatedBook = new book(updatedTitle,updatedAuthor,updatedPages,updatedVolumes,updatedLanguage,updatedReadStatus,updatedCardColor);

    bookList.splice(index,1,updatedBook);
};

function updateBookCard(index){
    let titleH1El = document.querySelector(`div.book-item[data-index="${index}"] div.title h1`);
    let updatedTitle = bookList[index].title;

    let authorH2El = document.querySelector(`div.book-item[data-index="${index}"] div.author h2`);
    let updatedAuthor = bookList[index].author;

    let hasPages = bookList[index].pages !== null;

    let languagePEl = document.querySelector(`div.book-item[data-index="${index}"] div.language p.value`);
    let updatedLanguage = bookList[index].language;

    let readStatusPEl = document.querySelector(`div.book-item[data-index="${index}"] div.read-status p.value`);
    let updatedReadStatus = bookList[index].readStatus;

    let cardEl = document.querySelector(`div.book-item[data-index="${index}"]`);
    let cardColorClassList = ["blue","yellow","green","red"];
    let updatedCardColor = bookList[index].cardColor;

    titleH1El.textContent = updatedTitle;
    authorH2El.textContent = updatedAuthor;

    if(hasPages){
        let countDivEl = document.querySelector(`div.book-item[data-index="${index}"] div.hflex`)
        let noPagesClass = countDivEl.classList.contains("pages") === false;

        if(noPagesClass){
            countDivEl.classList.remove("volumes");
            countDivEl.classList.add("pages");
            let keyNamePEl = document.querySelector(`div.book-item[data-index="${index}"] div.pages p.key-name`);
            keyNamePEl.textContent = "pages"
        }

        let pageCountPEl = document.querySelector(`div.book-item[data-index="${index}"] div.pages p.value`);
        let updatedPages = bookList[index].pages;

        pageCountPEl.textContent = updatedPages;
        
    }
    else{
        let countDivEl = document.querySelector(`div.book-item[data-index="${index}"] div.hflex`)
        let noVolumesClass = countDivEl.classList.contains("volumes") === false;

        if(noVolumesClass){
            countDivEl.classList.remove("pages");
            countDivEl.classList.add("volumes");
            let keyNamePEl = document.querySelector(`div.book-item[data-index="${index}"] div.volumes p.key-name`);
            keyNamePEl.textContent = "volumes"
        }

        let volumeCountPEl = document.querySelector(`div.book-item[data-index="${index}"] div.volumes p.value`);
        let updatedVolumes = bookList[index].volumes;

        volumeCountPEl.textContent = updatedVolumes;
    };
    
    languagePEl.textContent = updatedLanguage;
    readStatusPEl.textContent = updatedReadStatus;

    cardEl.classList.remove(...cardColorClassList);
    cardEl.classList.add(updatedCardColor);
};