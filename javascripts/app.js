function start(){
  var rover = buildRover("N",0,0);
  var rover2 = buildRover("S",0,9);
  var roverBoard = buildRoverBoard();
  var commandsListForRover = "rfrffffrflf";
  commands(commandsListForRover,rover,roverBoard);
  console.log(`ROVER final Value after execute commands:
   position: ${rover.y},${rover.x} 
   direction: ${rover.direction}`);
}

function buildRover(direction,x,y){
   var rover = {
    direction: direction,
    x: x,
    y: y,
    travelLog: [],
	}
	return rover;
}


function buildRoverBoard(){
  //build table 10x10 the rover will move in this table. I enter obstacles in this tale with "O"
  var roverBoard = new Array(10);
  for (var y = 0; y < 10; y++){
    roverBoard[y] = new Array(10);
    for(var x = 0; x < 10; x++){
      roverBoard[y][x] = null;
    }
  }
  roverBoard[0][2] = "O";
  roverBoard[0][4] = "O";
  roverBoard[1][2] = "O";
  roverBoard[4][0] = "O";
  return roverBoard;
}

function commands(commandsListForRover,rover,roverBoard){
  for(i=0;i<commandsListForRover.length;i++){
    console.log('------------------ movement ------------------');
    console.log(`Command: ${commandsListForRover[i]}`)
    switch(commandsListForRover[i]){
      case "f":
        moveForward(rover,roverBoard);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "b":
        moveBackwards(rover,roverBoard);
        break;
      default:
        i=commandsListForRover.length;
        console.log("Execution Stopped. Command not found! Enter: f (forward),l (turn left), r (turn right), b (backwards).");
        break;
    } 
   
  }
  console.log('------------------ movements finalized ------------------');
  rover.travelLog.forEach(
    function(track){
      console.log(track); //when the rover finish your movements. We print all places where rover have been
    }
  );
}

function turnLeft(rover){
  switch (rover.direction){
    case "N":    
    rover.direction = "W";
    break;
    case "S":
    rover.direction = "E";
    break;
    case "E":
    rover.direction = "N";
    break;
    case "W":
    rover.direction = "S";
    break;
  }
  console.log(`Turn Left. Current direction: ${rover.direction}`);
}

function turnRight(rover){
  switch (rover.direction){
    case "N":
    rover.direction = "E";
    break;
    case "S":
    rover.direction = "W";
    break;
    case "E":
    rover.direction = "S";
    break;
    case "W":
    rover.direction = "N";
    break;
  }
  console.log(`Turn Right. Current direction: ${rover.direction}`);
}


function isObstacle(x,y,roverBoard)
{
  if( roverBoard[y][x] === "O" ) {
    console.log(`WARNING: Stop! Obstacle or Other Rover at ${y},${x} position. Change rover´s direction.`);
    return true;
  }else{
  	return false;
  }
}


function moveForward(rover,roverBoard)
{
  var newXPosition = rover.x;
  var newYPosition = rover.y;
  switch(rover.direction){
    case "N":
      if(rover.y === 0){
        console.log("Edge reached! Change rover´s direction.");
      }else{
        newYPosition -=1;
      }
    break;
    case "S":
      if(rover.y === 9){
        console.log("Edge reached! Change rover´s direction.");     
      }else{
        newYPosition +=1;
      }
    break;
    case "W":
      if(rover.x === 0){
        console.log("Edge reached! Change rover´s direction."); 
      }else{
        newXPosition -=1;
      }
    break;
    case "E":
      if(rover.x === 9){
        console.log("Edge reached! Change rover´s direction.");
      }else{
        newXPosition +=1;
      }
    break
  }
  
  if(!isObstacle(newXPosition,newYPosition,roverBoard)){
    //After each move, push the coordinates of the previous space to the travelLog array. 
    rover.travelLog.push(`---ROVER LOG: Rover Passed by ${rover.y}, ${rover.x}`);
    rover.y = newYPosition;
    rover.x = newXPosition; 
    rover.travelLog.push(`Current Location ${rover.y},${rover.x}`);
  }
   //After each movement, console.log the rover’s coordinates so you can see where it is positioned.
  console.log(`Current Location: ${rover.y},${rover.x}`)
}

function moveBackwards(rover,roverBoard){
  
  var newXPosition = rover.x;
  var newYPosition = rover.y;
  switch(rover.direction){
    case "N":
      if(rover.y === 9){
        console.log("Edge reached! Change rover´s direction.");
      }else{
        newYPosition +=1;
      }
    break;
    case "S":
      if(rover.y === 0){
        console.log("Edge reached! Change rover´s direction.");
      }else{
        newYPosition -=1;
      }
    break;
    case "W":
      if(rover.x === 9){
        console.log("Edge reached! Change rover´s direction.");  
      }else{
        newXPosition +=1;
      }
    break;
    case "E":
      if(rover.x === 0){
        console.log("Edge reached! Change rover´s direction.");  
      }else{
        newXPosition -=1;
      }
    break;    
  }
  
  if(!isObstacle(newXPosition,newYPosition,roverBoard)){
    //After each move, push the coordinates of the previous space to the travelLog array. 
    rover.travelLog.push(`---ROVER LOG: Rover Passed by ${rover.y}, ${rover.x}`);
    rover.y = newYPosition;
    rover.x = newXPosition;
    //After each movement, console.log the rover’s coordinates so you can see where it is positioned. 
    rover.travelLog.push(`Current Location: ${rover.y},${rover.x}`);
  }
}