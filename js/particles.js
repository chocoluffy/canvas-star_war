// 在定义了particle作为一个类的基础属性， 以及update\draw等方法对每一个particle对象；
// 还需要在render里面用循环每一个particaled的draw和update, 注意画布的优先顺序， 后画的东西在上面。

//  // loop over each particle, draw it, update it
    // var i = particles.length;
    // while( i-- ) {
    //     particles[ i ].draw();
    //     particles[ i ].update( i );
    // }
    // 

//在总的update 里面createParticles(x, y).

// 在总的需要无数循环的函数里面loop\main等等， 更新一些属性， hue+=0.5, context.globalCompositeOperation="lighter"等

//     normally, clearRect() would be used to clear the canvas
//     we want to create a trailing effect though
//     setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
//     context.globalCompositeOperation = 'destination-out';
//     decrease the alpha property to create more prominent trails
//     context.fillStyle = 'rgba(0, 0, 0, 0.5)';
//     context.fillRect( 0, 0, canvas.width, canvas.height );
//     change the composite operation back to our main mode
//     lighter creates bright highlight points as the fireworks and particles overlap each other
//     context.globalCompositeOperation = 'lighter';
    
var particles=[];
var PARTICLE_NUMBER=30;
var hue=120;

function Particle(x, y){
    this.x=x;
    this.y=y;
    this.coordinates=[];
    this.coordinateCount=5;
    while(this.coordinateCount--){
        this.coordinates.push([this.x, this.y])
    }
    this.angle= random(0, Math.PI*2);
    this.speed= random(1,8);
    this.friction= 0.95;
    this.gravity= 1;
    this.hue= random(hue-20, hue+20);
    this.brightness= random(50, 80);
    this.alpha= 1;
    this.decay= random(0.015, 0.03);
}

function random( min, max ) {
    return Math.random() * ( max - min ) + min;
}

Particle.prototype.update = function( index ) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift( [ this.x, this.y ] );
    // slow down the particle
    this.speed *= this.friction;
    // apply velocity
    this.x += Math.cos( this.angle ) * this.speed;
    this.y += Math.sin( this.angle ) * this.speed + this.gravity;
    // fade out the particle
    this.alpha -= this.decay;
    
    // remove the particle once the alpha is low enough, based on the passed in index
    if( this.alpha <= this.decay ) {
        particles.splice( index, 1 );
    }
}

Particle.prototype.draw= function(){
    //particle的画布状态：
    context.strokeStyle="hsla("+this.hue+ ", 100%,"+ this.brightness+ "%,"+this.alpha+")";
    context.lineWidth=2;
    context.save();
    context.restore();

    context.beginPath();
    context.moveTo(this.coordinates[this.coordinates.length-1][0], this.coordinates[this.coordinates.length-1][1]);
    context.lineTo(this.x, this.y);
    context.stroke();
}

function createParticles( x, y ) {
    // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
    var particleCount = PARTICLE_NUMBER;
    while( particleCount-- ) {
        particles.push( new Particle( x, y ) );
    }
}