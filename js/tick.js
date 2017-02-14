var tick_stop  = false;
var tick_queue = [];

function tick() {
  if(tick_stop)
    return;
  
  var queue = tick_queue.slice();
  tick_queue = [];
  
  while(queue.length > 0) {
    var info = queue.shift();
    info[0](info[1]);
  }
  
  setTimeout(tick, 600);
}

function tick_call(func, args) {
  tick_queue.push([func, args]);
}
