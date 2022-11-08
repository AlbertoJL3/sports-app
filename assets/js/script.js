// Datepicker widget
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});

// Declare API news key
var apiNewsKey = 'db4aab48-4635-49ff-a537-39a673481b78';

// Functionality to get each articles title, url, date published
function getArticles(data){
    // Declare array of articles
  var articles = data.response.results;
   
  // Loop through articles
  for(let i = 0; i< articles.length ; i++){
    // Title of article
    var titleArticle = articles[i].webTitle;
    console.log(titleArticle)
    // Url of article
    var urlArticle = articles[i].webUrl;
      console.log(urlArticle)
    // Date published
    var datePublished = moment(articles[i].webPublicationDate).format('MM/DD/YYYY');
    console.log(datePublished)
    }
}

//  Function to get data
function getNews(data) {

  getArticles(data);

}

// Functionality to get users news data from the input league, team and date form api(userLeague, userTeam, userDate)
var getApiNews = function (userLeague, userTeam, userDate) {
  var apiUrl = 'https://content.guardianapis.com/search?q=' + userLeague + '&q=' + userTeam + '&from-date=' + userDate + '&api-key=' + apiNewsKey;
  // var apiUrl ='https://content.guardianapis.com/search?q=champions%20league&q=juventus&from-date=2022-10-02&api-key=db4aab48-4635-49ff-a537-39a673481b78'

  // Access open weather map resources across the network
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          // Function to get data
          getNews(data);
        });
      } else {
        // Input not correct, display status
        alert('Error: ' + response.statusText);
      }
    })
    // Alert error if api caller fail
    .catch(function (error) {
      alert('Unable to connect to The Guardian ');
    });
};
// getApiNews()