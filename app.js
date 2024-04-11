let mobNavigation = document.getElementById('mobnav');
function mobNav(){
   let nav = document.getElementById("navbar"); 
   nav.classList.add("nav-opned");
} 
mobNavigation.addEventListener("click", mobNav);

let mobNavigationClose = document.getElementById('navClose');
function mobNavclose(){
    let nav = document.getElementById("navbar"); 
    nav.classList.remove("nav-opned");
 } 
 mobNavigationClose.addEventListener("click", mobNavclose);
