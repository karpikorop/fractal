
window.onload = (event) => {
    
};

function openTab(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("tabText");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 1; i <= x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" choosedTab", ""); 
    }
    document.getElementById(cityName).style.display = "block";
    //evt.currentTarget.className += " choosedTab";
    evt.className += " choosedTab";
  }