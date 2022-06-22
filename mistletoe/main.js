let pyodide;

async function main() {
	pyodide = await loadPyodide();
	await pyodide.loadPackage("micropip");

	console.log(pyodide.runPython(`
		print("BOOOOOTING")
		import micropip
		micropip.install("mistletoe")
		micropip.install("https://DrTransmisia.github.io/mistletoe/rdramamistletoe-0.0.1-py2.py3-none-any.whl")

		import rdramamistletoe
	`));
};

main();