const key = "e109d342";

const display = movies => {
  let displayMovies = movies.map((movie, index) => {
    const { Title, Year, imdbID, Type, Poster } = movie;
    return `
    
      <div class="three columns card" >
      <h6> <code> ${Title} </code> </h6>
       <img src="${Poster}"/> 
        
         <h6> <code> ${Year} </code> </h6>
      </div>
      
`;
  });
  const mainOutput = document.getElementById("output");
  mainOutput.innerHTML = displayMovies.join("");
};

const requestMovies = async moviesInput => {
  const url = `https://www.omdbapi.com/?s=${moviesInput}&apikey=${key}`;
  let output;
  try {
    const response = await axios.get(url);
    let movies = response.data.Search;
    display(movies);
    let loader = document.getElementById("loader");
    loader.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};

document.addEventListener("click", function(e) {
  if (!e.target.matches("#btn")) {
    return false;
  }
  let searchInput = document.getElementById("search-input").value;
  if (searchInput === "") {
    let errMsg = document.getElementById("errorMsg");
    errMsg.textContent = "Please provide an input";
    errMsg.style.display = "block";
    setTimeout(() => {
      errMsg.style.display = "none";
    }, 1000);
    // console.log("Please provide an input");
    return false;
  } else {
    requestMovies(searchInput);
  }
});
