const game = {
  started:false,
  upcomingBlock: {
    Position:[],
    Color:"",
    Type:"",
  },
  maxCol: 10, // Defines the maximum columns.
  maxRow: 20, // Defines the maximum rows.
  grid: [], // First index is the x coordinate, second is the y, then 0 = true or false and 1 = color. So grid[x][y][0] returns true or false and grid[x][y][1] returns the color.
  shapeL:{ // Default values for L shape
    Position:[
      [[3,1],[4,1],[5,1],[5,0]], // Active position. Array structure is Position[1][2][0] -> 1 refers to first orientation, 2 refers to the second piece of the shape in that orienation and 0 points to the x coordinate.
      [[3,1],[4,1],[5,1],[5,0]], // Orientation 1
      [[4,0],[4,1],[4,2],[5,2]], // Orientation 2
      [[5,1],[4,1],[3,1],[3,2]], // Orienation 3
      [[4,2],[4,1],[4,0],[3,0]], // Orientation 4
    ], 
    Orientation: 1, // Holds the orientation of the shape.
    Color: "rgb(100%,43.1%,2.7%)", // Holds the color of the objects; used to color the grid.
  },
  shapeJ:{ // Default values for J shape
    Position:[
      [[3,0],[3,1],[4,1],[5,1]], // Active position. Array structure is Position[1][2][0] -> 1 refers to first orientation, 2 refers to the second piece of the shape in that orienation and 0 points to the x coordinate.
      [[3,0],[3,1],[4,1],[5,1]], // Orientation 1
      [[5,0],[4,0],[4,1],[4,2]], // Orientation 2
      [[5,2],[5,1],[4,1],[3,1]], // Orienation 3
      [[3,2],[4,2],[4,1],[4,0]], // Orientation 4
    ], 
    Orientation: 1, // Holds the orientation of the shape.
    Color: "rgb(0, 0, 255)", // Holds the color of the objects; used to color the grid.
  },
  shapeT:{ // Default values for J shape
    Position:[
      [[3,1],[4,1],[5,1],[4,0]], // Active position. Array structure is Position[1][2][0] -> 1 refers to first orientation, 2 refers to the second piece of the shape in that orienation and 0 points to the x coordinate.
      [[3,1],[4,1],[5,1],[4,0]], // Orientation 1
      [[4,0],[4,1],[4,2],[5,1]], // Orientation 2
      [[3,1],[4,1],[5,1],[4,2]], // Orienation 3
      [[4,2],[4,1],[4,0],[3,1]], // Orientation 4
    ], 
    Orientation: 1, // Holds the orientation of the shape.
    Color: "rgb(255, 255, 93)", // Holds the color of the objects; used to color the grid.
  },
  shapeO:{ // Default values for J shape
    Position:[
      [[4,0],[5,0],[4,1],[5,1]], // Active position. Array structure is Position[1][2][0] -> 1 refers to first orientation, 2 refers to the second piece of the shape in that orienation and 0 points to the x coordinate.
      [[4,0],[5,0],[4,1],[5,1]], // Orientation 1
    ], 
    Orientation: 1, // Holds the orientation of the shape.
    Color: "rgb(166, 82, 255)", // Holds the color of the objects; used to color the grid.
  },
  shapeI:{ // Default values for J shape
    Position:[
      [[3,1],[4,1],[5,1],[6,1]], // Active position. Array structure is Position[1][2][0] -> 1 refers to first orientation, 2 refers to the second piece of the shape in that orienation and 0 points to the x coordinate.
      [[3,1],[4,1],[5,1],[6,1]], // Orientation 1
      [[5,0],[5,1],[5,2],[5,3]], // Orientation 2
      [[3,2],[4,2],[5,2],[6,2]], // Orientation 3
      [[4,0],[4,1],[4,2],[4,3]], // Orientation 4
    ], 
    Orientation: 1, // Holds the orientation of the shape.
    Color: "rgb(166, 244, 255)", // Holds the color of the objects; used to color the grid.
  },
  activeShape:{},
  bgColor:"rgba( 255, 255, 255, 0.25 )",
  highestRow:21, // Used to store the highest row that's occupied to prevent unnecessarily checking a bunch of empty rows. Set to one more than the maximum row.
}

// Grid generation. Since it generates left to right we start iterating through each ROW and generate COLUMNS before moving to the next row.
window.onload = function() {
  let container = document.getElementById('container');
  for (let x = 0; x < game.maxCol; x++) { // Populates each column with 20 rows. Has to be declared outside the loop that populates their values other it overwrights each column every iteration.
    game.grid[x] = new Array(game.maxRow);
  }  
  for (let y = 0; y < game.maxRow; y++) {
    for (let x = 0; x < game.maxCol; x++) {
      let elem = document.createElement('div');
      container.appendChild(elem);
      elem.setAttribute('data-x', x);
      elem.setAttribute('data-y', y);
      elem.setAttribute("onClick","test2(this)"); // remove this test functionality later
      game.grid[x][y] = [false,game.bgColor];
    }
  }
}

// Key press functionality
document.addEventListener("keydown", event => {
  if (event.code === "ArrowLeft" && !collisionCheck(game.activeShape.Position[0],"left")) {
      moving("left");
  } else if(event.code === "ArrowRight" && !collisionCheck(game.activeShape.Position[0],"right")) {
    moving("right");
  } else if(event.code === "ArrowDown" && !collisionCheck(game.activeShape.Position[0],"fall")) {
    moving("fall");
  } else if(event.code === "ArrowUp") {
    flipShape("right");
  } else if(event.code === "Digit0") {
    console.log("Triggered");
    flipShape("left");
  }
});

function generateUpcoming() {
  renderUpcoming("undraw");
  const randomNum = Math.floor(Math.random()*((7+1)-1)+1);
  switch(randomNum) {
    case 1:
      game.upcomingBlock.Type = "L";
      game.upcomingBlock.Color = game.shapeL.Color;
      game.upcomingBlock.Position = [3,7,6,5];
      break;

    case 2:
      game.upcomingBlock.Type = "J";
      game.upcomingBlock.Color = game.shapeJ.Color;
      game.upcomingBlock.Position = [2,6,7,8];
      break;

    case 3:
      game.upcomingBlock.Type = "T";
      game.upcomingBlock.Color = game.shapeT.Color;
      game.upcomingBlock.Position = [3,6,7,8];
      break;
  }
  renderUpcoming("draw");
}

// Test functionality
function test2(ele) {
  let x = ele.getAttribute("data-x");
  let y = ele.getAttribute("data-y");
  console.log(`X: ${ele.getAttribute("data-x")}`);
  console.log(`Y: ${ele.getAttribute("data-y")}`);
  console.log(`The color of this grid is ${game.grid[x][y][1]}`);
}

// Spawn testing functionality.
function test() {
  game.activeShape = structuredClone(game.shapeI);
  render("draw");
}

function spawnShape() {
  // structured copy on the chosen shape based on the game.upcomingBlock.Type value, likely with a switch
  // color the board with the starting position by calling render("draw")
  // start the interval for the falling movement. Call it game.fallInterval
  // call the generateUpcoming function to get a new upcoming block
}

function flipShape(flipDir) {
  let newOre = 0;
  const lastOre = game.activeShape.Position.length-1;
  const currentOre = game.activeShape.Orientation;
  if(lastOre === 1) return;
  if(flipDir === "left" && currentOre === 1 && !collisionCheck(game.activeShape.Position[lastOre],"flip")) {
    newOre = lastOre;
  } else if(flipDir === "left" && currentOre !== 1 && !collisionCheck(game.activeShape.Position[currentOre-1],"flip")) {
    newOre = currentOre - 1;
  } else if(flipDir === "right" && currentOre === lastOre && !collisionCheck(game.activeShape.Position[1],"flip")) {
    newOre = 1;
  } else if(flipDir === "right" && currentOre !== lastOre && !collisionCheck(game.activeShape.Position[currentOre+1],"flip")) {
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

// Renders or undraws the currently active shape
function render(a) {
  let renderColor;
  if(a === "draw") {
    renderColor = game.activeShape.Color;
  } else if(a === "undraw") {
    renderColor = game.bgColor;
  } else {
    console.log("Render function called with improper parameter.");
  }
  for(let i=0; i<game.activeShape.Position[0].length; i++){
    const x = game.activeShape.Position[0][i][0];
    const y = game.activeShape.Position[0][i][1];
    const selector = `[data-x="${x}"][data-y="${y}"]`;
    const targetDiv = document.querySelector(selector);
    game.grid[x][y][1] = renderColor;
    targetDiv.style.backgroundColor = renderColor;
  }
}

function renderUpcoming(b) {
  if(b === "draw") {
    thisColor = game.upcomingBlock.Color;
  } else if(b === "undraw") {
    thisColor = game.bgColor;
  }
  game.upcomingBlock.Position.forEach(divID => {
    const divElement = document.getElementById(`${divID}`);
    divElement.style.backgroundColor = thisColor;
  });
}

function moving(dir) {
  render("undraw"); // Undraws the current location before updating its corrdinates.
  for(i=0; i<game.activeShape.Position.length; i++) { // Loops through each shape's orientation, including the active one
    for(b=0; b<game.activeShape.Position[0].length; b++){ // loops through each orientation's parts
      if(dir === "right") {
        game.activeShape.Position[i][b][0] += 1; // Sets every part of every orientation to the row right of it. i = orienation, b = part, 0 is x and 1 is y
    } else if(dir === "left" ) {
        game.activeShape.Position[i][b][0] -= 1; // Sets every part of every orientation to the row left of it.
    } else if(dir === "fall") {
        game.activeShape.Position[i][b][1] += 1; // Sets every part of every orientation to the row below it.
    }
  }
  render("draw"); // Draws the new location after the coordinates are updated.
  }
}

function collisionCheck(newPos, action) {
  for(let i=0; i<newPos.length; i++) {
    const x = newPos[i][0];
    const y = newPos[i][1];
    if(action === "fall" && (y === 19 || game.grid[x][y+1][0] === true)) {
      settleShape();
      return true; // collision is true
    } else if(action === "left" && (x === 0 || game.grid[x-1][y][0] === true)) {
      return true; // collision is true
    } else if(action === "right" && (x === 9 || game.grid[x+1][y][0] === true)) {
      return true; // collision is true
    } else if(action === "flip" && (x < 0 || x >= game.maxCol || y < 0 || y >= game.maxRow || game.grid[x][y][0] === true)) {
      return true; // invalid flip orientation because it's either off the grid or occupies an already occupied location.
    }
  }
  return false;
}

function settleShape(){
  const lowestRow = game.activeShape.Position[0][0][1]; // Sets up the variable for holding the lowest row that the shape occupies.
  for(let i=0; i<game.activeShape.Position[0].length; i++){ // Iterate through the active position's shape pieces.
    if(game.activeShape.Position[0][i][1] > lowestRow) { // If the current piece of the shape is on a lower row than the previous
      lowestRow = game.activeShape.Position[0][i][1]; // then update to the lowest row
    }
    if(game.activeShape.Position[0][i][1] < game.highestRow) { // If the currently checked shape piece is on a higher row than the highest logged row
      game.highestRow = game.activeShape.Position[0][i][1]; // then update the highestRow
    }
    const x = game.activeShape.Position[0][i][0];
    const y = game.activeShape.Position[0][i][1];
    game.grid[x][y][0] = true;
    game.grid[x][y][1] = game.activeShape.Color;
  }
  // stop the falling movement interval
  Object.keys(game.activeShape).forEach(key => delete game.activeShape[key]); // Clears the activeShape object
  checkRows(lowestRow,game.highestRow-1); // Starts checking rows starting from the lowest row the shape occupies and stops before highestRow-1.
  // call the function to spawn the upcoming shape spawnShape()
}

async function checkRows(startHere, stopHere) {
  console.log(`Check row triggered to check row ${startHere} and stopping before row ${stopHere} `);
  for(let y=startHere; y>stopHere; y--) {
    // Use stopHere to allow recursive calling of this function while only checking some rows instead of having to iterate over them all multiple times. -1 to check all, 18 to check only bottom row.
    // for loop to iterate through each column
    for(let x=0; x < game.maxCol; x++) {
      if(game.grid[x][y][0] === false) { 
        break; // If any of the grid cells on the row are empty, we stop looping this row and move on.
      } else if(game.grid[x][y][0] === true && x === 8) { // If the last grid cell on row (19) is true, then that means all were true
        await clearRows(y);
      }
    }
  }
}

async function clearRows(row) { // Row is the row that needs to be cleared.
  console.log(`Clearing row ${row}`);
  for(let i=0; i<game.maxCol; i++) { // i iterates through the columns
    let x = i; // for better readability
    let y = row;
    let selector = `[data-x="${x}"][data-y="${y}"]`;
    let targetDiv = document.querySelector(selector);
    game.grid[x][y][0] = false;
    game.grid[x][y][1] = game.bgColor;
    targetDiv.style.backgroundColor = "gold"; // Uncolors the cleared row
    await delay(20); // for animation effect
    targetDiv.style.backgroundColor = game.bgColor;
  }
  for(let a=row-1; a>=0; a--) {  // bring all shapes down by iterating through every row going up, starting at "row-1" (the row above the row that was cleared) and clearing each occupied cell then pushing it's values to the one cell below it.
    for(let b=0; b<game.maxCol; b++) {
      y = a;
      x = b;
      console.log(`Bringing down objects on column ${x} from row ${y} down to row ${y+1}`);
      if(game.grid[x][y][0] === true) {
        selector = `[data-x="${x}"][data-y="${y}"]`;
        targetDiv = document.querySelector(selector);
        let selector2 = `[data-x="${x}"][data-y="${y+1}"]`;
        let targetDiv2 = document.querySelector(selector2);
        game.grid[x][y][0] = false;
        game.grid[x][y+1][0] = true;
        game.grid[x][y+1][1] = game.grid[x][y][1]; // Sets the color
        game.grid[x][y][1] = game.bgColor;
        targetDiv.style.backgroundColor = game.bgColor;
        targetDiv2.style.backgroundColor = game.grid[x][y+1][1];
      }
    }
  }
  await checkRows(row,row-1); // recursively calls clearRows(row,row-1), since you call it to start at "row" and stop before "row-1", you're only checking the cleared row again in case it needs to be recleared while avoiding iterating through all the rows
}

// function to allow async and allow for a clearing animation not to interfere with the animation that brings shapes down a row
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}