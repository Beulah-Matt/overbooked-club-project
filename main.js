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
      const cardObject = createCardElements();
      //Book card
      const card = createBookCard(cardObject, book);
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
    const deletebtn = document.createElement('button')
    return { article, img, details, like, bookTitle, author, ISBN, reviews, deletebtn};
  };

  const createBookCard = (cardObject, kitabu) => {
    //console.log(elementsObj);
    //console.log(kitabu.id);
    const { article, img, details, like, reviews, deletebtn} =
      cardObject;
    //constructing the bookCard
    details.className = "details";
    like.classList.add("like", "like-no");
    img.src = kitabu.image;
    reviews.textContent = kitabu.reviews;
    reviews.classList.add('reviewing');
      deletebtn.classList.add("delete-button")
  deletebtn.innerText="Delete"
  deletebtn.style.background="aqua"
  deletebtn.style.float="left"
    article.appendChild(img);
    details.appendChild(reviews);
    article.appendChild(details);
    article.appendChild(like);
    deletebtn.addEventListener('click', (event) => event.target.parentNode.remove())
    article.append(deletebtn)

    return article;

}

  const listenForLikes = () => {
    const likes = document.querySelectorAll(".like");
    likes.forEach((like) => {
      like.addEventListener("click", (event) => {
        event.target.classList.toggle("like-no");
        event.target.classList.toggle("like-yes");
        if (event.target.classList.contains("like-yes")) {
          console.log("I like this!");
        
        } else {
          console.log("Not so much");
         
        }
      });
    });
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


   


   






  