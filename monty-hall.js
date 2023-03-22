/**
 * Monty Hall Problem.
 *
 * Monty Hall Problem (Description).
 *
 * @author Ennis Gundogan <e@gndgn.dev>
 */

/**
 * Random int generator.
 * @param  {number} max
 * @return {number}
 */
function randomDoor(max) {
	return Math.floor(Math.random() * max) + 1
}

let countWins = 0;
let countLosses = 0;

let countPlayerDoorChoose = [0, 0, 0];
let countDoorRevealed = [0, 0, 0];

let games = 100000;

for(let i = 1; i <= games; i++) {
	console.log("Game #" + i);
	playGame(true, false);
}

/**
 * [playGame description]
 * @param  {boolean} switchDoor Player switches door.
 * @param  {boolean} cOut       Console output enabled.
 */
function playGame(switchDoor, cOut) {

	let doors = { 
		1 : {'content' : '🐐', 'closed' : true}, 
		2 : {'content' : '🐐', 'closed' : true}, 
		3 : {'content' : '🐐', 'closed' : true} 
	};

	let doorCar = randomDoor(3);
	let doorPlayer = randomDoor(3);
	countPlayerDoorChoose[doorPlayer-1]++;

	let doorsAlter = [];


	for (const [key, val] of Object.entries(doors)) {
		if (key == doorCar) {
			doors[key]['content'] = '🏎️';
		} else {
			doorsAlter.push(key);
		}
	}

	if (cOut) {
		console.log("LET'S MAKE A DEAL!\n\nDoors:");
		console.log(doors);
		console.log("\nCar is behind door " + doorCar);
		console.log("Player chooses door " + doorPlayer);
	}


	for (const [i, val] of doorsAlter.entries()) {
		if (val == doorPlayer) { doorsAlter.splice(i, 1); }
	}

	let doorReveal = doorsAlter[randomDoor(doorsAlter.length)-1];
	countDoorRevealed[doorReveal-1]++;


	if (cOut) {
		console.log("\nHost reveals door " + doorReveal + ":");
		console.log(doors[doorReveal]['content'] + "\n");
	}

	doors[doorReveal]['closed'] = false;

	if (cOut) { console.log(doors); }

	let doorFinal;

	if (switchDoor) {
		for (const [key, val] of Object.entries(doors)) {
			if ( (key != doorPlayer) && (doors[key]['closed']) ) {
				if (cOut) { console.log("\nPlayer switches to door " + key + "\n"); }
				doorFinal = doors[key];
			}
		}
	} else {
		if (cOut) { console.log("\nPlayer stays with door " + doorPlayer + "\n"); }
		doorFinal = doors[doorPlayer];
	}

	if (cOut) {
		console.log("Player opens the door:");
		console.log(doorFinal['content'] + "\n");
	}

	if(doorFinal['content'] == '🏎️') {
		countWins++;
	} else {
		countLosses++;
	}

}

console.log("\nSummary:\n\n🏎️  " + countWins + "\n🐐 " + countLosses + "\n");
console.log(
	"Player's initial door choice\n🚪1️⃣  " + countPlayerDoorChoose[0] 
	+ "\n🚪2️⃣  " + countPlayerDoorChoose[1] 
	+ "\n🚪3️⃣  " + countPlayerDoorChoose[2]
	)
console.log(
	"\nRevealed door by host\n🚪1️⃣  " + countDoorRevealed[0] 
	+ "\n🚪2️⃣  " + countDoorRevealed[1] 
	+ "\n🚪3️⃣  " + countDoorRevealed[2]
	)

