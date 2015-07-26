function random( min, max ) {
    return Math.random() * ( max - min ) + min;
}

var throttle= function(fn, interval){
	var _self=fn,
		timer,
		firstTime=true;
	return function(){
		var _me=this,
			args=arguments;
		if(firstTime){
			_self.apply(_me, args);
			return firstTime=false;
		}
		if(timer){
			return false;
		}
		timer=setTimeout(function(){
			clearTimeout(timer);
			timer=null;
			_self.apply(_me, args);
		},interval||500);
	}
}