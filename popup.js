function renderStatus(text){
	document.getElementById('status').textContent = text;
}

function updateStatus(text) {
	var listItem = document.createElement("p");
	listItem.textContent = text;
	document.getElementById('status').appendChild(listItem);
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.query({}, function (tabs) {
		for(var i = 0; i < tabs.length; i++) {
			updateStatus(tabs[i].url);
		}
	});
});