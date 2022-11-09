// Datepicker widget
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
//get leagueID and set as var


const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'cc22227a09msh80aec473e0852dap1635eejsn104bb08e4e11',
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
      for (i = 0; i < 100; i++) {
        if (data.events[i].tournament.id == leagueID) {
          eventsData[i] = data.events[i]

        }
      }
      //saves premier league data
      if (leagueID = 1) {
        localStorage.setItem('PremierLeagueData', JSON.stringify(eventsData))
      }
      //saves premier league data
     else if (leagueID = 2) {
       localStorage.setItem('PremierLeagueData', JSON.stringify(eventsData))
     }
      console.log(eventsData)
    })
}


// if the match is in the past: 
//need to get home team name, home team score//away team name, away team score

//if the match is in the future: 
//need to get home team name, away team name and date of event. 

getMatchData()