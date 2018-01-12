function getDataFromApi(url, searchTerm, callback) {
  if (!searchTerm) {
    return
  };  

  $.getJSON({
  	url: url,
  	data: {
  		title: searchTerm
  	},
  	success: callback, 
    error: function() {
      alert(`${searchTerm} is not a title!`);
    }
  });
}

function renderCover(result) {
  const bookImage = result.GoodreadsResponse.book[0].image_url[0];

  $('.book-cover-image').attr('src', bookImage);
}

function renderPoster(result) {
  const filmImage = `https://image.tmdb.org/t/p/w300${
    result.poster_path}`;

  $('.film-poster-image').attr('src', filmImage);
}

function renderBookInfo(result) {
  const bookSynopsis = `
    <span>Synopsis will be availible with the next update. Sorry for the incovienience :(</span>
  `;

  const bookReview = `
    <span>${result.GoodreadsResponse.book[0].average_rating[0]} / 5</span>
  `;

  $('.book-synopsis').html(bookSynopsis);
  $('.book-review').html(bookReview);
}

function renderFilmInfo(result) {
  const filmSynopsis = `
    <span>${result.overview}</span>
  `;

  const filmReview = `
    <span>${result.vote_average} / 10</span>
  `;

  $('.film-synopsis').html(filmSynopsis);
  $('.film-review').html(filmReview);
}

function renderBookFacts(result) {
  const bookFacts = `
    <div class='facts'>
      <span>Title: <br><b>${result.GoodreadsResponse.book[0].title[0]}</b></span><br><br>
      <span>Author: <br><b>${result.GoodreadsResponse.book[0].authors[0].author[0].name[0]}</b></span><br><br>
      <span>Year Published: <br><b>${result.GoodreadsResponse.book[0].publication_year[0]}<b></span>
    </div>
  `;

  $('.book-facts').html(bookFacts);
} 

function renderFilmFacts(result) {
  const filmFacts = `
    <div class='facts'>
      <span>Title: <br><b>${result.title}</b></span><br><br>
      <span>Release Date: <br><b>${result.release_date}</b></span>
    </div>
  `;

  $('.film-facts').html(filmFacts);
} 

function handleBook(result) {
  renderCover(result);
  renderBookInfo(result);
  renderBookFacts(result);
}

function handleFilm(result) {
  renderPoster(result);
  renderFilmInfo(result);
  renderFilmFacts(result);
}

function watchSubmit() {
  $('.search-form').submit(function(event) {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.user-input');
    const query = queryTarget.val();

    //empties the search bar
    queryTarget.val("");

    getDataFromApi('/books', query, handleBook);
    getDataFromApi('/films', query, handleFilm);
  });
}

//handles the 'More Info' drop down menu
function getMoreInfo() {
  $('.book-button').on('click', function() {
    $('.book-info').slideToggle('slow');
    $('.book-button').css('content', '^');
  });
  
  $('.film-button').on('click', function() {
    $('.film-info').slideToggle('slow');
  });
}

function renderApp() {
  watchSubmit();
  getMoreInfo();
}

$(renderApp);