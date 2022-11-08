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

fetch('https://livescore6.p.rapidapi.com/leagues/v2/list?Category=soccer', options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)

    var PremierLeagueData = data.Ccg[0].Stages[0];
    var SpanishLeagueData = data.Ccg[1].Stages[0];
    var GermanLeagueData = data.Ccg[3].Stages[0];
    var FrenchLeagueData = data.Ccg[4].Stages[0];
    var ChampionsLeagueData = data.Ccg[7].Stages[0];
    var WorldCup2022Data = data.Ccg[10].Stages;

    
    var leagueData = {
      PremierLeagueData,
      SpanishLeagueData,
      GermanLeagueData,
      FrenchLeagueData,
      ChampionsLeagueData,
      WorldCup2022Data
    }

    console.log(leagueData)
    localStorage.setItem('leagueData', JSON.stringify(leagueData))
  })
  .catch(err => console.error(err));
