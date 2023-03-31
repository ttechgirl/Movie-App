//TMBD API CALL 
const API_KEY = "api_key=a478360039196299bf702796667b85c3";
const BASE_URL= "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL= BASE_URL + "/search/movie?&"+API_KEY; 

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//this query the button  on click
//document.querySelector('.btn').addEventListener('click',getMovies);



getMovies(API_URL);

//fetching JSON response from the url with the FetchAPI 
function getMovies(url){

    fetch(url).then(res=>res.json()).then(data =>{
        //console.log(data.results);
        //results is an array 
        showMovies(data.results);

    })
}

function showMovies(data){
    main.innerHTML='';


    data.forEach(movie => {
        const {title, overview,vote_average,poster_path}= movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML =
        `<img src="${IMG_URL + poster_path}" alt="${title}"> 
         <div class="movie-info">  
             <h3>${title}</h3> 
             <span class="${getColor(vote_average)}"> ${vote_average}</span>
         </div> 

          <div class="overview"> 
              <h3>Overview</h3> 
              ${overview}
          </div>
        `   
        main.appendChild(movieEl);
    })
}

function getColor(vote){
    if(vote>=6){
        return `white`
    }
    else if(vote>=5.9){
        return `green`
    }
    else {
        return `red`
    }
}

//this query the search form on submit

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm=search.value;

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm);
    }
    else if(searchTerm =="" ){

        alert('Movie not found');
        
    }

    else{
        alert('Entry cannot be empty');
    }

})


