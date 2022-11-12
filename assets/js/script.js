// Datepicker widget
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});

var searchBtnEl = $('#search-btn')
var matchboxesEl = $('#matchbox')
var j = 0;

//get leagueID and set as var
//key1: cc22227a09msh80aec473e0852dap1635eejsn104bb08e4e11
//key2: 26eb315a46msh99f692d58ae8f5fp13ad5cjsn2bd8a4ffb6e6

var date = '13/11/2022';
var league = "Bundesliga";
var team = "";

searchBtnEl.on('click', function () {
  getMatchData(league, team, date)
})


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
      getLeagueGames(league, team, data)
      //saves raw data (all matches for a given date) locally
    })
}

//gets every game for the inputted league and team if a team is chosen
function getLeagueGames(league, team, data) {
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
        j = j+1;
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
        j = j+1;
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
  var chosenTeam = JSON.parse(localStorage.getItem(team))
  getMatchScore2(chosenTeam)
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
  width: 250px;
  border: 1px solid black;
  padding: 1%;
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