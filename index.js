function getDataFromApi(searchTerm, callback) {
  
  $.getJSON({
  	url:'/books',
  	data: {
  		title: searchTerm
  	},
  	success: function(res) {
  		console.log(res);
  	}
  });
}

function renderCover(result) {
  return `
  <img alt='book cover' src='${result.book[0].image_url[0]}'>
  `;
}

function displayCover(cover) {
  const results = cover.items.map((item, index) => renderCover(item));
  $('.book-cover').html(results);
  console.log(results);
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
  renderCover();
  displayCover();
  getMoreInfo();
}

$(renderApp);


