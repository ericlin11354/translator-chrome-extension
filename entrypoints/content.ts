import { sendMessage } from "@/services/deepseek";

// const deepseekTemplate = (html: string) => `
//     Please translate all the visible text content within the following HTML code block into Chinese.
//     Ignore any HTML tags, attributes, scripts, styles, or code syntax, and only focus on translating the text that would be displayed on a webpage. Remember to return the given HTML with
//     the translation: ${html}
// `;

const deepseekTemplate = (s: string) => `
    Translate the following string to Chinese (Simplified) and respond with just the translation: ${s}
`;

export default defineContentScript({
	matches: ["<all_urls>"],
	main(ctx) {
		console.log("Content script initialized");

		chrome.runtime.onMessage.addListener(
			(request, sender, sendResponse) => {
				if (request.action === "onTranslate") {
					console.log("Translate message received");
					translatePage();
				}
			}
		);

		const translatePage = () => {
			// const texts = document.querySelectorAll(
			// 	"h1, h2, h3, h4, h5, h6, dd, dt, li, p, pre, a, th, td, button, label, legend, option, input, span"
			// );
			// const texts = document.querySelectorAll("body *");
			// texts.forEach((text) => {
			// 	findText(text as HTMLElement);
			// });
			findText(document.body);
			console.log("done");
		};

		const findText = (element: HTMLElement) => {
			element.childNodes.forEach((child) => {
				if (
					child.nodeType === Node.TEXT_NODE &&
					isVisible(element) &&
					child.textContent?.trim() !== ""
				) {
					// console.log(
					// 	element.className,
					// 	element.id,
					// 	child.textContent
					// );
					if (child.textContent) {
						console.log(child.textContent);
						sendMessage(deepseekTemplate(child.textContent)).then(
							(res) => {
								if (res != null) child.textContent = res;
							}
						);
					}
					// child.textContent = "amogus";
				} else if (child.nodeName === "INPUT") {
					sendMessage(
						deepseekTemplate((child as HTMLInputElement).value)
					).then((res) => {
						if (res != null)
							(child as HTMLInputElement).value = res;
					});
					// (child as HTMLInputElement).value = "amogus";
				} else {
					findText(child as HTMLElement);
				}
			});
		};

		const isVisible = (element: HTMLElement): boolean => {
			return (
				element.offsetParent !== null &&
				getComputedStyle(element).display !== "none" &&
				getComputedStyle(element).visibility !== "hidden" &&
				element.textContent?.trim() !== ""
			);
		};
	},
});
