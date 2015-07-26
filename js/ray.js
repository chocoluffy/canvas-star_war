var rays=[];
var hue=120;
var RAY_NUMBER=1;
var SHIP_WIDTH=64;
var SHIP_HEIGHT=48;
var BOMB_NUMBER=100;

// var RAY_WIDTH=4;
function ray(x, y){
	this.x=x+SHIP_WIDTH/2;
	this.y=y;
	this.coordinates=[];
	this.coordinateCount=3;
	while(this.coordinateCount--){
		this.coordinates.push([this.x, this.y]);
	}
	this.speed=random(4,7);
	this.hue=random(hue-30, hue+30);
	this.brightness=random(60,80);
	this.alpha=1;
	this.friction=0.8;
	// this.decay=random(0.01, 0.03);
}

ray.prototype.update= function(index){
	this.coordinates.pop();
	this.coordinates.unshift([this.x, this.y]);
	this.y-=this.speed*this.friction;
	// this.alpha-= this.decay;
	// if(this.alpha<=this.decay){
	// 	rays.splice(index, 1);
	// }
	if(this.y<=0){
		createParticles(this.x, 0, false);
		rays.splice(index, 1);
		// console.log("rays:"+ rays.length);
	}
}

ray.prototype.draw= function(){
	//ray的画布状态：
	var lineWidth=random(1,3);
	context.lineWidth=lineWidth;
	context.strokeStyle="hsla("+this.hue+", 100%,"+this.brightness+"%,"+this.alpha+")";

	context.save();
	context.restore();

	context.beginPath();
	context.moveTo(this.coordinates[this.coordinates.length-1][0], this.coordinates[this.coordinates.length-1][1]);
	context.lineTo(this.x, this.y);
	// context.closePath();
	context.stroke();
}

function createRays(x, y){
	var particleCount=RAY_NUMBER;
	BOMB_NUMBER-= RAY_NUMBER;
	while(particleCount--){
		rays.push(new ray(x, y));
	}
}


















