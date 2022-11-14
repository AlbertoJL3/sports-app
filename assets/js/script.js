// Datepicker widget
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});


// variables
var matchboxesEl = $('#matchbox')
var welcomeText = document.querySelector("#welcome-note");
var contentDiv = document.querySelector(".content");
var searchBtn = document.querySelector("#search-btn");
var formsEl = document.querySelectorAll(".userform");
var mainEl = document.querySelector("main")
var resultsEl = document.querySelector(".results")

var searchBtnEl = $('#search-btn')
var matchboxesEl = $('#matchbox')
var j = 0;

searchBtnEl.on('click', function () {
  //Get User Input Values
  var userLeague = $('#leagueList').val()
  var userTeam = $('#teamsList').val()
  var userDate = moment($('#datepicker').val()).format("DD/MM/YYYY");
 
  var newsLeague = userLeague.replace(" ", "%20")
  var newsTeam = userTeam.replace(" ", "%20")
  var newsDate = moment(userDate).format('YYYY-MM-DD')

  
  // Comparing new inputs with last inputs to not double the display

  if ((lastUserLeague !== userLeague) || (lastUserTeam !== userTeam) || (lastUserDate !== userDate)) {
    newsContainer.innerHTML = ""
    getApiNews(userLeague, userTeam, userDate);

  if((lastUserLeague !== newsLeague)||(lastUserTeam !== newsTeam)||(lastUserDate !== newsDate)){
    newsContainer.innerHTML = ""
    matchboxesEl.innerHTML = ""
    getApiNews(newsLeague, newsTeam, newsDate);
    getMatchData(userLeague, userTeam, userDate);

    // matchboxesEl.innerHTML = ""
    // getMatchData(league, team, date)
  }
  
  // Save last inputs

  var lastUserLeague = userLeague
  var lastUserTeam = userTeam
  var lastUserDate = userDate

  var lastUserLeague = newsLeague
  var lastUserTeam = newsTeam
  var lastUserDate = newsDate
 
  // get results data
  DisplayResults()
})

function DisplayResults() {
  // Display Results
  welcomeText.style.display = 'none';
  contentDiv.classList.add("content-element");
  contentDiv.classList.remove("userform", "content");
  for (var i = 0; i < formsEl.length; i++) {
    formsEl[i].setAttribute("style", "margin: 0 1px;");
  }
  searchBtn.setAttribute("style", "margin: 0 1px;");


  // Display search box, results in column
  mainEl.setAttribute("style", "display:flex; flex-direction: column;");
  // Give Space for news box and matchbox 
  resultsEl.classList.add("col-lg-12")

  resultsEl.style.cssText =
  `display: flex; 
  justify-content: center;`
  newsContainer.classList.add("col-lg-5")
  matchboxesEl.addClass("col-lg-5")

})


  newsContainer.classList.add("col-lg-6")
  matchboxesEl.classList.add("col-lg-6")
}


// Declare API news key
var newsCount = 3;
var newsContainer = document.querySelector(".news-container");
// var apiNewsKey = '15a5e83-9800-4550-bb67-90aa5baea803';
var apiNewsKey = "db4aab48-4635-49ff-a537-39a673481b78";

// Create a go back button
var goBackEl = document.createElement("button");
goBackEl.textContent = "Go Back";
goBackEl.setAttribute("class", "btn btn-secondary btn-lg btn-block go-back");
goBackEl.style.display = 'none';

// Functionality to display news
function displayNews(titleArticle, urlArticle, datePublished) {
  // Display Title
  var newsEl = document.createElement("div");
  newsEl.style.cssText = `
  border:solid 2px black;
  text-align: center;
  margin-top: 10px;
  background-color: rgba(255,255,255,0.8);
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


//  Loop through articles
function loopArticles(articles, newsCount) {
  for (let i = 0; i < newsCount + 1; i++) {
    if (i < articles.length) {
      // Title of article
      var titleArticle = articles[i].webTitle;
      // Url of article
      var urlArticle = articles[i].webUrl;
      // Date published
      var datePublished = moment(articles[i].webPublicationDate).format("MM/DD/YYYY");

      displayNews(titleArticle, urlArticle, datePublished);
    }
    else {
      newsContainer.appendChild(goBackEl);
    }
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
  background-color: rgb(65, 64, 64);
  color: white;
  font-size: 50px;
  text-align: center;
  padding: 5px 0;
  border-radius: 10px 10px 0 0;
`;
  newsContainer.appendChild(headerNewsEl);
  loopArticles(articles, newsCount);

  // See more element
  var seeMoreEl = document.createElement("button");
  seeMoreEl.textContent = "See more";
  seeMoreEl.setAttribute("class", "btn btn-secondary btn-lg btn-block see-more");
  newsContainer.appendChild(seeMoreEl);

  // Add event to see all articles
  seeMoreEl.addEventListener("click", function (e) {
    e.preventDefault();
    seeMoreEl.style.display = "none";
    var newsCount = articles.length;
    loopArticles(articles, newsCount);
    goBackEl.style.display = "block";
    // Hide matches container
    document.querySelector("#matchbox").style.display = "none";
  });

  // Add event to see only 3 articles
  goBackEl.addEventListener("click", function (e) {
    e.preventDefault();
    // var newsCount = 3;
    goBackEl.style.display = "none";
    seeMoreEl.style.display = "block";
    newsCount = articles.length
    for (let i = 6; i < newsCount + 7; i++) {
      var removeEL = newsContainer.children[i]
      removeEL.style.display = "none";
    }
    // Show matches container
    document.querySelector("#matchbox").style.display = "block";
  });
}

//  Function to get data
function getNews(data) {
  getArticles(data);
  newsContainer.style.cssText = `
  display: flex;
  flex-direction: column;
  margin: 50px;
  border: solid 2px black;
  border-radius: 10px;
  padding: 0;
  `;
}
var userLeague = "champions%20league"
var userTeam = "A.C.%20Milan"
var userDate = "2022-10-02"


// Functionality to get users news data from the input league, team and date form api(userLeague, userTeam, userDate)
var getApiNews = function (userLeague, userTeam, userDate) {
  var apiUrl = 'https://content.guardianapis.com/search?q=' + userLeague + '&q=' + userTeam + '&from-date=' + userDate + '&api-key=' + apiNewsKey;

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




var searchBtnEl = $('#search-btn')
var j = 0;



//get leagueID and set as var
//key1: cc22227a09msh80aec473e0852dap1635eejsn104bb08e4e11
//key2: 26eb315a46msh99f692d58ae8f5fp13ad5cjsn2bd8a4ffb6e6

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'cc22227a09msh80aec473e0852dap1635eejsn104bb08e4e11',
    'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
  }
};

//user input
var eventsData = {};
var leagueGames = {};

//GIVEN a league, team and date
function getMatchData(league, team, date) {
  //all games on that date are fetched
  fetch('https://footapi7.p.rapidapi.com/api/matches/' + date, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //gets every game in that league or team
      console.log(data)


      // header for matches
      var headerMatchEl = document.createElement("h2");
      headerMatchEl.textContent = "Matches";
      headerMatchEl.style.cssText = `
      background-color: rgb(65, 64, 64);
      color: white;
      font-size: 50px;
      text-align: center;
      padding: 5px 0;
      border-radius: 10px 10px 0 0;
      `;
      matchboxesEl.append(headerMatchEl)
       matchboxesEl.css({"display": "flex", "flex-direction": "column", "margin": "50px", "border": "solid 2px black", "border-radius": "10px", "padding": "0"})
      
      getLeagueGames(league, team, data)

      getLeagueGames(league, team, data, date)

      //saves raw data (all matches for a given date) locally
    })
}

//gets every game for the inputted league and team if a team is chosen

function getLeagueGames(league, team, data) {
 


function getLeagueGames(league, team, data, date) {

  //for the first 100 games of the data set, save all the league games\
  //if the chosen date is in the future, display match start time
  if (moment(date).format('L hh:mm') > moment().format('L hh:mm')) {
    console.log('is in future')
    for (i = 0; i < 100; i++) {
      if (data.events[i].tournament.name == league) {
        leagueGames[j] = {
          finalScoreHome: 0,
          //gets score for away team
          finalScoreAway: 0,
          //gets name of home team
          HomeTeamName: data.events[i].homeTeam.name,
          //gets name of 
          AwayTeamName: data.events[i].awayTeam.name,
          //formats date
          MatchDate: moment.unix(data.events[i].startTimestamp).format("L hh:mm a")
        } //turn into object and save needed parameters.  
        j = j + 1;
      }
    }
  } else {
    console.log('is in past')
    for (i = 0; i < 100; i++) {
      if (data.events[i].tournament.name == league) {
        leagueGames[j] = {
          finalScoreHome: data.events[i].homeScore.current,
          //gets score for away team
          finalScoreAway: data.events[i].awayScore.current,
          //gets name of home team
          HomeTeamName: data.events[i].homeTeam.name,
          //gets name of 
          AwayTeamName: data.events[i].awayTeam.name,
          //formats date
          MatchDate: moment.unix(data.events[i].time.currentPeriodStartTimestamp).format("L hh:mm a")
        } //turn into object and save needed parameters.  
        j = j + 1;
      }
    }
  }

  localStorage.setItem(league, JSON.stringify(leagueGames))
  if (team !== '') {
    getTeamGames(league, team, leagueGames)
  } else {
    getMatchScore(JSON.parse(localStorage.getItem(league)))
  }

}

//for a given league, team and list of games, check every game for the team name and if it matches, get its score if not then display all other league games
function getTeamGames(league, team, data) {
  for (i = 0; i < Object.keys(data).length; i++) {
    //if away or home team is my team, save the game, log it, save it locally, and get its score
    if (data[i].HomeTeamName == team) {
      getMatchScore2(data[i])

    } else if (data[i].AwayTeamName == team) {
      getMatchScore2(data[i])
    } //else {
    //  
    // }
  }
}

//if status == "notstarted" use future game function
//gets match scores from past games given an input of match number; 
function getMatchScore(game) {
  for (i = 0; i < Object.keys(game).length; i++) {
    var MatchResults = {
      //gets  score for home team
      finalScoreHome: game[i].finalScoreHome,
      //gets score for away team
      finalScoreAway: game[i].finalScoreAway,
      //gets name of home team
      HomeTeamName: game[i].HomeTeamName,
      //gets name of 
      AwayTeamName: game[i].AwayTeamName,
      //formats date
      MatchDate: game[i].MatchDate
    }
    appendResults(MatchResults.HomeTeamName, MatchResults.finalScoreHome, MatchResults.AwayTeamName, MatchResults.finalScoreAway, MatchResults.MatchDate)
  }
}

function getMatchScore2(game) {
  var MatchResults = {
    //gets  score for home team
    finalScoreHome: game.finalScoreHome,
    //gets score for away team
    finalScoreAway: game.finalScoreAway,
    //gets name of home team
    HomeTeamName: game.HomeTeamName,
    //gets name of 
    AwayTeamName: game.AwayTeamName,
    //formats date
    MatchDate: game.MatchDate
  }
  appendResults(MatchResults.HomeTeamName, MatchResults.finalScoreHome, MatchResults.AwayTeamName, MatchResults.finalScoreAway, MatchResults.MatchDate)
}



function appendResults(team1name, team1score, team2name, team2score, date) {

  var matchboxEl = document.createElement('div')
  matchboxEl.style.cssText = `
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 1%;
  background-color: rgba(255,255,255,0.8);
  `;

  var teamspEl = document.createElement('p')

  var hometeamEl = document.createElement('span');
  hometeamEl.textContent = team1name + ' '
  teamspEl.appendChild(hometeamEl)


  var homeScoreEl = document.createElement('span')
  homeScoreEl.textContent = team1score + "-"
  teamspEl.appendChild(homeScoreEl)

  var awayteamEl = document.createElement('span')
  awayteamEl.textContent = team2score + " "
  teamspEl.appendChild(awayteamEl)

  var awayScoreEl = document.createElement('span')
  awayScoreEl.textContent = team2name
  teamspEl.appendChild(awayScoreEl)

  var matchDate = document.createElement('p')
  matchDate.textContent = date
  teamspEl.appendChild(matchDate)
  matchboxEl.append(teamspEl)
  matchboxesEl.append(matchboxEl)
}
