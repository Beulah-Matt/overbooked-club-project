document.addEventListener('DOMContentLoaded', init = async () => {
    //get json data from db
    const books = await getDataFromDB();
    //render data to page
    renderBooks(books);
    //add listeners
    listenForLikes();
    getBookFromForm()
    
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

  const createBookCard = (elementsObj, kitabu) => {
    const { article, img, details, like, bookTitle, author, ISBN, reviews } =
      elementsObj;
    //constructing the bookCard
    details.className = "details";
    like.classList.add("like", "like-no");
    //author.textContent = `${kitabu.author}`;
    img.src = kitabu.image;
    //bookTitle.textContent = kitabu.title;
    //ISBN.textContent = kitabu.isbn;
    reviews.textContent = kitabu.reviews;
  
    //article.appendChild(ISBN);
    article.appendChild(img);
    //details.appendChild(author);
    //details.appendChild(bookTitle);
    details.appendChild(reviews);
    article.appendChild(details);
    article.appendChild(like);
  
    return article;
  };

  const listenForLikes = () => {
    const likes = document.querySelectorAll(".like");
    likes.forEach((like) => {
      like.addEventListener("click", (event) => {
        event.target.classList.toggle("like-no");
        event.target.classList.toggle("like-yes");
        if (event.target.classList.contains("like-yes")) {
          console.log("I like this!");
          favouriteData(event.target);
        } else {
          console.log("Not so much");
          favouriteData(event.target);
        }
      });
    });
  };
  
  //Heart that was clicked is the element
  const favouriteData = (element) => {
    const parent = element.parentElement;
    const img = parent.querySelector("img").src;
    const bookTitle = parent.querySelector("h2").textContent;
    const author = parent.querySelector("p").textContent;
    const favouriteObj = { img, bookTitle, author };
    return favouriteObj;
  };
  
  //Darkmode
const darkMode = () => {
    let element = document.body;
    let content = document.getElementById("DarkModetext");
    element.className = "dark-mode";
    content.innerText = "Dark As Night";
  };
  const lightMode = () => {
    let element = document.body;
    let content = document.getElementById("DarkModetext");
    element.className = "light-mode";
    content.innerText = "Bright Like The Sun";
  };
  
function  getBookFromForm (){
    let form = document.querySelector("form");
    
    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        let formInput = {
         title: document.querySelector('#title').value,
         author: document.querySelector('#author').value,
        ISBN: document.querySelector('#isbn').value,
        image:document.querySelector('#img').value,
        reviews: document.querySelector('#review').value
        }
           form.reset();
        
        postBook(formInput);    
      });
    }
    

function postBook(formInput){
    console.log(formInput);
    fetch("http://localhost:3000/Books", {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formInput)
    })
    .then(res => res.json())
    //.then(book => console.log(book))
}


   


   






  