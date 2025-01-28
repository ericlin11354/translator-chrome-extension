import OpenAI from "openai";
// import * as dotenv from "dotenv";

// dotenv.config();

console.log(import.meta.env);

const openai = new OpenAI({
	baseURL: "https://api.deepseek.com",
	apiKey: import.meta.env.WXT_DEEPSEEK_API_KEY,
	dangerouslyAllowBrowser: true,
});

// let openai: undefined | OpenAI;

// export function configure(key: string) {
// 	openai = new OpenAI({
// 		baseURL: "https://api.deepseek.com",
// 		apiKey: key,
// 	});
// }

export async function sendMessage(content: string) {
	console.log("sending message");
	if (!openai) throw new Error("OpenAI not configured.");

	const completion = await openai.chat.completions.create({
		messages: [{ role: "system", content: content }],
		model: "deepseek-chat",
	});
	console.log("response sent");
	return completion.choices[0].message.content;
}

// sendMessage("You are a helpful assistant.");
