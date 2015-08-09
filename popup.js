function renderStatus(text){
	document.getElementById('status').textContent = text;
}

function updateStatus(text) {
	var listItem = document.createElement("LI");
	var listText = document.createTextNode(text);
	listItem.appendChild(listText);
	document.getElementById('status-list').appendChild(listText);
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.query({}, function (tabs) {
		for(var i = 0; i < tabs.length; i++) {
			updateStatus(tabs[i].url);
		}
	});
});