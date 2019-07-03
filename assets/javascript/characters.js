 // GLOBALS:global variables
// TODO: Implement multiple, user-selectable themes

// For the mutli-themed functionality, create an array of theme objects.
// This version uses only one theme. 

var characters = [{
                    name        : "Darth Vader",
                    imageFile   : "assets/images/vader.jpg",
                    description : "A really bad guy.  More machine than human.",
                    hp          : 150,
                    baseAttackPower  : 10
                  },
                {
                  name      : "Luke Skywalker",
                  imageFile : "assets/images/luke.jpg",
                  textInfo  : "Vader's son.  A Jedi knight.",
                  hp        : 150,
                  baseAttackPower : 6
                },
                {          
                  name      : "Han Solo",
                  imageFile : "assets/images/solo.jpg",
                  textInfo  : "A smuggler, captain of the Millenium Falcon.",
                  hp        : 150,
                  baseAttackPower : 6
                },
                {          
                  name      : "Boba-Fett",
                  imageFile : "assets/images/bobafett.jpg",
                  textInfo  : "Bounty hunter.",
                  hp        : 150,
                  baseAttackPower : 9
                } 
]