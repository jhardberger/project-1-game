/***********************************************************************************
						GAME ZONE
basic user stories/goals for today: 
	-get working wireframe
	-iron out hitbox kinks
	-simplest possible working model of one game
	-games 2 & are a plus
						PSEUDO
ok let's pseudo!
set up canvas/context
then we're going to create a class square for our enemies 
(possibly a class circle for our hero, TBD)
***********************************************************************************/

console.log('game time');

/***********************************************************************************
					CLASSES & CONSTS
***********************************************************************************/


const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

class Square {
	constructor(x, y, h, w, color, speed){

		this.x = x;
		this.y = y;
		this.height = h;
		this.width = w;
		this.color = color;
		this.speed = speed;
		this.status = true;

	} 
	draw(){
		
		if (this.status === true){

			ctx.beginPath();
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			// ctx.closePath();

		} 
	}
};

class Circle {
	constructor(name, x, y, r, color, speed){

		this.name = name;
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
		this.speed = speed;															//<-- not sure Circle needs speed yet, but jic
		this.hits = 0;

	}
	draw(){

		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

};



/***********************************************************************************
					  BUTTONS & INPUTS (JQUERY BABY)
***********************************************************************************/

const $start = $('#start');
const $reset = $('#reset');
const $clock = $('#clock'); 

//START BUTTON *********************************************************************


$start.on('click', ()=>{

	game.start();

	$start.hide();
	$reset.show();

	console.log('start the party')
	
});

//RESET BUTTON *********************************************************************


$reset.on('click', ()=>{

	$reset.hide();
	$start.show();
	$clock.text('Xs');

	clearInterval(game.intervalID);
	game.counter = 0;
	game.clearCanvas();

	console.log('restart')

});

//KEYSTROKE LISTENER ***************************************************************

$(document).on('keydown', (event)=>{												//<--saves the letter of each key to the game's key value
	// console.log(event.key);
	// if (game.counter === 0){
		if(	
			(event.keyCode >= 48 && event.keyCode <= 57) || 
			(event.keyCode >= 65 && event.keyCode <= 90) || 
			(event.keyCode === 13)) {
				if (event.keyCode === 13) {

					let letter = event.key
					game.key = letter;
					console.log(game.key);
					game.wordCheck();

				} else {
					
					let letter = event.key
					$('#display').append(letter)
					game.key = letter;
					console.log(game.key);
					game.wordCheck()

				}

		}
	// } else {
	// 	if(	
	// 		(event.keyCode >= 48 && event.keyCode <= 57) || 
	// 		(event.keyCode >= 65 && event.keyCode <= 90) || 
	// 		(event.keyCode === 13)) {

	// 		let letter = event.key
	// 		$('#display').append(letter)
	// 		game.key = letter;
	// 		console.log(game.key);
	// 		game.wordCheck()

	// 	}
	// }
});


/***********************************************************************************
						GAME OBJECT
***********************************************************************************/

// game object to contain everything

const game = {

	player: new Circle('player', 490, 190, 20, 'red', 0),									//<--character instantiation/info
	
	interceptor: new Circle('interceptor', 420, 195, 10, 'black', 30),

	enemies: [],

	factory: {
		generateEnemy(){

			let speed = Math.floor((Math.random() * 4)+ 2);							//generate's pitch speed (I guess we're in baseball mode rn)
			const newEnemy = new Square(1000, 190, 10, 10, 'white', speed); 		//should generate at right edge of screen
			newEnemy.draw();
			game.enemies.push(newEnemy);
			return newEnemy;

		}
	},

	counter: 0, 																	//<-- timer gore

	intervalID: null,

	timer(){

		this.intervalID = setInterval(()=>{ 
			this.counter++;
			this.update();
			// this.wordCheck();													//<-- put word check here for now, potentiall remove later
			console.log(this.counter);
			
			if ((this.counter % 5) === 0 ) {

				this.interceptor.x = 420;
				this.advanceWord();

				this.factory.generateEnemy();
				this.enemies.splice(0, 1);
			}

		}, 1000)

	},

	update(){
		$clock.text(this.counter + 's')

		let strikes = this.player.hits
		$('#score').text('Strikes: ' + strikes);

		if (strikes > 2) {
			clearInterval(this.intervalID);
			// console.log('game over bitch');
			$('#passphrase').text('game over nerd')
		}

	},

	animationCounter: 0,															//<-- animation stuff starts here

	collisionDetection(target){

		let currentEnemy = this.enemies[0];
		let player = target;
		if (currentEnemy.x < (player.x + player.r) && 
			currentEnemy.x > (player.x - player.r) && 
			currentEnemy.y < (player.y + player.r) && 
			currentEnemy.y > (player.y - player.r)) {
		
				console.log('');
				if (currentEnemy.status === true) {

					console.log(player.name + ' was hit');
					// return player.name;
					player.hits++;
					
				}
				currentEnemy.status = false;
				console.log(currentEnemy.status);

		}
	},

	clearCanvas(){
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);

	},



	start(){																		//<-- you're looking for this
		
		$('#passphrase').text('Ready to start? If so type "yes", then hit the ENTER key')

	},

	gameOn(){																		//<-- mini game buildout 1

			this.player.draw();
			this.interceptor.draw();
			this.factory.generateEnemy();
			this.timer();	
			animate();		
	
			this.makeWord(this.easyChar, this.easyChar);
	
			// if (this.advanceWord() === true) {
				
			// 	this.makeWord(this.easyChar, this.mediumChar)

			// }		
	},

/***********************************************************************************
these are my arrays and word-building functions
***********************************************************************************/

	easyChar: [
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		'1', '2', '3', '4', '5', '6', '7', '8', '9'
	], 

	mediumChar: [
		'af', 'rn', 'ha', 'hi', 'ja', 'go', 'no', 'ya', 'mm', 'mn', 'tx', 'do', 're', 'mi', 'fa', 'so', 'la', 'ti', '42', '69', '00', '10', '01',
		'ap', 'me', 'we', 'sw', 'xi', 'pi', 'qi', 'to', 'hm', 'hp', 'dm', 'ls', 'cd', 'pwd', 'arc', 'tot', 'axe', '66', '77', '88', '86', '76', '99'
	], 

	hardChar: [
		'wow', 'yes', 'bye', 'omg', 'lol', '000', '420', '6969', 'yeee', 'rofl', 'lmao', 'zip', 'zing', 'zap', 'yip', 'woah', 'elf', 'dog', 'cat',
		'0000', '000', 'qwert', 'boy', 'girl', 'red', 'blue', 'zig', 'zag', 'exes', 'ohm', 'ano', 'argo', 'bat', 'rat', 'fink', 'yep'
	],

	extraHardChar: [
		'mongo', 'monster', 'apple', 'tipple', 'quest', 'qwest', 'plimp', 'ripple', 'typist', 'axis', 'exist', 'maxim', 'quart', 'track', '00100', 
		'01010', 'clique', 'dreamt', 'mini', 'mega', 'wort', 'queen', 'green', 'purple', 'mama', 'papa', 'xanax'
	],

	insaneChar: [
		'johnny', 'paualie', 'georgie', 'ringo', 'hillary', 'jeremy', 'nowhere', 'maximum', 'maplethorpe', 'quinelle', 'axeman', 'skeleton', 'argyle', 
		'rhianna', 'rhianon', 'marquee', 'aragorn', 'barnaby', 'huxtable', 'ripperton', 'quagmire', 'quinlan', 'starburst', 'restaurant', 'opportunist', 
		'manticore', 'abalony', 'curlique', 'arabesque', 'ratbatcat', 'robocop', 'argonaut', 'exegesis', 'calrisian', 'cumulus', 'uppity'
	],

	currentWord: null,

	makeWord(array1, array2){

		let wordChars = [];

		for (let i = 0; i < 3; i++) {

			let thisArray = null;
			let arrayInteger = (Math.floor((Math.random() * 2)) + 1);
			
			if (arrayInteger === 1) {
				thisArray = array1;
			} if (arrayInteger === 2) {
				thisArray = array2;
			} 			

			let randInteger = (Math.floor(Math.random() * thisArray.length));
			wordChars.push(thisArray[randInteger]);

		}; 

		let word = wordChars.join("");
		// console.log(word);
		this.currentWord = word;

		$('#passphrase').text(this.currentWord);

		this.idArray = this.currentWord.split("");

	},

	key: null,																		//<-- this works with the keydown event listener (see jquery block)

	idArray: [1],

	wordCheck(){

		console.log(this.idArray[0]);
		console.log("key: " + this.key);

		if (this.key === 'Enter') {
			if (this.counter === 0){
				$('#display').text(' ')	
				this.gameOn();			
			}											
		}

		else {

			if (this.key === 'Enter') {
				console.log('everything ok');										
			}

			if (this.key === this.idArray[0]) {

				console.log('true');
				this.idArray.splice(0, 1);
				this.interceptor.x += this.interceptor.speed;

			}

		}

		// this.advanceWord();
		
	},

	advanceWord(){
		
		$('#display').text(' ');
		this.makeWord(this.easyChar, this.easyChar);
		
	}
}; 


/***********************************************************************************
					ANIMATION JUNK
***********************************************************************************/

function animate(){

	let currentEnemy = game.enemies[0];											
	game.animationCounter++;													
	// console.log(counter);
	currentEnemy.x -= currentEnemy.speed; 
	game.clearCanvas();
	game.player.draw();
	game.interceptor.draw();
	currentEnemy.draw();
	game.collisionDetection(game.player);
	game.collisionDetection(game.interceptor);
	window.requestAnimationFrame(animate);

};
