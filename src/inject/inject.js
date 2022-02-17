(function() {

	var style = document.createElement('style');
	style.innerText = "div { filter: none !important; }";
	document.head.appendChild(style);

	document.querySelectorAll("#viewer-wrapper > div").forEach(e => {
		if (e.id == '' && e.getAttribute('role') == null) {
			e.remove();
		}
	})

	document.querySelectorAll("#viewer-wrapper .pf > div").forEach(e => {
		if (e.innerHTML.toLowerCase().indexOf("premium") > -1) {
			e.remove();
		}
	})

})();