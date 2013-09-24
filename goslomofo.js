window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.requestAnimFrame ||
        function(callback){
	        window.setTimeout(callback, 1000 / 60);
        };
})();

var goslomofo = function(fn, fr) {

	var running = false;

	var fr = fr || 30;
	var ms = 1000 / fr;
	var last;

	var go = function() {
		if (!running) {
			return;
		}
		if (last) {
			while (+(new Date()) - last < ms) {
				var div = document.createElement('div');
				document.body.appendChild(div);
				window.getComputedStyle(div).height;
				document.body.removeChild(div);
			}
		}
		last = new Date();
		fn();
		requestAnimationFrame(go);
	};

	return {
		start: function() {
			running = true;
			requestAnimationFrame(go);
		},
		stop: function() {
			running = false;
		}
	};
};