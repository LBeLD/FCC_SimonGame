$(document).ready(function() {
  console.clear();
  var colors = ['green', 'red', 'blue', 'yellow'],
      progressComputer = [],
      progressPlayer = [],
      x = 0, //index to track user's progress
      y = 0, //index to track computer's progress
      counter = 1, //round counter
      buttonSong = [
        new Audio('sounds/1.mp3'),
        new Audio('sounds/2.mp3'),
        new Audio('sounds/3.mp3'),
        new Audio('sounds/4.mp3'),
      ],
      errorSong = new Audio('sounds/error.mp3'),
      youWin = new Audio('sonds/youwin.mp3'),
      onButton = false,
      start = false,
      strictButton = false;

  //disable start and strict button on page load
  $('#startButton').css('cursor', 'auto');
  $('#startButton').prop('disabled', true);
  $('#strictButton').css('cursor', 'auto');
  $('#strictButton').prop('disabled', true);
  $('.quarterCircle').css('cursor', 'auto');
  $('.quarterCircle').prop('disabled', true);

  //toggle on off button
  $('#offButton').click(function(){
    $('#offButton').css('background-color', '#1b191c');
    $('#onButton').css('background-color', '#1c8cf4');
    $('#offButton').css('cursor', 'auto');
    $('#onButton').css('cursor', 'pointer');
    $('#displayText').text('- -');
    $('#startButton').css('cursor', 'pointer');
    $('#startButton').prop('disabled', false);
    $('#strictButton').css('cursor', 'pointer');
    $('#strictButton').prop('disabled', false);
    onButton = true;
  });

  //reload page when off button is toggled
  $('#onButton').click(function(){
    location.reload();
  });

//strict button on
  $('#strictButton').click(function(){
    //check if the game is on, strict mode cannot be triggered in the middle of a game
    if(!start){
      if(strictButton){
        strictButton = false;
        $('#light').css('background-color', 'black');
      } else {
        strictButton = true;
        $('#light').css('background-color', 'red');
      }
    }
  });

//start button pushed
  $('#startButton').click(function(){
    start=true;
    $('.quarterCircle').css('cursor', 'pointer');
    $('.quarterCircle').prop('disabled', false);
    $('#strictButton').css('cursor', 'auto');
    $('#strictButton').prop('disabled', true);
    resetGame();
    randomValue();
    setTimeout(computerPlay,1000);
  });

  //click function to check player progress
  $('.quarterCircle').click(function(){
    //check if game is on and if start button was pushed
    if(onButton && start){
      changeColor(this);
      progressPlayer.push($(this).attr('id'));
      //check if it is player's last move and if it is correct
      if(progressPlayer.length === progressComputer.length && progressPlayer[progressPlayer.length-1]===progressComputer[progressComputer.length-1]){
        progressPlayer = [];
        counter++;
        //check if counter is equal to 20, if not continue the game
          if(counter < 21){
            randomValue();
            x=0;
            y=0;
            setTimeout(computerPlay, 1500);
            // else show WIN message, play win song and restart the game
          } else {
            $('#displayText').html('WIN');
            youWin.play();
            resetGame();
            randomValue();
            x=0;
            y=0;
            setTimeout(computerPlay, 3000);
          }
          // if move is correct and it is not the last one, add one more move to the index counter
      } else if (progressPlayer[x] === progressComputer[y]) {
        x++;
        y++;
        // if move is wrong, check if strict mode is on
      } else {
          //if not, repeat tones
          if(!strictButton){
            $('#displayText').html('! !');
            errorSong.play();
            progressPlayer = [];
            x=0;
            y=0;
            setTimeout(computerPlay, 3000);
            // else restart the game
          } else {
            $('#displayText').html('! !');
            errorSong.play();
            resetGame();
            randomValue();
            setTimeout(computerPlay, 3000);
          }
      }
    }
  });

// ********** FUNCTIONS **********

//create random index numbers (0 to 3) and take colors from colors array than push it to progressComputer
function randomValue () {
  var random = Math.floor(Math.random()*4);
  progressComputer.push(colors[random]);
  }

//color blink and play tone on click
function changeColor(clicked){
  if($(clicked).attr('id')==='green'){
      buttonSong[0].play();
      $(clicked).addClass('newgreen');
      setTimeout(function(){
        $(clicked).removeClass('newgreen');
      },200);
    } else if ($(clicked).attr('id')==='red'){
      buttonSong[1].play();
      $(clicked).addClass('newred');
      setTimeout(function(){
        $(clicked).removeClass('newred');
      },200);
    } else if ($(clicked).attr('id')==='blue'){
      buttonSong[2].play();
      $(clicked).addClass('newblue');
      setTimeout(function(){
        $(clicked).removeClass('newblue');
      },200);
    } else if ($(clicked).attr('id')==='yellow'){
      buttonSong[3].play();
      $(clicked).addClass('newyellow');
      setTimeout(function(){
        $(clicked).removeClass('newyellow');
      },200);
    }
  }

//color blink and play song when computer plays
function changeColorAuto(color){
  if(color === 'green'){
    buttonSong[0].play();
    $('#green').addClass('newgreen');
      setTimeout(function(){
        $('#green').removeClass('newgreen');
      },200);
  } else if (color === 'red'){
    buttonSong[1].play();
    $('#red').addClass('newred');
      setTimeout(function(){
        $('#red').removeClass('newred');
      },200);
  } else if (color === 'blue'){
    buttonSong[2].play();
    $('#blue').addClass('newblue');
      setTimeout(function(){
        $('#blue').removeClass('newblue');
      },200);
  } else if (color === 'yellow'){
    buttonSong[3].play();
    $('#yellow').addClass('newyellow');
      setTimeout(function(){
        $('#yellow').removeClass('newyellow');
      },200);
  }
}

//computer play function
function computerPlay(){
  //forEach function to loop through progressComputer array
  $.each(progressComputer, function(index, el) {
    //setTimeout to run interations every 1 sec
    setTimeout(function(){
      if(el === 'green'){
        changeColorAuto('green');
      } else if (el=='red') {
        changeColorAuto('red');
      } else if (el === 'blue') {
        changeColorAuto('blue');
      } else if (el==='yellow') {
        changeColorAuto('yellow');
      }
    }, index * 1000);
  });
  $('#displayText').text(counter);
}

//function to reset game values;
function resetGame(){
  counter=1;
  progressPlayer=[];
  progressComputer=[];
  x=0;
  y=0;
}
});
