const OPENLIBRARY_ISBN_URL = 'http://openlibrary.org/search.json';
const OPENLIBRARY_SEARCH_URL = 'http://covers.openlibrary.org/b';

function getDataFromApi(searchTerm, callback) {
  const isbnQuery = { 
    q: `${searchTerm} in:name`
  };
}

function getMoreInfo() {
  $('.book-button').on('click', function() {
    $('.book-info').slideToggle('slow');
  });
  
  $('.film-button').on('click', function() {
    $('.film-info').slideToggle('slow');
  });
}

$(getMoreInfo);