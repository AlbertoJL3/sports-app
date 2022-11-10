// Datepicker widget
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});

// Declare API news key
var newsCount = 3;
var newsContainer = document.querySelector(".news-container");
// var apiNewsKey = '15a5e83-9800-4550-bb67-90aa5baea803';
var apiNewsKey = "db4aab48-4635-49ff-a537-39a673481b78";

//  Loop through articles
function loopArticles(articles, newsCount) {
  for (let i = 0; i < newsCount + 1; i++) {
    // Title of article
    var titleArticle = articles[i].webTitle;
    console.log(titleArticle);
    // Url of article
    var urlArticle = articles[i].webUrl;
    console.log(urlArticle);
    // Date published
    var datePublished = moment(articles[i].webPublicationDate).format(
      "MM/DD/YYYY"
    );

    displayNews(titleArticle, urlArticle, datePublished);
  }
}

// Functionality to get each articles title, url, date published
function getArticles(data) {
  // Declare array of articles
  var articles = data.response.results;

  // Display Soccer News
  var headerNewsEl = document.createElement("h2");
  headerNewsEl.textContent = "Soccer News";
  headerNewsEl.style.cssText = `
  background-color: darkblue;
  color: white;
  font-size: 50px;
  text-align: center;
  padding: 5px 0;
`;

  newsContainer.appendChild(headerNewsEl);

  loopArticles(articles, newsCount);
  // See more element
  var seeMoreEl = document.createElement("button");
  seeMoreEl.textContent = "See more";
  seeMoreEl.setAttribute(
    "class",
    "btn btn-secondary btn-lg btn-block see-more"
  );
  seeMoreEl.addEventListener("click", function (e) {
    e.preventDefault();

    seeMoreEl.style.display = "none";
    newsCount = articles.length;
    loopArticles(articles, newsCount);
  });

  newsContainer.appendChild(seeMoreEl);
}

// Functionality to display news
function displayNews(titleArticle, urlArticle, datePublished) {
  // Display Title
  var newsEl = document.createElement("div");
  newsEl.style.cssText = `
  border:solid 2px black;
  text-align: center;
  margin-top: 10px;
 `;
  var titleEl = document.createElement("h4");
  titleEl.textContent = titleArticle;
  newsEl.appendChild(titleEl);

  // Display the url of the news page
  var urlEl = document.createElement("a");
  urlEl.setAttribute("href", urlArticle);
  urlEl.style.cssText = `
  color: green;
  padding-right: 10px;
 `;
  urlEl.textContent = urlArticle;
  newsEl.appendChild(urlEl);

  // Display parse date time ago for the published date
  var dateEl = document.createElement("p");
  dateEl.textContent = moment(datePublished).fromNow();
  dateEl.style.cssText = `
  color: grey;
  padding-right: 10px;
  text-align: right;
 `;
  newsEl.appendChild(dateEl);

  newsContainer.appendChild(newsEl);
}

//  Function to get data
function getNews(data) {
  getArticles(data);
}

// Functionality to get users news data from the input league, team and date form api(userLeague, userTeam, userDate)
var getApiNews = function (userLeague, userTeam, userDate) {
  // var apiUrl = 'https://content.guardianapis.com/search?q=' + userLeague + '&q=' + userTeam + '&from-date=' + userDate + '&api-key=' + apiNewsKey;
  var apiUrl =
    "https://content.guardianapis.com/search?q=champions%20league&q=juventus&from-date=2022-10-02&api-key=db4aab48-4635-49ff-a537-39a673481b78";

  // Access open weather map resources across the network
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // Function to get data
          getNews(data);
        });
      } else {
        // Input not correct, display status
        alert("Error: " + response.statusText);
      }
    })
    // Alert error if api caller fail
    .catch(function (error) {
      alert("Unable to connect to The Guardian ");
    });
};
getApiNews();
