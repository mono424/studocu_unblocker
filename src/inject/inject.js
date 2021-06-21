(function() {

	var style = document.createElement('style');
	style.innerText = "div { filter: none !important; }";
	document.head.appendChild(style);

	document.querySelectorAll("div").forEach(e => {
		if ([...e.classList].some(c => c.startsWith("preview-banner--"))) {
			e.style.display = "none";
		}
	})

})();