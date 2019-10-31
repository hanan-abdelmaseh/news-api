// news API
var news;
var term;
var searchInput = document.getElementById("searchInput");
var links = document.getElementsByClassName("nav-link");
var country = `us`;
var category = "general";

searchInput.addEventListener("blur", function() {
        term = searchInput.value;
        globalsearch();
    })
    // first it will display general news 
getNews();
// on click on each category it will display it's news 
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function(e) {
        category = e.target.innerHTML;
        getNews(category);
    })
}
// create function to get data 
function getNews() {
    var req = new XMLHttpRequest();
    var uRl = `https://newsapi.org/v2/top-headlines?country=` + country + `&category=` + category + `&apiKey=d94750b214c24e5cac9ccab1cd6ea495`
    req.open("GET", uRl);
    // check  ready state , status 
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            news = JSON.parse(req.response);
            news = news.articles;
            displayData()

        }
    }
    req.send();
}
// create function to display data 
function displayData() {
    var rows = "";
    for (var i = 0; i < news.length; i++) {
        rows += `<div class="col-md-4">
                  <div class="card" style="width: 18rem;">
                   <img src=` + news[i].urlToImage + ` class="card-img-top img-fluid" alt="...">
                   <div class="card-body">
                     <h5 class="card-title">` + news[i].title + `</h5>
                       <p class="card-text">` + news[i].description + `</p>
                       <a href=` + news[i].url + ` class="btn btn-primary">Read More</a>
                    </div>
                 </div>
               </div>`
    }
    document.getElementById("newsRow").innerHTML = rows;
}
// function to search
function globalsearch() {
    var req = new XMLHttpRequest();
    var uRl = `https://newsapi.org/v2/everything?q=` + term + `&from=2019-09-24&sortBy=publishedAt&apiKey=d94750b214c24e5cac9ccab1cd6ea495`
    req.open("GET", uRl);
    // check  ready state , status 
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            news = JSON.parse(req.response);
            news = news.articles;
            displayData()

        }
    }
    req.send();

}