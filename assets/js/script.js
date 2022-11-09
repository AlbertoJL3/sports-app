// Datepicker widget
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});

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

//user inputs
var date = '06/11/2022';
var leagueID = 2;
var eventsData = {};

function getMatchData() {
  fetch('https://footapi7.p.rapidapi.com/api/matches/' + date, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (i = 0; i < 100; i++) {
        //saves matches of desired league for the given date
        if (data.events[i].tournament.id == leagueID) {
          eventsData[i] = data.events[i]
        }
      }

      localStorage.setItem('rawData', JSON.stringify(data))
      //saves premier league data
      if (leagueID = 1) {
        localStorage.setItem('PremierLeagueData', JSON.stringify(eventsData))
      } //saves league2data
      else if (leagueID = 2) {
        localStorage.setItem('League2Data', JSON.stringify(eventsData))
      } //saves league3data
      console.log(eventsData)
    })
}

//if status == "notstarted" use future game function
//gets match scores from past games given an input of match number; 
function getMatchScore(game) {
  // if the match is in the past: 
  //need to get home team name, home team score//away team name, away team score
  var storedData = JSON.parse(localStorage.getItem('leagueData'))
  var MatchResults = {
    finalScoreHome: storedData[game].homeScore.current,
    finalScoreAway: storedData[game].awayScore.current,
    HomeTeamName: storedData[game].homeTeam.name,
    AwayTeamName: storedData[game].awayTeam.name,
    MatchDate: moment.unix(storedData[game].time.currentPeriodStartTimestamp).format("MMMM Do YYYY hh:mm a")
  }
  console.log(MatchResults)
}



//if the match is in the future: 
//need to get home team name, away team name and date of event. - no score!
function getMatchSchedule(game) {
  fetch('https://footapi7.p.rapidapi.com/api/matches/' + date, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    })
}



//console log test -- just want to test this on all the games for now. 
function run() {
  for (i = 0; i < 9; i++) {
    getMatchScore(i)
  }
}

run()

// function appendResults(team1name, team1score, team2name, team2score) {
//   var matchboxEl = $('.matches');

//   var teamspEl = document.createElement('p')
//   var hometeamEl = document.createElement('span').innerText(data.HomeTeamName)
 
//   var homeScoreEl = document.createElement('span')
//   homeScoreEl.text(data.finalScoreHome)

//   var awayteamEl = document.createElement('span')
//   hometeamEl.text(data.AwayTeamName)
//   var awayScoreEl = document.createElement('span')
//   awayScoreEl.text(data.finalScoreAway)


//   var teamsboxEl = document.createElement('div').addClass('teams').append(teamspEl).append(hometeamEl).append(homeScoreEl).append(awayScoreEl).append(awayteamEl)
 
//     matchboxEl.append(teamsboxEl)

// }