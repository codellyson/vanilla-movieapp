const app = (function () {
  const key = "e109d342";
  const loader = document.querySelector("#loader");
  const display = (movies) => {
    loader.style.display = "none";
    if (movies === undefined || movies.length === 0) {
      Snackbar.show({
        text: "No movies found",
        pos: "bottom-center",
        actionTextColor: "#fff",
        backgroundColor: "#f44336",
        duration: 3000,
      });
      document.querySelector(
        "#output"
      ).innerHTML = `<h1 id="error">No movies found</h2>`;
      document.querySelector("button").disabled = false;
      document.querySelector("button").innerHTML = "Search";
    } else {
      loader.style.display = "none";
      let displayMovies = movies.map((movie, index) => {
        const { Title, Year, imdbID, Type, Poster } = movie;
        return `
      <div class="card" >
      <h6>  ${Title} </h6>
       <img src=${
         Poster === "N/A"
           ? "https://via.placeholder.com/450.png/09f/fff"
           : Poster
       } alt="Movie Poster"/> 
         <h6> ${Year}  </h6>
      </div> 
`;
      });
      const mainOutput = document.querySelector(".cards");
      if (mainOutput !== null) mainOutput.innerHTML = displayMovies.join(" ");
      document.querySelector("button").disabled = false;
      document.querySelector("button").innerHTML = "Search";
    }
  };

  const requestMovies = (moviesInput) => {
    const url = `https://www.omdbapi.com/?s=${moviesInput}&apikey=${key}`;
    axios
      .get(url)
      .then((response) => {
        if (response) {
          display(response.data.Search);
        } else {
          display([]);
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          Snackbar.show({
            text: error,
            pos: "bottom-center",
            actionTextColor: "#fff",
            backgroundColor: "#f44336",
            duration: 3000,
          });
        }
      });
  };

  return {
    requestMovies: (input) => requestMovies(input),
  };
})();

// Heading
const header = document.querySelector("h1");
const headerTitle = ["Vanilla ", "JavaScript", "Movie App"];

header.innerHTML = headerTitle
  .map((title, index) => {
    return `<span class="header-title" id="header-title-${index}">${title}</span>`;
  })
  .join(" ");

// implmentation of the search bar
document.addEventListener("click", async function (e) {
  if (!e.target.matches("button")) {
    return false;
  }
  const input = document.querySelector("#search-input").value;

  if (!input) {
    Snackbar.show({
      text: "Please enter a movie name",
      pos: "bottom-center",
      actionTextColor: "#fff",
      backgroundColor: "#f44336",
      duration: 3000,
    });
  } else {
    e.target.disabled = true;
    e.target.innerHTML = "Searching...";
    app.requestMovies(input);
  }
});
