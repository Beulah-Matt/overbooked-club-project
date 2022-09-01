document.addEventListener('DOMContentLoaded', init = async () => {
    //get json data from db
    const books = await getDataFromDB();
    //render data to page
    renderBooks(members);
    //add listeners
    listenForLikes();
});

const getDataFromDB = async () => {
    const dataStream = await fetch("http://localhost:3000/Books");
    const jsonData = await dataStream.json();
  
    return jsonData;
  };

  const renderBooks = (books) => {
   
    const articles = document.getElementById("articles-holder");
    const cardsArray = [];
    books.forEach((book) => {
      //card element
      const elementsObj = createCardElements();
      //Book card
      const card = createBookCard(elementsObj, book);
      //push each card to the array
      cardsArray.push(card);
    });
    
    cardsArray.forEach((card) => {
     
      articles.appendChild(card);
    });
    // console.log(renderBooks);
  };

  const createCardElements = () => {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const details = document.createElement("div");
    const like = document.createElement("div");
    const bookTitle = document.createElement("h2");
    const author = document.createElement("p");
    const ISBN = document.createElement("p");
    const reviews = document.createElement("p");
    return { article, img, details, like, bookTitle, author, ISBN, reviews };
  };