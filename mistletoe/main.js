let pyodide;

async function main() {
	pyodide = await loadPyodide();
	// Pyodide is now ready to use...
	console.log(pyodide.runPython(`
		print("BOOOOOTING")
		import micropip
		micropip.install("mistletoe")
		micropip.install("https://DrTransmisia.github.io/mistletoe/bussy.whl")

		import rdramamistletoe
	`));
};

main();