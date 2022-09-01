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
