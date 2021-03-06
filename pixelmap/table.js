let fileInput = document.getElementById("file-input");
let xInput = document.getElementById("x-input");
let yInput = document.getElementById("y-input");
let table = document.getElementById("table");

async function computeFromInput()
{
	let fr = new FileReader();
	let artwork = new Image();

	// read file
	let promise = new Promise((resolve, reject) => {
		fr.onload = resolve;
	});
	fr.readAsDataURL(fileInput.files[0]);
	await promise;

	promise = new Promise((resolve, reject) => {
		artwork.onload = resolve;
	});
	artwork.src = fr.result;
	await promise;

	compute(artwork);
}

async function computeFromURL(url)
{
	for(let i = 0; i < 3; i++)
	{
		let artwork = new Image();
		//artwork.crossOrigin = "anonymous";

		promise = new Promise((resolve, reject) => {
			artwork.onload = resolve;
		});
		artwork.src = url;
		//await promise;

		document.body.append(artwork);
		
		// :MARSEYTROLLGUN: DELAYS ARE THE BEST WAY TO SOLVE PROBLEMS YOU DON'T UNDERSTAND
		await new Promise(r => setTimeout(r, 750));

		compute(artwork);
	}
}

async function compute(artwork)
{
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");

	const offsetX = parseInt(xInput.value);
	const offsetY = parseInt(yInput.value);

	if(artwork.width > 1000 || artwork.height > 1000)
	{
		alert("This \"pixel art\" is bigger than the canvas itself!\nPlus my algo is like O(w!*h!) noway I'll let this run");
		return;
	}

	// Draw png in the canvas
	ctx.width = artwork.width;
	ctx.height = artwork.height;
	await ctx.drawImage(artwork, 0, 0);
	
	// :MARSEYTROLLGUN: DELAYS ARE THE BEST WAY TO SOLVE PROBLEMS YOU DON'T UNDERSTAND
	await new Promise(r => setTimeout(r, 50));

	// data
	const imgData = ctx.getImageData(0, 0, ctx.width, ctx.height);
	const data = imgData.data;

	// now reset table
	table.innerHTML = "";

	// Create header
	let thead = document.createElement("thead");
	table.append(thead);

	let firstRow = document.createElement("tr");
	firstRow.append(document.createElement("th"));
	thead.append(firstRow);

	for(let i = 0; i < artwork.width; i++)
	{
		let cell = document.createElement("th");
		cell.innerText = i + offsetX;
		firstRow.append(cell);
	}

	// Create data
	for(let row = 0, i = 0; row < artwork.height; row++)
	{
		let tableRow = document.createElement("tr");
		let th = document.createElement("th");

		th.innerText = row + offsetY; 
		tableRow.append(th);

		for(let col = 0; col < artwork.width; col++)
		{
			// Pixel values
			const red = data[i];
			const green = data[i + 1];
			const blue = data[i + 2];

			/** @type {HTMLTableCellElement} */
			let cell = document.createElement("td");
			cell.style.backgroundColor = "rgb(" + red + "," + green + ',' + blue +")";
			cell.title = "Coordinates: (" + (col + offsetX) + "," + (row + offsetY) + ")";
			
			// On click handler
			cell.dataset.x = col + offsetX;
			cell.dataset.y = row + offsetY;
			cell.onclick = navigate;

			tableRow.append(cell);

			// update index
			i = i + 4;
		}

		table.append(tableRow)
	}
}

function navigate(ev)
{
	if(!confirm("I'll open the coordinates of this pixel of r/place.\nShall I proceed?\n\nOn Reddit you'll have to click once on the canvas to activate it. Please double ceck coordinates!"))
		return;

	let x = ev.target.dataset.x;
	let y = ev.target.dataset.y;

	window.open("https://new.reddit.com/r/place/?cx=" + x + "&cy=" + y + "&px=29", '_blank', 'noreferrer').focus();
}

document.getElementById("compute-button").onclick = computeFromInput;
