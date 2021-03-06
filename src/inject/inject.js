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
				printPdf();
			};
		}
	})

	function printPdf() {
		const originalContents = document.body.innerHTML;
		const extraStyles = `
			<style>
				@page {
					size: auto;
					margin: 0;
				}

				@media print {
					#main-wrapper .page-content-wrapper #viewer-wrapper {
						display: flex !important;
						background: white !important;
					}

					#main-wrapper .page-content-wrapper #document-wrapper {
						overflow: none;
						height: auto;
						display: block !important;
					}

					#main-wrapper .page-content-wrapper #document-wrapper > div {
						height: auto !important;
						margin-top: 0 !important;
						margin-bottom: 0 !important;
					}

					#main-wrapper .page-content-wrapper #page-container-wrapper {
						transform: scale(1) !important;
						height: auto !important;
						width: auto !important;
					}

					#main-wrapper .page-content-wrapper #page-container > div {
						margin: 0 !important;
					}

					#main-wrapper {
						width: 100vw !important;
						height: auto !important;
					}
				}

				@media screen {
					#main-wrapper .page-content-wrapper * {
						display: none !important;
					}
				}
			</style>
		`;

		document.querySelectorAll("#main-wrapper > *").forEach(e => {
			if (!e.classList.contains("page-content-wrapper")) {
				e.remove();
			}
		});

		document.querySelectorAll("#main-wrapper .page-content-wrapper > *").forEach(e => {
			if (e.id != "viewer-wrapper") {
				e.remove();
			}
		});

		document.querySelectorAll("#main-wrapper .page-content-wrapper #viewer-wrapper > *").forEach(e => {
			if (e.id != "document-wrapper") {
				e.remove();
			}
		})

		document.querySelector("footer").remove();

		document.body.innerHTML += extraStyles;
		
		window.print();
		document.body.innerHTML = originalContents;
	}

})();