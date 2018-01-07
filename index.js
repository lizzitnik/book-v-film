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
  const bookImage = `
  <img alt='book cover' src='${result.GoodreadsResponse.book[0].image_url[0]}'>
  `;
  const filmImage = `
  <img alt='film poster' src='${result.poster_path}'>
  `;

  $('.book-cover').html(bookImage);
  $('.film-cover').html(filmImage);
}


function watchSubmit() {
  $('.search-form').submit(function(event) {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.user-input');
    const query = queryTarget.val();

    queryTarget.val("");
    getDataFromApi(query, displayCover);
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
  getDataFromApi('the shining', renderCover)
  getDataFromApi('the shining', renderCover)
  //getMoreInfo();
}

$(renderApp);


