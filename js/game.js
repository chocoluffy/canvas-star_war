
var MONSTER_WIDTH=32;
var MONSTER_HEIGHT=32;
// Create the canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 600;





document.body.appendChild(canvas);
// 通过直接在js里面对document append， 我们可以让index.html更加简洁

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.jpg";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	// 保证在keysdown的hash里面， 对应的键值只有一个
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	// hero.x = canvas.width / 2;
	// hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

var init= function(){
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
}

// Update game objects
var update = function (modifier) {
	if (32 in keysDown) {
		createRays(hero.x, hero.y);
		// rays
		var k=rays.length;
		while(k--){
			rays[k].draw();
			rays[k].update(k);
	}
	}
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	var flag=false;
	if(rays.length>0){
		if(rays[0].x<=(monster.x+50)
			&& monster.x<=(rays[0].x+50)
			&& rays[0].y<=(monster.y+50)
			&& monster.y<=(rays[0].y+50) 
			){
			flag=true;
		}
	}

	if (
		hero.x <= (monster.x + MONSTER_WIDTH)
		&& monster.x <= (hero.x + MONSTER_WIDTH)
		&& hero.y <= (monster.y + MONSTER_WIDTH)
		&& monster.y <= (hero.y + MONSTER_WIDTH)
		|| flag
	) {
		createParticles(monster.x, monster.y);
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	context.clearRect(0,0,canvas.width, canvas.height);
	if (bgReady) {
		// context.drawImage(bgImage, 0, 0);
	}
	// 通过drawimage\new Image()\image.src来实现将一个图片放在canvas上， 后面的两个数据为初始的位置

	if (heroReady) {
		context.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		context.drawImage(monsterImage, monster.x, monster.y);
	}
	//Particles 由于canvas里面是越后面定义的变量， 在最上面， 会有覆盖， 所以应该在画出了背景颜色之后再画烟花
	var i=particles.length;
	while(i--){
		particles[i].draw();
		particles[i].update(i);
	}

	// rays
	var j=rays.length;
	while(j--){
		rays[j].draw();
		rays[j].update(j);
	}

	// Score
	context.fillStyle = "rgb(250, 250, 250)";
	context.font = "24px Helvetica";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	hue +=0.5;
		// normally, clearRect() would be used to clear the canvas
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	context.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	// context.fillStyle = 'rgba(0, 0, 0, 0.5)';
	// context.fillRect( 0, 0, canvas.width, canvas.height );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	context.globalCompositeOperation = 'lighter';

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
init();
main();
