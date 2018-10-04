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

let gifFrames = [
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

	easyChar: [				
		'apple', 'about', 'angel', 'actor', 'blood', 'blind', 'block', 'boost', 'chase', 'chest', 'catch', 'chair',
		'drive', 'draft', 'eight', 'entry', 'exist', 'event', 'fight', 'force', 'floor', 'grant', 'green', 'harry', 
		'inner', 'issue', 'image', 'judge', 'james', 'jones', 'joint', 'later', 'large', 'metal', 'major', 'march',
		'noise', 'north', 'notes', 'ocean', 'offer', 'other', 'offer', 'paper', 'plant', 'phone', 'roger', 'right',
		'sheet', 'shape', 'shift', 'sense', 'sight', 'smoke', 'space', 'taste', 'teeth', 'third', 'under', 'write'
	], 

	mediumChar: [			
		'angst', 'argon', 'aegis', 'audio', 'byway', 'calif', 'cycle', 'curve', 'coble', 'depth', 'dally', 'equal', 
		'eccho', 'extra', 'fixed', 'first', 'gyros', 'guard', 'jarre', 'jazzy', 'jonny', 'kinky', 'known', 'laugh', 
		'leery', 'lingo', 'lemur', 'margo', 'maple', 'maxim', 'mural', 'newly', 'novel', 'plume', 'proto', 'prior', 
		'quick', 'quiet', 'quiz5', 'queue', 'route', 'riven', 'rough', 'royal', 'seven', 'servo', 'slick', 'sizer', 
		'syrup', 'tough', 'twice', 'twain', 'usual', 'unity', 'upper', 'whale', 'while', 'wilst', 'wound', 'youth', 
	], 

	hardChar: [				
		'daryl', 'exegy', 'fifth', 'hymen', 'miasm', 'proxy', 'pretz', 'qwert', 'twixt', 'twine', 'helix', 'insta',
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
		'slint', 'sippo', 'siqqy', 'ryskk', '59eri', '9eryn', 'bnwyn', '6wyyn', 'uili1', 'unher', 'grexl', 'oogie',
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
		$('#loadingImg').attr('src', '/Users/john/salty-sardines/project-1-game/new_game_images/swing_default.gif')
		gifFrames = [
	
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing1_test.gif",
			"/Users/john/salty-sardines/project-1-game/new_game_images/swing2_test.gif"

		];
		
	}

};


/***********************************************************************************
					BASEBALL
***********************************************************************************/


const baseball = {


/***************************PLAYER INSTANTIATION***********************************/


	player: new Circle('player', 490, 190, 20, 'red', 0),
	
	interceptor: new Circle('interceptor', 460, 195, 10, 'black', 5),

	enemies: [],

	factory: {																		//<-- migrate outside of game?? TBD
		
		generateEnemy(){

			let speed = Math.floor((Math.random() * 3)+ 2);							//CAN INCREMENT DIFFICULTY HERE
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
					this.interceptor.x = 460;

				} if (this.counter > 32) {											//ADJUST THESE THRESHOLDS FOR DIFFICULT

					metaGame.advanceWord(metaGame.mediumChar, metaGame.hardChar);
					this.interceptor.x = 460;

				} if (this.counter > 64) {
					
					metaGame.advanceWord(metaGame.hardChar, metaGame.extraHardChar);
					this.interceptor.x = 460;
					currentEnemy[0].speed = Math.floor((Math.random() * 3)+ 3);


				} if (this.counter > 96) {

					metaGame.advanceWord(metaGame.extraHardChar, metaGame.insaneChar);
					this.interceptor.x = 600
					currentEnemy[0].speed = Math.floor((Math.random() * 3)+ 4);

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

