/***********************************************************************************

					CLASSES & CONSTS

***********************************************************************************/


//CANVAS****************************************************************************

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//ART*******************************************************************************

// const gifFrames = [
// 	"/Users/john/salty-sardines/project-1-game/new_game_images/swing1.gif",
// 	"/Users/john/salty-sardines/project-1-game/new_game_images/swing2.gif",
// 	"/Users/john/salty-sardines/project-1-game/new_game_images/swing3.gif",
// 	"/Users/john/salty-sardines/project-1-game/new_game_images/swing4.gif",
// 	"/Users/john/salty-sardines/project-1-game/new_game_images/swing5.gif",
// 	"/Users/john/salty-sardines/project-1-game/new_game_images/swing6.gif",
// 	"/Users/john/salty-sardines/project-1-game/new_game_images/swing7.gif",
// 	"/Users/john/salty-sardines/project-1-game/new_game_images/swing8.gif",
// 	"/Users/john/salty-sardines/project-1-game/new_game_images/swing9.gif",
// 	"/Users/john/salty-sardines/project-1-game/new_game_images/swing10.gif",
// ];

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
		// ctx.fillStyle = this.color;
		// ctx.fill();
	}

};



/***********************************************************************************
					  BUTTONS & INPUTS (JQUERY BABY)
***********************************************************************************/

const $start = $('#start');
const $reset = $('#reset'); 														
const $clock = $('#clock'); 


$reset.on('click', ()=>{

	$reset.hide();
	// $start.show();

	clearInterval(baseball.intervalID);
	clearCanvas();

	baseball.player.hits = 0;
	baseball.interceptor.hits = 0;
	baseball.counter = 0;
	baseball.interceptor.x = 460;

	
	$clock.text('Time: 0s');
	$('#strikes').text('Strikes: ')
	$('#score').text('Hits: ')
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

	easyChar: [				
		'apple', 'about', 'angel', 'actor', 'blood', 'blind', 'block', 'boost', 'chase', 'chest', 'catch', 'chair',
		'drive', 'draft', 'eight', 'entry', 'exist', 'event', 'fight', 'force', 'floor', 'grant', 'green', 'harry', 
		'inner', 'issue', 'image', 'judge', 'james', 'jones', 'joint', 'later', 'large', 'metal', 'major', 'march',
		'noise', 'north', 'notes', 'ocean', 'offer', 'other', 'offer', 'paper', 'plant', 'phone', 'roger', 'right',
		'sheet', 'shape', 'shift', 'sense', 'sight', 'smoke', 'space', 'taste', 'teeth', 'third', 'under', 'write'
	], 

	mediumChar: [			
		'angst', 'argon', 'audio', 'byway', 'calif', 'cycle', 'curve', 'coble', 'depth', 'dally', 'equal', 'slint',
		'eccho', 'extra', 'fixed', 'first', 'gyros', 'guard', 'jarre', 'jazzy', 'jonny', 'kinky', 'known', 'laugh', 
		'leery', 'lingo', 'lemur', 'margo', 'maple', 'maxim', 'mural', 'newly', 'novel', 'plume', 'proto', 'prior', 
		'quick', 'quiet', 'quiz5', 'queue', 'route', 'riven', 'rough', 'royal', 'seven', 'servo', 'slick', 'sizer', 
		'syrup', 'tough', 'twice', 'twain', 'usual', 'unity', 'upper', 'whale', 'while', 'wilst', 'wound', 'youth', 
	], 

	hardChar: [				
		'daryl', 'exegy', 'fifth', 'sxual', 'miasm', 'proxy', 'pretz', 'qwert', 'twixt', 'twine', 'helix', 'insta',
		'yarow', 'wyley', 'willw', 'yoman', 'ryley', 'rylye', 'allax', 'axels', 'arxca', 'milyt', 'melty', 'alloy',
		'lilyl', 'gaxby', 'axemn', 'crowz', 'axewz', 'roxxy', 'kazam', 'glalw', 'druqs', 'di11a', '1asso', 'venox',
		'12men', '009jb', 'ay420', 'ayy69', '1776b', 'b00st', 'lll1l', 'lmfao', '1mf40', 'ingot', 'minsk', '666b6',
		'ziggy', 'ziisk', 'zyncs', 'zappo', 'xixas', 'xocos', 'n3wb2', 'norte', 'tigre', 'rygbv', 'pinki', 'pikwk'
	],

	extraHardChar: [		
		'psntx', 'ascsw', 'goku2', 'grin8', 'a1ask', 'y11p9', 'artyy', 'xaxis', 'yaxis', '00080', '32333', 'mawyn',
		'aphex', 'twyxm', 'spasm', 'smixl', 'tis6o', '67v18', 'm4nd1', 'toerj', 'ixyxy', 'qfwfq', 'tzero', '7zero', 
		'hxpnt', 'ursul', 'spyrl', 'spaxy', 'sp4nx', 'spunk', 'moetz', 'yetzy', 'yitzl', 'maxrn', 'zggq0', 'zgqgu',
		'krngl', 'golmn', 'bow13', 'symbl', 'strbb', 'drmom', 'dongl', 'dozga', 'bazgo', 'z1ng1', 'zyyvz', 'illst',
		'pa55y', 'parp1', 'tinsx', 'tnzil', 'tillo', 'spepi', 'pespi', 'wlist', 'tiwce', 'queit', 'quasi', 'm0tt0'	
	],

	insaneChar: [			
		'0zx97', '702d3', 'tyxs7', 'gy8v0', 'hx023', '5axon', 'greif', 'hynox', 'h1nun', '4r2nt', '6t9nn', 'grnro',
		'mg7s9', '19een', '6cess', 'be4rr', 'evrr8', 'se7en', 'e11vn', 'arst8', 'i11ns', 'i0wah', '99696', 'xl1nt',
		'aegis', 'sippo', 'siqqy', 'ryskk', '59eri', '9eryn', 'bnwyn', '6wyyn', 'uili1', 'unher', 'grexl', 'oogie',
		'zoppq', 'doxys', 'bixl3', '7h7p8', '2rwpx', 'zyzzy', 'ximny', 'werao', 'aeiou', 'laoqs', 'azo0o', 'zoose',
		'zipty', 'schwt', 'bipfp', '6tyh9', 'alalo', 'alola', 'zgazo', 'ww3w0', 'zp3tz', 'zilch', 'gouro', 'ya1ow' 
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
				$('#how-to').hide();
				baseball.gameOn();			
			}											
		}

		else {

			if (this.key === this.idArray[0]){

				console.log('true');
				this.idArray.splice(0, 1);
				baseball.interceptor.x += baseball.interceptor.speed;
				let currentFrame = gifFrames[0];
				$('#loadingImg').attr('src', currentFrame);
				gifFrames.splice(0, 1);
			}
		}
		
	},

	advanceWord(array1, array2){
		
		$('#display').text(' ');
		this.makeWord(array1, array2);
		$('#loadingImg').attr('src', 'https://imgur.com/973tgMm')

		gifFrames = [
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing1.gif",
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing2.gif",
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing3.gif",
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing4.gif",
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing5.gif",
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing6.gif",
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing7.gif",
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing8.gif",
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing9.gif",
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing10.gif",
		];

		// [

		// 	'https://imgur.com/9PEjarE',
		// 	'https://imgur.com/V9yoihz',
		// 	'https://imgur.com/7sFw49R',
		// 	'https://imgur.com/n1I450t',
		// 	'https://imgur.com/tqzaG60',
		// 	'https://imgur.com/THAFaJq',
		// 	'https://imgur.com/jvOTqbz',
		// 	'https://imgur.com/zAs2CoS',
		// 	'https://imgur.com/zng342B',
		// 	'https://imgur.com/uIgsUDk'

		// ];

		
	}

};


/***********************************************************************************
					BASEBALL
***********************************************************************************/


const baseball = {


/***************************PLAYER INSTANTIATION***********************************/


	player: new Circle('player', 470, 190, 20, 'red', 0),
	
	interceptor: new Circle('interceptor', 443, 195, 10, 'black', 4),

	enemies: [],

	factory: {																		//<-- migrate outside of game?? TBD
		
		generateEnemy(){

			let speed = Math.floor((Math.random() * 3)+ 3);						
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

			if (this.counter === 1) {

				$('#go').show();
			}

			if (this.counter === 3) {

				$('#go').hide();

			}
			
			if ((this.counter % 5) === 0 && this.counter !== 0) {
				
				this.factory.generateEnemy();
				this.enemies.splice(0, 1);
				
				if (this.counter < 32){												//difficult spike starts here
																						
					metaGame.advanceWord(metaGame.easyChar, metaGame.mediumChar);
					this.interceptor.x = 443;


				} if (this.counter > 32) {											//ADJUST THESE THRESHOLDS FOR DIFFICULT

					metaGame.advanceWord(metaGame.mediumChar, metaGame.hardChar);
					this.interceptor.x = 443;

				} if (this.counter > 64) {
					
					metaGame.advanceWord(metaGame.hardChar, metaGame.extraHardChar);
					this.interceptor.x = 443;
					currentEnemy[0].speed = Math.floor((Math.random() * 3)+ 5);


				} if (this.counter > 96) {

					metaGame.advanceWord(metaGame.extraHardChar, metaGame.insaneChar);
					this.interceptor.x = 443;
					this.currentEnemy[0].speed = Math.floor((Math.random() * 3)+ 7);

				}
			}

		}, 1000)

	},


/***************************STAT UPDATER********************************************/


	update(){
		$clock.text('Time: ' + this.counter + 's')

		let hits = this.interceptor.hits;
		$('#score').text('Hits: ' + hits);

		let strikes = this.player.hits
		$('#strikes').text('Strikes: ' + strikes);

		if (strikes > 2) {
			let score = this.interceptor.hits;
		
			$('#passphrase').text('GAME OVER')
			$('#display').text('You hit ' + score + ' runs - not bad!')
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


const strike = new Audio('/Users/john/salty-sardines/project-1-game/new_game_images/strike.mp3')
const nice = new Audio('/Users/john/salty-sardines/project-1-game/new_game_images/nicereal.mp3')


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

				if (player.name === 'player') {

					$('#loadingImg').attr('src', 'https://imgur.com/J6czmV6')
					strike.play();
					gifFrames = [];
					
				} if (player.name === 'interceptor') {

					$('#loadingImg').attr('src', 'https://imgur.com/frqhjRo')
					nice.play();
					gifFrames = [];

				}
				
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

