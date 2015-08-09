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
        }
    });
});