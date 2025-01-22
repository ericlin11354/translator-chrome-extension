// export default defineContentScript({
// 	matches: ["<all_urls>"],
// 	main(ctx) {
// 		console.log("Hello content.");
// 		console.log("bruhh moment");
// 	},
// });

export default defineContentScript({
	matches: ["<all_urls>"],
	main(ctx) {
		console.log("Content script initialized");

		chrome.runtime.onMessage.addListener(
			(request, sender, sendResponse) => {
				if (request.action === "translate") {
					console.log("Translate message received");
					translatePage();
				}
			}
		);

		const translatePage = () => {
			const texts = document.querySelectorAll(
				"h1, h2, h3, h4, h5, h6, dd, dt, li, p, pre, a, th, td, button, label, legend, option, input, span"
			);
			texts.forEach((text) => {
				text.textContent = "amogus";
			});
		};
	},
	// main(ctx) {
	// 	console.log("Content script initialized");
	// 	console.log("Current URL:", window.location.href);

	// 	try {
	// 		console.log("Attempting to log Hello World");
	// 		console.log("Hello World");

	// 		const paragraph = document.createElement("p");
	// 		paragraph.textContent = "Hello World!";
	// 		document.body.appendChild(paragraph);
	// 		console.log("Paragraph appended to body");
	// 	} catch (error) {
	// 		console.error("Error in content script:", error);
	// 	}
	// },
});
