'use strict';


const apiKey = 'icjwDheECAvmwGdkD9dkGYsIKYLPEgShA9HcVNRH'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  
  console.log(responseJson);
  $('#results-list').empty();
  
  if(responseJson.total === '0'){
    $('#results-list').append(
      `<li><h3>Sorry, there are 0 match park found. Please try again</h3></li>`
    );
    $('#results').removeClass('hidden');
  }
  for (let i = 0; i < responseJson.data.length; i++){

    $('#results-list').append(
      `<li><h3>${i+1} ${responseJson.data[i].fullName} at States ${responseJson.data[i].states}</h3>
      <p>${responseJson.data[i].description}</p>
      <a target="_blank" href='${responseJson.data[i].url}'>${responseJson.data[i].fullName}</a>
      </li>`
    )};
  
  $('#results').removeClass('hidden');
};

function getYouTubeVideos(query, maxResults) {
  const params = {
    
    stateCode: query,
    limit: maxResults,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val() - 1;
    
    
    getYouTubeVideos(searchTerm, maxResults);
  });
}

$(watchForm);