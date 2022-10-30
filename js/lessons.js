
window.onload = (event) => {
    
};

function openTab(element, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("tabText");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" choosedTab", ""); 
    }
    document.getElementById(cityName).style.display = "block";
    //evt.currentTarget.className += " choosedTab";
    element.className += " choosedTab";
}

function nextTab(n, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("tabText");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" choosedTab", ""); 
    }
    document.getElementById(cityName).style.display = "block";
    //evt.currentTarget.className += " choosedTab";
    tablinks[n].className += " choosedTab";
}