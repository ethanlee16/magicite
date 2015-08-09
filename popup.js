function renderStatus(text){
	document.getElementById('status').textContent = text;
}

document.addEventListener('DOMContentLoaded', function() {
	renderStatus("Hello world!");
})