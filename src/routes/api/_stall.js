export default async function stall(stallTime = 2000) {
	await new Promise((resolve) => setTimeout(resolve, stallTime));
}
