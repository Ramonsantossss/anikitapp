let footer = document.querySelector("footer");
let footerHeader = document.querySelector("footer .header");
let searchResultsDiv = document.querySelector(".search-div .search-results");
let  searchResultsContainer = document.querySelector(".search-div .search-results-container");


footerHeader.onclick = function () {

    if (footer.classList.contains("anim-footer-close")) {
        footer.classList.toggle("anim-footer-close", false);
        footer.classList.toggle("anim-footer-appear", true);
    } else if (footer.classList.contains("anim-footer-appear")) {
        footer.classList.toggle("anim-footer-appear", false);
        footer.classList.toggle("anim-footer-close", true);
    } else {
        footer.classList.toggle("anim-footer-close", true);
    }
}

btnShowMenu.onclick = function () {
    if (menu.style.display == "inline-block") {
        hideMenu();
    } else {
        showMenu();
    }

    
}

function showMenu(){
    menu.style.display = "inline-block";
    menu.classList.toggle("anim-menu-close",false);
    menu.classList.toggle("anim-menu-appear",true);
}

function hideMenu(){
    menu.classList.toggle("anim-menu-appear",false);
    menu.classList.toggle("anim-menu-close",true);
    setTimeout(()=>{ menu.style.display = "none"},0.3 * 1000);
}

document.querySelector(".header-main .menu-div").onmouseleave = function () {
    hideMenu();
}

document.querySelectorAll(".highlight").forEach(hl => {
    hl.onclick = function () {
        document.querySelector(".modal-manga").style.display = "block";
    }
});

function clearSearchResults(){
    searchResultsDiv.innerHTML = "";
}

txtSearch.oninput = function () {
  
   searchContent.innerHTML = txtSearch.value;

   clearSearchResults();

   if(txtSearch.value == "") {
       searchResultsContainer.style.display = "none";
       return;
   } else {
     searchResultsContainer.style.display = "block";
   }

   for(manga of mangas){
       if(manga.name.indexOf(txtSearch.value) >= 0){
          let resultDiv = document.createElement("div");
          resultDiv.className = "search-result-manga";
          let cover = document.createElement("img");
          cover.src = manga.cover;
          cover.className = "cover";
          
          let titleDiv = document.createElement("div");
          titleDiv.innerHTML = manga.name;
          titleDiv.className = "manga-title";

          let gendersDiv = document.createElement("div");
          gendersDiv.innerHTML = manga.genders;

          resultDiv.appendChild(cover);
          resultDiv.appendChild(titleDiv);
          resultDiv.appendChild(gendersDiv);

          searchResultsDiv.appendChild(resultDiv);
       }
   }
}

txtSearch.onblur = function (){
    searchResultsContainer.style.display = "none";
}

var mangas = [
    {name:"One Piece",cover:"images/covers/onepiece.jpg",genders:"Acção, Aventura, Ministério"},
    {name:"Solo Leveling",cover:"images/covers/sololeveling.jpg",genders:"Acção, Aventura, Terror"},
    {name:"Naruto",cover:"images/covers/naruto.jpg",genders:"Acção, Aventura, Podre"},
    {name:"Dragon Ball",cover:"images/covers/dragonball.jpg",genders:"Acção, Aventura, Sobrenatural"},
    {name:"Black Clover",cover:"images/covers/blackclover.jpg",genders:"Acção, Aventura, Feitiçaria"}
];