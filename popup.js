function renderStatus(text){
    document.getElementById('status').textContent = text;
}

function updateStatus(title, url) {
    var listItem = document.createElement("p");
    var titleItem = document.createElement("span")
    titleItem.className = "tab-title";
    titleItem.textContent = title + " - ";
    listItem.appendChild(titleItem);
    listItem.innerHTML +=  url;
    document.getElementById('status').appendChild(listItem);
}


function findAuthor(url) {
	var author;
	var encodedUrl = encodeURI(url);
	console.log(encodedUrl);
	var HTTPrequest = "http://access.alchemyapi.com/calls/url/URLGetAuthor?"
	+"apikey="+ keys.alchemy +"&url=" + encodedUrl + "&outputMode=json";
	console.log(HTTPrequest);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", HTTPrequest, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            author = JSON.parse(xhr.responseText);
            console.log(author);
        }
    }
    xhr.send();








//trying to understand how encodeURIComponent works (ignore, its just for kush ;)


//     // ECMA-262 - 15.1.3.4
// function URIEncodeComponent(component) {
//   var unescapePredicate = function(cc) {
//     if (isAlphaNumeric(cc)) return true;
//     // !
//     if (cc == 33) return true;
//     // '()*
//     if (39 <= cc && cc <= 42) return true;
//     // -.
//     if (45 <= cc && cc <= 46) return true;
//     // _
//     if (cc == 95) return true;
//     // ~
//     if (cc == 126) return true;

//     return false;
//   };

//   var string = ToString(component);
//   return Encode(string, unescapePredicate);
// }





























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
            "url": "",
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
            console.log(res);
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
            if(tabs[i].url.length > 36) {
                url = tabs[i].url.substring(0, 36) + "...";
            } else {
                url = tabs[i].url;
            }
            updateStatus(tabs[i].title, url);
            //findAuthor(url);
        }
    });
});