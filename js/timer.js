function timer_tick(args) {
  var ticks = args[0];
  
  document.getElementById("timer").innerHTML = ticks + " ticks";
  
  tick_call(timer_tick, [ticks + 1]);
}
