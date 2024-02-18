(async function() {

	const bgImageName = "bg1.png";
	const imageRegex = /bg[0-9]+\.png/
	const blurImageRegex = /blurred\/page([0-9]+)\.webp/
	let documentWrapper = null;
	let maxTries = 1000;
	while (documentWrapper == null) {
		documentWrapper = document.getElementById("document-wrapper");
		await new Promise(r => setTimeout(r, 100));
		if (maxTries-- <= 0) {
			console.error("StuDocu Unblocker: Could not find document wrapper!");
			return;
		}
	}

	let imgUrl = null;
	for (const img of [...document.querySelectorAll("img")]) {
		if (img.src.replace(bgImageName, "") != img.src) {
			imgUrl = img.src;
			break;
		}
	}
	
	const globalStyle = document.createElement('style');
	globalStyle.innerText = `
		.unblock-button {
			margin: 0 0 0 10px;
			padding: 7px 24px;
			border: none;
			background-color: #61c4ff;
			color: white;
			cursor: pointer;
			font-weight: bold;
			border-radius: 32px;
		}
		.unblock-button:hover {
			background-color: #4da6ff;
		}
		.unblock-button:active {
			background-color: #3b8ad9;
		}
	`;
	document.head.appendChild(globalStyle);

	const header = document.querySelector("header > div");

	const bypassButton = document.createElement('button');
	bypassButton.innerText = "🔓 Unlock Document";
	bypassButton.className = "unblock-button";
	bypassButton.onclick = unblock;
	header.appendChild(bypassButton);

	console.log("StuDocu Unblocker: Injected!");

	function unblock() {
		var style = document.createElement('style');
		style.innerText = "div { filter: none !important; }";
		document.head.appendChild(style);
	
		document.querySelectorAll("#document-wrapper > div > div").forEach(e => {
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
				cloned.className = "unblock-button";
				cloned.innerText = "🔓 PrintView";
				cloned.onclick = (e) => {
					e.preventDefault();
					printPdf();
				};
			}
		})

		document.querySelectorAll("img").forEach(e => {
			if (blurImageRegex.test(e.src)) {
				const index = blurImageRegex.exec(e.src)[1];
				e.src = imgUrl.replace(bgImageName, `bg${index}.png`);
			}
		})
	
		
		function printPdf() {
			const printView = window.open();

			const styles = document.createElement('style');
			styles.innerText = `
				img {
					max-width: 100%;
					height: auto;
				}
			`;

			printView.document.head.appendChild(styles);

			const images = [...document.querySelectorAll("img")].filter(
				e => imageRegex.test(e.src)
			);
			printView.document.body.innerHTML = images.map(e => e.outerHTML).join("<br>");
		}
	}

})();