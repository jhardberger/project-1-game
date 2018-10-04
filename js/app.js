/***********************************************************************************
						GAME ZONE

UPDATE 10/3: 
-we have a really nice, intuitive MVP (I think) of game1
-we have an improved architecture, which seperates out universal functions
into a "metagame" object, which could, with the mini games, later be encompassed
in like some kind of super-object if desired (we'll see)




					CLASSES & CONSTS
***********************************************************************************/


//CANVAS****************************************************************************

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//ART*******************************************************************************



//CLASSES***************************************************************************


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

class Circle {constructor(name, x, y, r, color, speed){

		this.name = name;
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
		this.speed = speed;															
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
const $reset = $('#reset'); 														//<-- multiple buttons for the different games?
const $clock = $('#clock'); 


$reset.on('click', ()=>{

	$reset.hide();
	// $start.show();

	clearInterval(baseball.intervalID);
	clearCanvas();

	baseball.player.hits = 0;
	baseball.counter = 0;
	baseball.interceptor.x = 460;

	
	$clock.text('Xs');
	$('#score').text('Strikes: ')
	$('#passphrase').text('Ready to start? If so type "yes", then hit the ENTER key')
	$('#display').text(' ')
	console.log('restart')

});

//KEYSTROKE LISTENER ***************************************************************

$(document).on('keydown', (event)=>{												//<--saves the letter of each key to the metaGame's key value
	// console.log(event.key);
		if(	
			(event.keyCode >= 48 && event.keyCode <= 57) || 
			(event.keyCode >= 65 && event.keyCode <= 90) || 
			(event.keyCode === 13)) {
				
				metaGame.key = event.key;
				console.log(metaGame.key);

				if (event.keyCode != 13){
					$('#display').append(metaGame.key)
				}

				metaGame.wordCheck()

		}

});


/***********************************************************************************
						METAGAME
***********************************************************************************/

const metaGame = {

	baseballScore: null,

	easyChar: [				//length: 1
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
	], 

	mediumChar: [			//length: 2
		'af', 'rn', 'ha', 'hi', 'ja', 'go', 'no', 'ya', 'mm', 'mn', 'tx', 'do', 're', 'mi', 'fa', 'so', 'la', 'ti', 'ap', 'me', 'we', 'sw', 
		'xi', 'pi', 'qi', 'to', 'hm', 'hp', 'dm', 'ls', 'cd', '42', '69', '21', '76', '86', '09'
	], 

	hardChar: [				//length: 3
		'wow', 'yes', 'bye', 'omg', 'lol', 'zip', 'zap', 'yip', 'elf', 'dog', 'cat',  'boy', 'red', 'zig', 'zag', 'exe', 'ohm', 
		'ano', 'arg', 'bat', 'rat', 'fin', 'yep', 'pup', 'qzx', 'mnm', 'xzy', 'arc', 'tot', 'axe', '420', '808', '009'
	],

	extraHardChar: [		//length: 5
		'mongo', 'apple', 'quest', 'qwest', 'blimp', 'types', 'axels', 'exist', 'maxim', 'quart', 'track', '00100', '01010', 'queue', 'minis', 'magoo', 
		'worty', 'queen', 'green', 'mamas', 'papas', 'xanax', 'milky', 'ankle', 'rabbi', 'minxy', 'xyzyx', 'qaqaq', 'tigre', 'swoot', 'sweet', 'ringo',
		'ayo69', '1yes1', '12051', 'ay420'
	],

	insaneChar: [			//length: 7
		'johnnny', 'paualie', 'goergie', 'hillary', 'jeremih', 'nowhere', 'maximum', 'thorpes', 'quinele', 'axemans', 'skelton', 'argyled', 
		'rhianna', 'rhianon', 'marquee', 'aragorn', 'barnaby', 'huxtaby', 'rippert', 'quagmom', 'quinlan', 'starbby', 'restaur', 'popport', 
		'buckdre', 'abalony', 'cliqeud', 'babylon', 'ratabat', 'robocop', 'argonot', 'exegesy', 'caliban', 'cumulus', 'wuppity', 'monstar', 
		'420nice', '69nicee', '0000800', '2222252', '1111717', '6b6bbb6', '5s55s5s', '96780', '98670', '67089', '86079'
	],

	currentWord: null,

	makeWord(array1, array2){

		let wordChars = [];

		let randInteger1 = (Math.floor(Math.random() * array1.length));
		wordChars.push(array1[randInteger1]);

		let randInteger2 = (Math.floor(Math.random() * array2.length));
		wordChars.push(array2[randInteger2]);

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

		if (baseball.counter === 0) {
			if (this.key === 'Enter'){
				$('#display').text(' ')	
				baseball.gameOn();			
			}											
		}

		else {

			if (this.key === this.idArray[0]){

				console.log('true');
				this.idArray.splice(0, 1);
				baseball.interceptor.x += baseball.interceptor.speed;
				// $('#loadingImg').attr('src', '/Users/john/salty-sardines/project-1-game/new_game_images/swing1_test.gif');
			}
		}
		
	},

	advanceWord(array1, array2){
		
		$('#display').text(' ');
		this.makeWord(array1, array2);
		$('#loadingImg').attr('src', '/Users/john/salty-sardines/project-1-game/new_game_images/swing_default.gif')
		
	}

};


/***********************************************************************************
					BASEBALL
***********************************************************************************/


const baseball = {


/***************************PLAYER INSTANTIATION***********************************/


	player: new Circle('player', 490, 190, 20, 'red', 0),
	
	interceptor: new Circle('interceptor', 460, 195, 10, 'black', 22),

	enemies: [],

	factory: {																		//<-- migrate outside of game?? TBD
		
		generateEnemy(){

			let speed = Math.floor((Math.random() * 3)+ 3);							//CAN INCREMENT DIFFICULTY HERE
			const newEnemy = new Square(1000, 190, 10, 10, 'white', speed); 		//should generate at right edge of screen
			newEnemy.draw();
			baseball.enemies.push(newEnemy);
			return newEnemy;

		}
	},


/***************************TIMER GORE*********************************************/


	counter: 0, 																	

	intervalID: null,

	timer(){

		this.intervalID = setInterval(()=>{ 
			this.counter++;
			this.update();
			console.log(this.counter);
			
			if ((this.counter % 5) === 0 ) {
				
				this.factory.generateEnemy();
				this.enemies.splice(0, 1);
				
				if (this.counter < 32){												//difficult spike starts here
																						
					metaGame.advanceWord(metaGame.easyChar, metaGame.mediumChar);
					this.interceptor.x = 440;

				} if (this.counter > 32) {											//ADJUST THESE THRESHOLDS FOR DIFFICULT

					metaGame.advanceWord(metaGame.mediumChar, metaGame.hardChar);
					this.interceptor.x = 400;

				} if (this.counter > 64) {
					
					metaGame.advanceWord(metaGame.hardChar, metaGame.extraHardChar);
					this.interceptor.x = 340;


				} if (this.counter > 96) {

					metaGame.advanceWord(metaGame.extraHardChar, metaGame.insaneChar);
					this.interceptor.x = 260
				}
			}

		}, 1000)

	},


/***************************STAT UPDATER********************************************/


	update(){
		$clock.text(this.counter + 's')

		let strikes = this.player.hits
		$('#score').text('Strikes: ' + strikes);

		if (strikes > 2) {
			let score = this.counter;
		
			$('#passphrase').text('game over nerd')
			$('#display').text('You lasted ' + score + ' seconds (and you are still a nerd)')
			metaGame.baseballScore = score;

			clearInterval(this.intervalID);
		}

	},


/***************************START/GAME DATA*****************************************/


	gameOn(){																		

			$reset.show();
			this.player.draw();
			this.interceptor.draw();
			this.factory.generateEnemy();
			this.timer();	
	
			metaGame.advanceWord(metaGame.easyChar, metaGame.easyChar);
	
			// if (this.advanceWord() === true) {
				
			// 	this.makeWord(this.easyChar, this.mediumChar)

			// }		
	}

}; 


/***********************************************************************************
					ANIMATION JUNK
***********************************************************************************/



function collisionDetection(target){

	let currentEnemy = baseball.enemies[0];
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
};

function clearCanvas(){
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);

};

animationCounter = 0;															

function animate(){

	animationCounter++;													
	// console.log(counter);
	if (baseball.counter > 0){
		let currentEnemy = baseball.enemies[0];											
		currentEnemy.x -= currentEnemy.speed; 
		clearCanvas();
		baseball.player.draw();
		baseball.interceptor.draw();
		currentEnemy.draw();
		collisionDetection(baseball.player);
		collisionDetection(baseball.interceptor);
	}
	window.requestAnimationFrame(animate);
};

animate();		

