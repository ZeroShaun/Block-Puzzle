function collisionCheck(newPos, action) {
  for(let i=0; i<newPos.length; i++) {
    const x = newPos[i][0];
    const y = newPos[i][1];
    if(action === "fall" && (y === 19 || game.grid[x][y+1] === "true")) {
      // call shape settle logic
      return true; // collision is true
    } else if(action === "left" && (x === 0 || game.grid[x-1][y] === true)) {
      return true; // collision is true
    } else if(action === "right" && (x === 9 || game.grid[x+1][y] === true)) {
      return true; // collision is true
    } else if(action === "flip") {
      // do stuff
    } else {
      return false;
    }
  }
}