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