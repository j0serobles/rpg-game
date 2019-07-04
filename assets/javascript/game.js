 // GLOBALS:global variables

 function UI() {

  this.blaster           = document.getElementById("blaster"); 
  

  
  if (currentGame.gameState === "notStarted") {
    //Show all characters in characters[] array:
    for (var i = 0; i < characters.length; i++) {
    //Add  the img_frame element, like this:
    //  <div id="img_frame" class="text-center border border-dark mx-3">
    //     <img src="assets/images/vader.jpg" alt="Characters"> 
    //     <p class="health_points text-dark m-0">150</p>
    //  </div>
    $("#characters_list").append('<div class="img_frame text-center border border-dark mx-3">' +
                                 '<img src="' + characters[i].imageFile + '" alt="' + characters[i].name + '">' +
                                 '<p class="char_name text-dark -m0">' + 
                                  characters[i].name + '</p>' + 
                                 '<p class="health_points text-dark m-0">150</p></div>')
    }

    $( "#attackButton" ).hide();
  }



   this.updatePage = function() {

    // $("#score_span").text(currentGame.randomNumber);
    // $("#wins_div").text("Wins : "     + currentGame.wins); 
    // $("#losses_div").text("Losses : " + currentGame.losses); 
    // $("#user_score").text(currentGame.userScore);


      //Refresh the elements in the gameArea:
      if (currentGame.player !== null) {
        $("#currentPlayer").html('<div id="currentPlayer" class="img_frame text-center border border-dark mx-3">' +
                                  '<img src="' + currentGame.player.imageFile + '"alt="' +
                                   currentGame.player.name + '"><p class="health_points text-dark">' + 
                                   currentGame.player.hp + '</p></div>');
      $("#gameArea").show();
      }

      if (currentGame.opponent !== null) {

          $("#currentOpponent").html('<div id="currentOpponent" class="img_frame text-center border border-dark mx-3">' +
          '<img src="' + currentGame.opponent.imageFile + '"alt="' +
          currentGame.opponent.name + '"><p class="health_points text-dark">'  + 
          currentGame.opponent.hp + '</p></div>');

          $( "#characters" ).fadeOut("slow");
          
          $( "#attackButton" ).show();

      }

       
    if (currentGame.gameState == "ended") {

      $("#message_div").show(); 

      if (currentGame.userScore === currentGame.randomNumber) {
        $("#message_div").attr("class","bg-info"); 
        $("#message_div").text("You Won! Click any crystal to start a new game.");
      }
      else {
        $("#message_div").attr("class","bg-danger");
        $("#message_div").text("You lost! Click any crystal to start a new game.");
      }
    } 
    else 
    if (currentGame.gameState == "started") {
      // Hide Current Player from the character list area
      // Display the gameArea
      $("#gameArea").show();
      $("#message_div").hide(); 
    }
   }
 }
///////////////////////////////////////////////////////////////////////////
// Constructor for Game object.
// The Game() object has the attributes and methods needed
// for playing the Crystal collector game.
// Clicking any of the 4 crystals calls the playGame() function to keep 
// adding the points from the crystal to the user's running score. 
// The game ends when:
// -- The user arrives exactly at the points in game's random number (a win).
// -- The user surpasses the game's random number (a loss) .
///////////////////////////////////////////////////////////////////////////
function Game() {

  /////////////////////////
  // Attributes:
  /////////////////////////
  
  this.player = null;
  this.opponent =  null;
  this.attackCount = 1;
  this.gameState = "notStarted" ; // The game state.  Used for knowing when to start or end.
  this.wins           = 0;        // How many wins
  this.losses         = 0;        // How many losses


  ////////////////////////////////////////////
  // Sets the player
  this.setPlayer = function( index ) {
    this.player = characters[index]; 
    console.log(this.player); 
  }

  ///////////////////////////////////////////
  //Sets the opponent (fighter)
  this.setOpponent = function( index ) {
    this.opponent  = characters[index]; 
  }

  /////////////////////////////////////////////////////////////////////////////
  this.initGame =  function() {
    
   this.attackCount   = 1;  // Start with attack count = 1 so the player attack power
                            // never goes to 0
   this.wins          = 0 ;
   this.losses        = 0; 
   this.gameState     = "started";

   userInterface.updatePage();
  }
  /////////////////////////////////////////////////////////////////////////////
  this.attack = function() {

    userInterface.blaster.play(); 

    this.player.baseAttackPower = (this.player.baseAttackPower * this.attackCount);
    this.attackCount++;
    this.opponent.hp -= this.player.baseAttackPower;
    //Opponent counter-attacks immediately:
    this.player.hp -= this.opponent.baseAttackPower;

    if (this.player.hp <= 0) {

      //Player is dead.  End game
      this.gameState = "ended";
      this.player.hp = 0;
      alert( this.player.name + " looses!");
    }

    if (this.opponent.hp <= 0) {
      //Opponent is dead.  End Game
      this.gameState = "ended";
      this.opponent.hp = 0;
      alert( this.opponent.name + " looses!");
    }

    userInterface.updatePage(); 

  }

} // End Of Game() constructor


//CALLS:
/////////////////////////////////////////////////////////////////////////////////////////////
// When page is loaded, create the game and wait for a key input.

var currentGame = null;
var userInterface = null;

$( document ).ready(function() {

    console.log( "ready!" );


    currentGame   = new Game(); 
    userInterface = new UI(); 

    console.log("Current game:" + currentGame.gameState);
    console.log("userInterface:" + userInterface); 

    //Initially  hide the gameArea and deadCharacters divs
    
    $("#gameArea").hide();
    $("#deadCharacters").hide();
      
    
    $(".img_frame").on("click", function() {
      //Call selectPlayer() in the Game object, passing the value attribute from the image div clicked on.

      console.log("In on function for #img_grame");
      console.log("Current game:" + currentGame);
      console.log("userInterface:" + userInterface); 
    
      if (currentGame.player === null) {
        currentGame.setPlayer ( $(this).index() );
        $( "#choosePrompt" ).text("Choose an oponent: "); 
        userInterface.updatePage();
      }
      else if (currentGame.opponent === null) {
        currentGame.setOpponent( $(this).index() ); 
        userInterface.updatePage();
        currentGame.initGame(); 
      }
      else {
        console.log("Current game:" + currentGame);
        console.log("userInterface:" + userInterface); 
        console.log("did not set player nor opponent :" + currentGame.gameState + " " + currentGame.player); 
      }

    }); 

    console.log("Current game:" + currentGame);
    console.log("userInterface:" + userInterface); 



    $("#attackButton").on("click", function() {
      currentGame.attack(); 
    });


});