// Datepicker widget
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});

// adding function to search button   

// variables
var welcomeText = document.querySelector("#welcome-note");
var contentDiv = document.querySelector(".content");
var searchBtn = document.querySelector("#search-btn");
var formsEl = document.querySelectorAll(".userform");


searchBtn.addEventListener("click", () => {
    
    // adding if statement to hide welcome-note
  if (welcomeText.style.display === 'none') {
    welcomeText.style.display = 'block';
  } 
  else{
    welcomeText.style.display = 'none';
  }
  contentDiv.classList.add("content-element");
  contentDiv.classList.remove("userform", "content");
for (var i = 0; i < formsEl.length; i++) {
  formsEl[i].setAttribute("style", "margin: 0 1px;");
}
searchBtn.setAttribute("style", "margin: 0 1px;");

})