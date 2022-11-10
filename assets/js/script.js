// Datepicker widget
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
var searchBtnEl = $('#searchbtn')
//get leagueID and set as var
//key1: cc22227a09msh80aec473e0852dap1635eejsn104bb08e4e11
//key2: 26eb315a46msh99f692d58ae8f5fp13ad5cjsn2bd8a4ffb6e6
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '26eb315a46msh99f692d58ae8f5fp13ad5cjsn2bd8a4ffb6e6',
    'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
  }
};

//user inputs
var date = '06/11/2022';
var leagueID = 1;
var eventsData = {};

function getMatchData() {
  fetch('https://footapi7.p.rapidapi.com/api/matches/' + date, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem('rawData', data)
      getmatchScore(0)
    })
}

var premierleague = {}

//if the match is in the future: 
//need to get home team name, away team name and date of event. - no score!
function getMatchSchedule() {
  fetch('https://footapi7.p.rapidapi.com/api/matches/' + date, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      //this is where we need to input the data from the dropdown "select your league"
      getLeagueGames("Premier League", data)
      //so get leagueInputBoxEl.val() and run the function with that when "search" is clicked
    })
}


function getLeagueGames(league, data) {
  for (i = 0; i < 50; i++) {
    if (data.events[i].tournament.name == league) {
      premierleague[i] = data.events[i]
      localStorage.setItem('premierleaguegames', JSON.stringify(premierleague))
    }
  }
  getMatchScore(1)
}





//if status == "notstarted" use future game function
//gets match scores from past games given an input of match number; 
function getMatchScore(league, game) {
  var storedData = JSON.parse(localStorage.getItem(league))

  var MatchResults = {
    finalScoreHome: storedData[game].homeScore.current,
    finalScoreAway: storedData[game].awayScore.current,
    HomeTeamName: storedData[game].homeTeam.name,
    AwayTeamName: storedData[game].awayTeam.name,
    MatchDate: moment.unix(storedData[game].time.currentPeriodStartTimestamp).format("MMMM Do YYYY hh:mm a")
  }
  appendResults(MatchResults.HomeTeamName, MatchResults.finalScoreHome, MatchResults.AwayTeamName, MatchResults.finalScoreAway, MatchResults.MatchDate)
}

function appendResults(team1name, team1score, team2name, team2score, date) {
  var matchboxEl = $('#matchbox')

  var teamspEl = document.createElement('p')

  var hometeamEl = document.createElement('span');
  hometeamEl.textContent = team1name + ': '
  teamspEl.appendChild(hometeamEl)

  var homeScoreEl = document.createElement('span')
  homeScoreEl.textContent = team1score + "-"
  teamspEl.appendChild(homeScoreEl)

  var awayteamEl = document.createElement('span')
  awayteamEl.textContent = team2score + " :"
  teamspEl.appendChild(awayteamEl)

  var awayScoreEl = document.createElement('span')
  awayScoreEl.textContent = team2name
  teamspEl.appendChild(awayScoreEl)

  var matchDate = document.createElement('p')
  matchDate.textContent = date
  teamspEl.appendChild(matchDate)
  matchboxEl.append(teamspEl)
}

//console log test -- just want to test this on all the games for now. 

searchBtnEl.on('click', function() {
  getMatchScore('premierleaguegames', 1)
})