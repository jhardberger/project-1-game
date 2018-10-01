
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
			ctx.closePath();
		} else {
			ctx.beginPath();														//<-- I suspect there's a simpler solution than this, but this works
			ctx.closePath();
		}
		
	}
};

class Circle {
	constructor(x, y, r, color, speed){
// 
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
		this.speed = speed;															//<-- not sure Circle needs speed yet, but jic
	
	}
	draw(){

		ctx.beginPath
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

};



/***********************************************************************************
					  BUTTONS & INPUTS 
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

//RESET BUTTON ********************************************************************


$reset.on('click', ()=>{

	$reset.hide();
	$start.show();
	$clock.text('Xs');

	clearInterval(game.intervalID);
	game.counter = 0;
	game.clearCanvas();

	console.log('restart')

});

/***********************************************************************************
						GAME OBJECT
***********************************************************************************/

// game object to contain everything

const game = {

	player: new Circle(490, 190, 20, 'brown', 10),									//<--character instantiation/info
	
	enemies: [],

	factory: {
		generateEnemy(){

			let speed = Math.floor((Math.random() * 5)+ 2);							//generate's pitch speed (I guess we're in baseball mode rn)
			const newEnemy = new Square(1000, 190, 10, 10, 'black', speed); 		//should generate at right edge of screen
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
			this.updateClock();
			console.log(this.counter);
			
			if ((this.counter % 6) === 0 ) {
				this.factory.generateEnemy();
				this.enemies.splice(0, 1);
			}

		}, 1000)

	},

	updateClock(){
		$clock.text(this.counter + 's')
	},

	animationCounter: 0,															//<-- animation stuff starts here

	collisionDetection(target){

		let currentEnemy = this.enemies[0];
		let player = target;
		if (currentEnemy.x < (player.x + player.r) && 
			currentEnemy.x > (player.x - player.r) && 
			currentEnemy.y < (player.y + player.r) && 
			currentEnemy.y > (player.y - player.r)) {
		
				console.log('hit!');
				currentEnemy.status = false;
				console.log(currentEnemy.status);

		}
	},

	clearCanvas(){
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);

	},

	animate() {

		let currentEnemy = game.enemies[0];											//<-- for some reason only works if I do game.tktkt - not this.tktkt - why??
		game.animationCounter++;													//		(but also like whatever man)
		// console.log(counter);
		currentEnemy.x -= currentEnemy.speed; 
		game.clearCanvas();
		game.player.draw();
		currentEnemy.draw();
		game.collisionDetection(game.player);
		window.requestAnimationFrame(game.animate);

	},


	start(){																		//<-- you're looking for this
		
		this.player.draw();
		this.factory.generateEnemy();
		this.timer();																	
		this.animate();	

	},

/***********************************************************************************
ok so, so far everything has been pretty game-wid in scope. what I now am going to 
attempt to set up is the indivdual mini-game methods, which will reskin the master
game and slightly change the rules. 

along the way, I'll probably have to add more stuff the universal scope - that's
both cool and good. I could start with that, but I think I need to start building
a mini-grame so that I know what I actually need to add to the game-wide scope.

this will probably happen in a branch, so watch out! 
***********************************************************************************/





};


/***********************************************************************************
					ANIMATION JUNK


//colission detection & stoppage here: 


function collisionDetection(){

	let currentEnemy = game.factory.enemies[0];
	let player = game.player;
	if (currentEnemy.x < (player.x + player.r) && currentEnemy.x > (player.x - player.r) && currentEnemy.y < (player.y + player.r) && currentEnemy.y > (player.y - player.r)) {
		
		console.log('hit!');
		currentEnemy.status = false;
		console.log(currentEnemy.status);

	}
};


// enemy animation / dummy physics

function clearCanvas(){
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);

}; 


//animate function

let counter = 0;

function animate() {

	let currentEnemy = game.factory.enemies[0];
	counter++;
	// console.log(counter);
	currentEnemy.x -= currentEnemy.speed; 
	clearCanvas();
	currentEnemy.draw();
	game.player.draw();
	collisionDetection();
	window.requestAnimationFrame(animate);

};
															


************************************************************************************

						OTHER NOTES

overall goals/gameplan: 

basic gameplay: 
	-user types a randomly generated phrase into an input
	-by typing this phrase, they advance an animation 
	frame by frame, moving a hitbox into the path of 
	a projectile
	-by intercepting said projectile, (or dodging it), 
	the player gains points/perpetuates the game
	-failing to do so results in docked points, 
	or the game's untimely end

mini-game outlines: 
	-GAME 1: home run derby: 
	the player controls a batter, and by completing the 
	assigned phrases moves his bat into the path of 
	an oncomming fastball - get there in time
	and you hit a home run!
	-STRETCH: variable pitch speeds, home run vs single
	sweet spots
	-GAME 2: space invader: 
	this player controls a spaceship, and by completing
	the assigned phrases charges and fires its laser
	to repel oncoming enemies
	-STRETCH: the player ship will bob up and down
	so that the phrase must typed at exactly the right
	time to hit each oponent
	-GAME 3: Dodge/catch: 
	the player controls a character who moves back
	and forth on the x axis as phrases are typed, 
	dodging knives and catching fruit. Knives lower
	health, shortening the game, fruit increases, 
	prolonging it
	-STRETCH: honestly this whole game is a stretch goal


********************************************************************


	HERE'S MY COLLISION DETECTION CODE FROM THE PRACTICE

				(might be a helpful reference)


const canvas = document.getElementById('my-canvas');
// this is our canvas
const ctx = canvas.getContext('2d');
// the "context" is what you actually draw on 
// -- you basically always need this


//RECTANGLES REF****************************************************


	//this is the method for rectangles of any size
	//4 parameters:
	//1. x coord of UPPER LEFT HAND CORNER of rect
	//2. Y coord of UPPER LEFT HAND CORNER of rect
	//3. width of rect
	//4. height of rect

	ctx.rect(300, 300, 80, 180);
	ctx.fillStyle = "firebrick";
	//^ this is not a method but a property of the ctx object,
	//^ which is built in cool
	ctx.fill();
	//^this is the method that calls fillstyle
	//often for shapes we use fill instead of stroke.
	//if u wanna fill them, anway whatever
	ctx.closePath();
};

drawRect();

const captSquare = {
	height: 40,
	width: 80,
	color: 'teal',
	drawHisself() {
		ctx.beginPath();
		ctx.rect(100, 100, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath( );
	}

};


//CIRCLES REF*******************************************************


function circules(){
	ctx.beginPath();

	//to draw a circle, u use arc
	//params are a little different
	// x: x coordinate of the center of the circle
	// y: y coordinate of the cneter of the circle
	// radius
	// e: -- don't worry about what it is for now, just always set it to 0
	// how much of the circle you want to actually draw in RADIANS
	// note(2 pi radians is 370*)

	ctx.arc(75, 525, 71, 0, Math.PI * 2);
	ctx.fillStyle = 'yellow';
	ctx.fill();
	ctx.closePath();

};

circules();

const cmndCircle = {
	x: 400,
	y: 400,
	r: 66,
	color: 'navy',
	speed: 20,

	drawHerself(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

};


//CONTROL REF*******************************************************


//two common ways to MOVE STUFF around
//which is what you wanna do right?

$(document).on('keydown', (event)=>{ 
	if (event.keyCode === 38) {
	// up 38
		if (cmndCircle.y > 66) {
			console.log('up');
			cmndCircle.y -= cmndCircle.speed;
		}
	} if (event.keyCode === 40) {
	// down 40
		if (cmndCircle.y < 544) {
			console.log('down');
			cmndCircle.y += cmndCircle.speed;

		}
	} if (event.keyCode === 37) {
	// left 37
		if (cmndCircle.x > 66) {
			console.log('left');
			cmndCircle.x -= cmndCircle.speed;

		}
	} if (event.keyCode === 39) {
	// right 39
		if (cmndCircle.x < 544) {
			console.log('right');
			cmndCircle.x += cmndCircle.speed;
		}
	}
	clearRect();
	cmndCircle.drawHerself();	
});
	

function clearRect(){
		//erases ENTIRE CANVAS
		ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const admiralRect = {
	height: 60,
	width: 100,
	x: 100,
	y: 100,
	color: 'goldenrod',
	drawHisself() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath( );
	}
};

admiralRect.drawHisself();


//ANIMATION REF*****************************************************


//admiralRect should move down automatically via animation

//the way you do animation in canvas is: 

//window.requestAnimatoinFrame

//create a function (call it animate or something uncreative)
//inside that function, pass that function to window.requestAnimationFrame
//this is recursion, we will use our animate function as a recursive callback

let counter = 0
function animate() {

	//code in here will be automatically executed approx 60 times per second (fps)
	counter++;
	console.log(counter);
	admiralRect.y++; 
	clearRect();
	admiralRect.drawHisself();
	cmndCircle.drawHerself();

	//call this at the end: 
	window.requestAnimationFrame(animate);
};

animate();


********************************************************************/