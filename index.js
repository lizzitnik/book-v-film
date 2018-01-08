function getDataFromApi(url, searchTerm, callback) {
  
  $.getJSON({
  	url: url,
  	data: {
  		title: searchTerm
  	},
  	success: callback
  });
}

function renderCover(result) {
  const bookImage = `<img alt='Book Cover' src='${result.GoodreadsResponse.book[0].image_url[0]}'>
  `;

  $('.book-cover').html(bookImage);
}

function renderPoster() {
  const filmImage = `
  <img alt='Film Poster' src='https://image.tmdb.org/t/p/w300${
    result.poster_path}'
  `

  $('.film-cover').html(filmImage);
}

function renderBookReview(result) {
  const bookReview = `
    <span>${result.GoodreadsResponse.book[0].average_rating[0]}/5</span>
  `;

  $('.book-info').html(bookReview);
}

function renderFilmReview(result) {
  const filmReview = `
    <span>${result.results.vote_average}/10</span>
  `;

  $('.film-info').html(filmReview);
}


function watchSubmit() {
  $('.search-form').submit(function(event) {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.user-input');
    const query = queryTarget.val();

    queryTarget.val("");
    getDataFromApi('/books', 'fight club', renderCover);
    getDataFromApi('/films', 'fight club', renderPoster);
    
  });
}

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


