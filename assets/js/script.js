// Datepicker widget
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
var searchBtnEl = $('#searchbtn')
var matchboxesEl = $('#matchbox')

//get leagueID and set as var
//key1: cc22227a09msh80aec473e0852dap1635eejsn104bb08e4e11
//key2: 26eb315a46msh99f692d58ae8f5fp13ad5cjsn2bd8a4ffb6e6

var date = '06/11/2022';
var league = "Premier League";
var team = "arsenal";

searchBtnEl.on('click', function () {
  getMatchData(league, "arsenal", date)
})


const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '58d67597d5msh7c09f99318a3545p1cb402jsn28ccbba07ce9',
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
      getLeagueGames(league, team, data)
     
      //saves raw data (all matches for a given date) locally
    })
}

//gets every game for the inputted league and team if a team is chosen
function getLeagueGames(league, team, data) {

  //for the first 100 games of the data set, save all the league games
  for (i = 0; i < 100; i++) {
    if (data.events[i].tournament.name == league) {
      leagueGames[i] = data.events[i]
    }
  }
  localStorage.setItem(league, JSON.stringify(leagueGames))
  getTeamGames(league, team, leagueGames)
}

//for a given league, team and list of games, check every game for the team name and if it matches, get its score if not then display all other league games
function getTeamGames(league, team, data) {
  for (i = 0; i < 10; i++) {
    //if away or home team is my team, save the game, log it, save it locally, and get its score
    if (data[i].awayTeam.slug == team) {
      console.log(data[i])
      localStorage.setItem(team, JSON.stringify(data[i]))
      getMatchScore(data[i])
    } else if (data[i].homeTeam.slug == team) {
      console.log(data[i])
      localStorage.setItem(team, JSON.stringify(data[i]))
      getMatchScore(data[i])
    } else {
      getMatchScore(JSON.parse(localStorage.getItem(league)))
    }
  }
}

//if status == "notstarted" use future game function
//gets match scores from past games given an input of match number; 
function getMatchScore(game) {
  console.log(game)
  for (i = 0; i < Object.keys(game).length; i++) {
    var MatchResults = {
      //gets  score for home team
      finalScoreHome: game[i].homeScore.current,
      //gets score for away team
      finalScoreAway: game[i].awayScore.current,
      //gets name of home team
      HomeTeamName: game[i].homeTeam.name,
      //gets name of 
      AwayTeamName: game[i].awayTeam.name,
      //formats date
      MatchDate: moment.unix(game[i].time.currentPeriodStartTimestamp).format("MMMM Do YYYY hh:mm a")
    }
    appendResults(MatchResults.HomeTeamName, MatchResults.finalScoreHome, MatchResults.AwayTeamName, MatchResults.finalScoreAway, MatchResults.MatchDate)
  }
}


function appendResults(team1name, team1score, team2name, team2score, date) {

  var matchboxEl = document.createElement('div')
  matchboxEl.style.cssText = `
  width: 35vw;
  border: 1px solid black;
  padding: 0 2%;
  margin-left: 2%;
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