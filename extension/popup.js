var currentTabs = [];
const months = ["January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"];

function renderStatus(text){
  document.getElementById('status').textContent = text;
}

function updateStatus(title, author, url) {
  console.log("New entry, with details: " + title + author + url);
  var listItem = document.createElement("p");
  var titleItem = document.createElement("span");
  titleItem.className = "tab-title";
  titleItem.textContent = title + " (" + author + ") " + " - ";
  listItem.appendChild(titleItem);
  listItem.innerHTML +=  url.split("/")[2];
  document.getElementById('status').appendChild(listItem);
}


function findAuthor(url, callback) {
  var data;
  var encodedUrl = encodeURIComponent(url);

  var HTTPrequest = "http://access.alchemyapi.com/calls/url/URLGetAuthors?"
  + "apikey=" + keys.alchemy + "&url=" + encodedUrl + "&outputMode=json";
  var xhr = new XMLHttpRequest();
  
  xhr.open("GET", HTTPrequest, true);
  xhr.onreadystatechange = function processData() {
    if (xhr.readyState == 4) {
      data = JSON.parse(xhr.responseText);
      var names = data.authors.names;
      var authors = "No author detected";
      if(names.length > 0) {
        authors = names[0];
        for(var i = 1; i < names.length - 1; i++) {
          authors += names[i] + ", ";
        }
      }
      callback(authors);
    }
  }
  xhr.send();
}

function createReqObject(title, author, url) {
  var d = new Date();
  currentTabs.push({
    "key": keys.easybib,
    "source": "website",
    "style": "mla7",
    "website": {
      "title": title
    },
    "pubtype": {
      "main": "pubonline"
    },
    "pubonline": {
      "title": "Heyo!",
      "inst": "lol",
      "day": 1,
      "month": "January",
      "year": 2004,
      "url": url,
      "dayaccessed": d.getDate(),
      "monthaccessed": months[d.getMonth()],
      "yearaccessed": d.getFullYear()
    },
    "contributors": [
      {
        "function": "author",
        "first": author.substring(0, author.indexOf(" ")),
        "last": author.substring(author.indexOf(" "), author.length)
      }
    ]
  });
}

function generateCitations() {
  fetch('http://localhost:3000/api/citations', {
    method: 'POST',
    body: JSON.stringify({
      urls: currentTabs
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(citations => {
      var list = document.getElementById('citations');
      citations.forEach(citation => {
        var entry = document.createElement("p");
        entry.innerHTML = citation;
        list.appendChild(entry);
      });
    });
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({}, function (tabs) {
    for(var i = 0; i < tabs.length; i++) {
      var url = "";
      currentTabs.push(tabs[i].url);
      var fullURL = tabs[i].url;
      var title = tabs[i].title;
      console.log(fullURL + title);

      if(fullURL.length > 36) {
        url = fullURL.substring(0, 36) + "...";
      } else {
        url = fullURL;
      }
      (function(title, url, fullURL) {
        findAuthor(fullURL, function(author) {
          updateStatus(title, author, url);
        })
      })(title, url, fullURL);
    }
  });
  document.getElementById("button").addEventListener('click', generateCitations, false);
});
