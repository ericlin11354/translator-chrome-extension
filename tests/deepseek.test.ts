import { test, expect } from "vitest";
import { main } from "@/services/deepseek";

test("deepseek runs", async () => {
	await main();
});
