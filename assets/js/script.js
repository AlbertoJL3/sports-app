// Datepicker widget
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'cc22227a09msh80aec473e0852dap1635eejsn104bb08e4e11',
    'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
  }
};

//function for getting league IDs that will then be used for other functions such as getMatchData/getTeamData
function getLeagueData() {
  fetch('https://livescore6.p.rapidapi.com/leagues/v2/list?Category=soccer', options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //saves each league's data into a var
      var PremierLeagueData = data.Ccg[0].Stages[0];
      var SpanishLeagueData = data.Ccg[1].Stages[0];
      var GermanLeagueData = data.Ccg[3].Stages[0];
      var FrenchLeagueData = data.Ccg[4].Stages[0];
      var ChampionsLeagueData = data.Ccg[7].Stages[0];
      var WorldCup2022Data = data.Ccg[10].Stages;

      //creates object containing every league that we want
      var leagueData = {
        PremierLeagueData,
        SpanishLeagueData,
        GermanLeagueData,
        FrenchLeagueData,
        ChampionsLeagueData,
        WorldCup2022Data
      }

      //locally stores our desired league
      localStorage.setItem('leagueData', JSON.stringify(leagueData))
    })
    //not sure what this is but API docs recommended using it
    .catch(err => console.error(err));
}

//function that gets a Match's Eid for getMatchInfo function
function getMatchEid(league, team) {
  var Scd = '&Scd=' + team;
  //if team isn't picked then just use league 
  if (team == null) {
    Scd = ''  
  } else {
    return
  }
  
// 
  fetch('https://livescore6.p.rapidapi.com/matches/v2/list-by-league?Category=soccer&Ccd=' + league + '' + Scd + '&Timezone=+1', options)
    .then(response => response.json())
    //modify to return Eid
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

//displays match information for a given day
function getMatchByDate() {
  fetch('https://livescore6.p.rapidapi.com/matches/v2/list-by-date?Category=soccer&Snm=premier-league&Date=20221106&Timezone=+1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

getMatchByDate()