(function() {

	var style = document.createElement('style');
	style.innerText = "div { filter: none !important; }";
	document.head.appendChild(style);

	document.querySelectorAll("#document-wrapper > div").forEach(e => {
		const computedStyleMap = e.computedStyleMap();
		if (computedStyleMap.get('position').value.toLowerCase() == "sticky") {
			e.remove();
		}
	})

	document.querySelectorAll("#document-wrapper #premium-page-header").forEach(e => {
		e.remove();
	})

	document.querySelectorAll("#document-wrapper .pf > div").forEach(e => {
		if (e.innerHTML.toLowerCase().indexOf("premium") >= 0) {
			e.remove();
		}
	})

	document.querySelectorAll("button").forEach(e => {
		if (e.innerHTML.toLowerCase().indexOf("herunterladen") >= 0) {
			var cloned = e.cloneNode(true);
			e.parentNode.replaceChild(cloned, e);
			cloned.onclick = (e) => {
				e.preventDefault();
				alert("Not possible yet, feel free to create a pr on github ;)");
			};
		}
	})

})();