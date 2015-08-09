function renderStatus(text){
	document.getElementById('status').textContent = text;
}

function updateStatus(text) {
	var listItem = document.createElement("p");
	listItem.textContent = text;
	document.getElementById('status').appendChild(listItem);
}

function createRequest(url) {
	//create JSON for ONE url here
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
		var request;
		for (var i = 0; i < urlArray.length; i++) {
			request.push(createRequest(urlArray[i]));
		}
	xhr.send(request);
	
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.query({}, function (tabs) {
		for(var i = 0; i < tabs.length; i++) {
			updateStatus(tabs[i].url);
		}
	});
});