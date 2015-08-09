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
    listItem.innerHTML +=  url;
    document.getElementById('status').appendChild(listItem);
}


function findAuthor(url, callback) {
    var data;
    var encodedUrl = encodeURI(url);
    //console.log(encodedUrl);
    var HTTPrequest = "http://access.alchemyapi.com/calls/url/URLGetAuthors?"
    + "apikey=" + keys.alchemy + "&url=" + encodedUrl + "&outputMode=json";
    //console.log(HTTPrequest);
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

function createRequest(url) {
    return {
        "key": keys.easybib,
        "source": "website",
        "website": {
            "title": ""
        },
        "pubonline": {
            "title": "",
            "day": 1,
            "month": 1,
            "year": 1969,
            "url": url,
            "dayaccessed": Date.getDay(),
            "monthaccessed": Date.getMonth(),
            "yearaccessed": Date.getFullYear()
        }
    }
}
function cite(urlArray) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://www.easybib.com/cite/bulk", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var res = JSON.parse(xhr.responseText);
            //console.log(res);
        }
    }
    var request = [];
    for (var i = 0; i < urlArray.length; i++) {
        request.push(createRequest(urlArray[i]));
    }
    xhr.send(request);
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({}, function (tabs) {
        for(var i = 0; i < tabs.length; i++) {
            var url = "";
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
                    console.log("Before sent: " + title + author + url);
                    updateStatus(title, author, url);
                })
            })(title, url, fullURL);
        }
    });
});