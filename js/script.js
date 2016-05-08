var go = document.getElementsByTagName('input');
var go2 = go[0];
go2.addEventListener("click", start);

function start () {
  document.getElementById('go').className = "hide";
  console.log('started');
  document.getElementById('text-area').className = "";
  raceOn();
}

function raceOn () {
  document.addEventListener('keyup', itemKeypress); // listen if any key is pressed
}

function itemKeypress(event)                  //check if valid key is pressed.
{
  if (event.which === 97 || event.which ===65) //key "a"=97/65 to update player 1 position
  {
    updatePlayerPosition(1);
  }
  else if (event.which ===108 || event.which ===76) // "l" =108/76 for player 2 position
  {
    updatePlayerPosition(2);
  }
}

function updatePlayerPosition (playerNum)
{
  var track = document.getElementById('player' + playerNum + '_strip')
  var currentPosition = document.getElementsByClassName('active' + playerNum)
  var newPosition = track.cells[currentPosition[0].cellIndex + 1]
  
  winner(newPosition, currentPosition, playerNum) 

  currentPosition[0].className = '' 
  newPosition.className = 'active' + playerNum
 
}

function winner(newPosition, currentPosition, playerNum)
{
  if(newPosition === undefined)
  {
    var active ='active' + playerNum
    currentPosition[0].className.replace(active , 'finish')
    alert('Player ' + playerNum + ' Wins!')
    window.location.reload()
  }
}
