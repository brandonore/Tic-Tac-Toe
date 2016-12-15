var module = (function (){

  /*
  |--------------------------------------------------------------------------
  | Declare Initial Variables, store strings for reference
  |--------------------------------------------------------------------------
  */
  var player1 = '#player1';
  var player2 = '#player2';
  var oSVG = 'url("img/o.svg")';
  var xSVG = 'url("img/x.svg")';
  var p1Fill = 'box-filled-1';
  var p2Fill = 'box-filled-2';

  var sWin = '.screen-win';
  var sWinOne = 'screen-win-one';
  var sWinTwo = 'screen-win-two';
  var sWinTie = 'screen-win-tie';

  // Keep track of how many boxes are filled
  var boxCount = 0;

  // Assign li items to array for reference
  var bArray = [];
  $('.box').each(function(){
    bArray.push($(this));
  });

  /*
  |--------------------------------------------------------------------------
  | Initialize game
  |--------------------------------------------------------------------------
  */

  // Hide element on page load
  $(sWin).hide();

  // Call start property from Tic Object
  $('#start').find('.button').click(function(){
    Tic.startGame();
  });

  // Check which box is clicked and assign 'this' to a variable
  // Call playerClick property and pass in 'this' for reference
  $('.box').click(function(){
    var clicked = this;
    Tic.playerClick(clicked);
  });

  /*
  |--------------------------------------------------------------------------
  | Create Tic Object, properties and functions
  |--------------------------------------------------------------------------
  */

  var Tic = {

    // Start game
    startGame: function(){
      $('#start').hide();
      $(player1).addClass('active');
      Tic.playerHover();
    },

    // Initialize board for new play
    reset: function() {
      $(sWin).removeClass('screen-win-one screen-win-two screen-win-tie');
      $(sWin).hide();
      $('.board').show();
      boxCount = 0;
      // Loop through box array and remove fill classes
      for(var i = 0; i < bArray.length; i++) {
        bArray[i].removeClass(p1Fill);
        bArray[i].removeClass(p2Fill);
      }
      // Set Player 1 to active on game reset
      $(player2).removeClass('active');
      $(player1).addClass('active');
      Tic.playerHover();
    },

    // Player 1 win
    player1Win: function() {
      $('.board').hide();
      $('.message').html('<h4>Winner</h4>');
      $(sWin).removeClass(sWinTwo).addClass(sWinOne).show();
      $(sWin).find('.button').click(function(){
        Tic.reset();
      });
    },

    // Player 2 win
    player2Win: function() {
      $('.board').hide();
      $('.message').html('<h4>Winner</h4>');
      $(sWin).removeClass(sWinOne).addClass(sWinTwo).show();
      $(sWin).find('.button').click(function(){
        Tic.reset();
      });
    },

    // Tie game screen
    tieGame: function() {
      $('.board').hide();
      $('.message').html('<h4>It\'s a Tie!</h4>');
      $(sWin).removeClass('screen-win-one screen-win-two').addClass(sWinTie).show();
      $(sWin).find('.button').click(function(){
        Tic.reset();
      });
    },

    // Player mouse hover
    playerHover: function(clicked) {
      $('.boxes li').hover(function(){
        if($(player1).hasClass('active') && !$(this).hasClass(p2Fill)) {
          $(this).css('background-image', oSVG);
        } else if ($(player2).hasClass('active') && !$(this).hasClass(p1Fill)) {
          $(this).css('background-image', xSVG);
        }
      }, function(){
        $(this).removeAttr('style');
      });
    },

    // Change player turn
    changeTurn: function(clicked) {
      if($(player1).hasClass('active')) {
        $(player1).removeClass('active');
        $(player2).addClass('active');
      } else if ($(player2).hasClass('active')) {
        $(player2).removeClass('active');
        $(player1).addClass('active');
      }
    },

    // Player click
    playerClick: function(clicked) {
      if($(clicked).hasClass(p1Fill) || $(clicked).hasClass(p2Fill)) {
        return;
      }
      if($(player1).hasClass('active') && !$(clicked).hasClass(p1Fill)) {
        $(clicked).addClass(p1Fill);
        Tic.changeTurn();
      } else if($(player2).hasClass('active') && !$(clicked).hasClass(p2Fill)) {
        $(clicked).addClass(p2Fill);
        Tic.changeTurn();
      }
      boxCount += 1;
      if(boxCount >= 5) {
        Tic.checkWin();
      }
    },

  /*
  |--------------------------------------------------------------------------
  | Check outcome and determine winner
  |--------------------------------------------------------------------------
  */
    checkWin: function() {
      // Player 1 Horizontal
      if(bArray[0].hasClass(p1Fill) && bArray[1].hasClass(p1Fill) && bArray[2].hasClass(p1Fill)) {
        Tic.player1Win();
      } else if(bArray[3].hasClass(p1Fill) && bArray[4].hasClass(p1Fill) && bArray[5].hasClass(p1Fill)) {
        Tic.player1Win();
      } else if(bArray[6].hasClass(p1Fill) && bArray[7].hasClass(p1Fill) && bArray[8].hasClass(p1Fill)) {
        Tic.player1Win();
      // Player 1 Vertical
      } else if(bArray[0].hasClass(p1Fill) && bArray[3].hasClass(p1Fill) && bArray[6].hasClass(p1Fill)) {
        Tic.player1Win();
      } else if(bArray[1].hasClass(p1Fill) && bArray[4].hasClass(p1Fill) && bArray[7].hasClass(p1Fill)) {
        Tic.player1Win();
      } else if(bArray[2].hasClass(p1Fill) && bArray[5].hasClass(p1Fill) && bArray[8].hasClass(p1Fill)) {
        Tic.player1Win();
      // Player 1 Diagonal
      } else if(bArray[0].hasClass(p1Fill) && bArray[4].hasClass(p1Fill) && bArray[8].hasClass(p1Fill)) {
        Tic.player1Win();
      } else if(bArray[2].hasClass(p1Fill) && bArray[4].hasClass(p1Fill) && bArray[6].hasClass(p1Fill)) {
        Tic.player1Win();
      }
      //Player 2 Horizontal
      if(bArray[0].hasClass(p2Fill) && bArray[1].hasClass(p2Fill) && bArray[2].hasClass(p2Fill)) {
        Tic.player2Win();
      } else if(bArray[3].hasClass(p2Fill) && bArray[4].hasClass(p2Fill) && bArray[5].hasClass(p2Fill)) {
        Tic.player2Win();
      } else if(bArray[6].hasClass(p2Fill) && bArray[7].hasClass(p2Fill) && bArray[8].hasClass(p2Fill)) {
        Tic.player2Win();
      // Player 2 Vertical
      } else if(bArray[0].hasClass(p2Fill) && bArray[3].hasClass(p2Fill) && bArray[6].hasClass(p2Fill)) {
        Tic.player2Win();
      } else if(bArray[1].hasClass(p2Fill) && bArray[4].hasClass(p2Fill) && bArray[7].hasClass(p2Fill)) {
        Tic.player2Win();
      } else if(bArray[2].hasClass(p2Fill) && bArray[5].hasClass(p2Fill) && bArray[8].hasClass(p2Fill)) {
        Tic.player2Win();
      // Player 2 Diagonal
      } else if(bArray[0].hasClass(p2Fill) && bArray[4].hasClass(p2Fill) && bArray[8].hasClass(p2Fill)) {
        Tic.player2Win();
      } else if(bArray[2].hasClass(p2Fill) && bArray[4].hasClass(p2Fill) && bArray[6].hasClass(p2Fill)) {
        Tic.player2Win();
      }
      // If all boxes are filled, call tieGame();
      if(boxCount === 9 && bArray[0].hasClass(p1Fill) && bArray[4].hasClass(p1Fill) && bArray[8].hasClass(p1Fill)) {
        Tic.player1Win();
      } else if(boxCount === 9 && bArray[2].hasClass(p1Fill) && bArray[4].hasClass(p1Fill) && bArray[6].hasClass(p1Fill)) {
        Tic.player1Win();
      } else if(boxCount === 9 && bArray[0].hasClass(p2Fill) && bArray[4].hasClass(p2Fill) && bArray[8].hasClass(p2Fill)) {
        Tic.player2Win();
      } else if(boxCount === 9 && bArray[2].hasClass(p2Fill) && bArray[4].hasClass(p2Fill) && bArray[6].hasClass(p2Fill)) {
        Tic.player2Win();
      } else if(boxCount === 9) {
        Tic.tieGame();
      }
    }
  }

})();
