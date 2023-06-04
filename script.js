
//api access key
const ACCESS_KEY = "A3ACjfashBZKsKQj5veVcHCTUYc_JhCaxjH9KQ3ymFI";

//import elenments from index.html file
const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");//.search-results coz its a class name
const showMore = document.getElementById("show-more-button");


let inputData = ""; //for key words for searching input 
let page = 1;  //default page number

//using async bcoz of response and fetch
async function searchImages(){
    inputData = inputElement.value; //holds value from inputElement
    //dynamic virable link, get first page number ${page} get ${inputData} dynamic
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${ACCESS_KEY}`; 

    const response = await fetch(url); //fetch data from url
    const data = await response.json();//convert response to json

    const results = data.results; //store data(json) into results

//initialize page number
    if (page === 1){
        searchResults.innerHTML = ""; //default page 
    }

    //map the results since it contains lots of data
    results.map((result) =>{
        //push the result into the html container
        const imageWrapper = document.createElement('div'); //create the wrapper contain
        imageWrapper.classList.add("search-result-image"); // add to class
        const image = document.createElement('img'); //create image element
        image.src = result.urls.small; //create src from image just like in the html
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.target = " _blank";
        imageLink.textContent = result.alt_description;

        //apppend to web page
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++; //increament page number

    //if page number is more, display the show more button
    if (page > 1){
        showMore.style.display = "block";
    }

}

//event listener for search button and call the searchImages function
formElement.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
});

//event listerner for showmore button
showMore.addEventListener("click", () =>{
    searchImages();
});