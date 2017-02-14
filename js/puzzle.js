var puzzle = null;
var pieces = [];

function puzzle_init() {
  puzzle = document.getElementById("puzzle");
  var x, y;
  
  for(var idx = 0; idx < 25; idx++) {
    var id    = idx;
    [x, y]    = xypx(idx2xy(idx));
    var piece = document.createElement("div");
    
    piece.className = "piece";
    piece.style.backgroundPosition = -x + "px " + -y + "px";
    
    piece.puzzle_id   = id;
    piece.onmousedown = function() { puzzle_move(this.puzzle_id); }
    
    puzzle.appendChild(piece);
    pieces.push(id);
  }
  
  puzzle_update_all();
}

function puzzle_piece(id) {
  return puzzle.childNodes[id];
}

function puzzle_load(name) {
  var path = "url('img/" + name + ".png')";
  
  puzzle.style.backgroundImage = path;
  
  for(var id = 0; id < 25; id++)
    puzzle_piece(id).style.backgroundImage = path;
}

function puzzle_update(idx) {
  var x, y;
  
  var piece = puzzle_piece(pieces[idx]);
  [x, y]    = xypx(idx2xy(idx));
  
  piece.style.top  = y + "px";
  piece.style.left = x + "px";
}

function puzzle_update_all() {
  for(var idx = 0; idx < 25; idx++)
    puzzle_update(idx);
}

function puzzle_move(id) {
  tick_call(puzzle_move_tick, [id]);
}

function puzzle_move_tick(args) {
  var id = args[0];
  var x, y;
  
  var idx = pieces.indexOf(id);
  [x, y]  = idx2xy(idx);
  
  for(var i = 0; i < 4; i++) {
    var xx = x + adjacent[i][0];
    var yy = y + adjacent[i][1];
    
    if(xyoob([xx, yy]))
      continue;
      
    var idx2 = xy2idx([xx, yy]);
    
    if(pieces[idx2] != 24)
      continue;
    
    [pieces[idx], pieces[idx2]] = [pieces[idx2], pieces[idx]]
    puzzle_update(idx);
    puzzle_update(idx2);
    
    break;
  }
  
  puzzle_check();
}

function puzzle_move_random() {
  var x, y;
  
  var idx = pieces.indexOf(24);
  [x, y]  = idx2xy(idx);
  
  while(true) {
    var i  = getRandomInt(0, 3);
    var xx = x + adjacent[i][0];
    var yy = y + adjacent[i][1];
    
    if(xyoob([xx, yy]))
      continue;
      
    var idx2 = xy2idx([xx, yy]);
    
    [pieces[idx], pieces[idx2]] = [pieces[idx2], pieces[idx]]
    puzzle_update(idx);
    puzzle_update(idx2);
    
    break;
  }
}

function puzzle_scramble(moves) {
  for(var i = 0; i < moves; i++)
    puzzle_move_random();
}

function puzzle_check() {
  for(var i = 0; i < 25; i++) {
    if(i != pieces[i])
      break;
  }
  
  if(i == 25) {
    tick_stop = true;
    document.getElementById("timer").style.color = "#00FF00";
  }
}
