(async function() {

	const bgImageName = "bg1.png";
	const imageRegex = /bg[0-9]+\.png/
	const blurImageRegex = /blurred\/page([0-9]+)\.webp/
	const downloadButtonRegex = /(Download|Herunterladen)/
	const maxInjectTries = 1000;

	let documentWrapper = null;
	let imgUrl = null;
	
	inject(maxInjectTries);
	setInterval(() => {
		if (documentWrapper != null && document.getElementById("bypass-button") == null) {
			console.log("StuDocu Unblocker: Reinject ...");
			inject(maxInjectTries);
		}
	}, 1000);

	async function inject(maxTries) {
		documentWrapper = null;
		while (documentWrapper == null) {
			documentWrapper = document.getElementById("document-wrapper");
			await new Promise(r => setTimeout(r, 100));
			if (maxTries-- <= 0) {
				console.error("StuDocu Unblocker: Could not find document wrapper!");
				return;
			}
		}

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
		bypassButton.id = "bypass-button";
		bypassButton.innerText = "🔓 Unlock Document";
		bypassButton.className = "unblock-button";
		bypassButton.onclick = unblock;
		header.appendChild(bypassButton);

		console.log("StuDocu Unblocker: Injected!");
	}

	function unblock() {
		var style = document.createElement('style');
		style.innerText = "div { filter: none !important; }";
		document.head.appendChild(style);


		const pages = [...documentWrapper.querySelectorAll(".pf")];
		
		for (const page of pages) {
			const children = [...page.children];
			for (const child of children) {
				if (child.innerHTML.toLowerCase().indexOf("<img") <= 0) {
					child.remove();
				}
			}
		}
	
		documentWrapper.querySelectorAll("div > div").forEach(e => {
			const computedStyleMap = e.computedStyleMap();
			const position = computedStyleMap.get('position');
			if (position && position.value.toLowerCase() == "sticky") {
				e.remove();
			}
		})
	
		documentWrapper.querySelectorAll("#premium-page-header").forEach(e => {
			e.remove();
		})
	
		// documentWrapper.querySelectorAll(".pf > div").forEach(e => {
		// 	if (e.innerHTML.toLowerCase().indexOf("premium") >= 0) {
		// 		e.remove();
		// 	}
		// })
	
		document.querySelectorAll("button").forEach(e => {
			if (downloadButtonRegex.test(e.innerHTML)) {
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

		documentWrapper.querySelectorAll("img").forEach(e => {
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