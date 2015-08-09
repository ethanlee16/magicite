function renderStatus(text){
	document.getElementById('status').textContent = text;
}

function updateStatus(text) {
	document.getElementById('status').textContent += text;
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.query({active: true}, function (tabs) {
		for(var i = 0; i < tabs.length; i++) {
			updateStatus(tabs[i].url);
		}
	});
});