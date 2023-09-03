function flipShape(flipDir) {
  let newOre = 0;
  const lastPos = game.activeshape.Position.length-1;
  const currentOre = game.activeShape.Orientation;
  if(lastPos === 1) return;
  if(flipDir === "left" && currentOre === 1 && !collisionCheck(game.activeShape.Position[lastPos],"fall")) {
    newOre = lastPos;
  } else if(flipDir === "left" && !collisionCheck(game.activeShape.Position[currentOre-1],"fall")) {
    newOre = currentOre - 1;
  } else if(flipDir === "right" && currentOre === lastOre && !collisionCheck(game.activeShape.Position[1],"fall")) {
    newOre = 1;
  } else if(flipDir === "right" && !collisionCheck(game.activeshape.Position[currentOre+1])) {
    newOre = currentOre + 1;
  }
  if(newOre !== 0) {
    game.activeShape.Orientation = newOre;
    render("undraw"); // Uncolor the current position
    for(let i=0; i<game.activeShape.Position[0].length; i++) {
      game.activeShape.Position[0][i][0] = game.activeShape.Position[newOre][i][0];
      game.activeShape.Position[0][i][1] = game.activeShape.Position[newOre][i][1];
    }
    render("draw"); // Color the new updated position
  }
}