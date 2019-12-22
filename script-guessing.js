// In this module I have placed the events. 
var EventHandlers = (function () {

    // Declare and initialize two variables for managing the guessing game.
    // The first variable holds a random number. The second one serves as 
    // a counter variable to keep track of how many guesses the player has left.    

    const randomNumber = Math.floor((Math.random() * 100) + 1);
    let guessesLeft = 8; 

    // Initialize the events. The first two events change the color of the startbutton 
    // when the mouse moves over it. Since they demand so little code, 
    // I decided to create short, anonymous functions for them. 
    // The third event is a functionality for letting the user
    // start the game and the fourth event deals with the main event
    // in this game program: clicking the guessbutton. 

    function init() {

       
        $("#start-button").mouseover(function () {
            $(this).css("background", "#984b43");
        });

        $("#start-button").mouseout(function () {
            $(this).css("background", "#453653");
        });

        $("#start-button").click(onClickStartButton);

        $("#guess-button").click(onClickGuessButton);

        window.alert("This 'simple' guessing game I had to make for my exam in my JavaScript course at TUC. You needed to demonstrate that you could structure your code well in functions and modules and knew how to correctly" +
        " apply event handlers. (I used jQuery for that). I played around with amongst others hiding and showing elements, creating certain pauses/delays, and also building in checks for if the user entered invalid data.");
      
    }

    // Function that executes when clicking on OnClickStartButton
    // Hides the intro text and shows the guess button, inputfield and the game stats. 

    function onClickStartButton() { 
        DocumentEdit.editHeadline("Gissa ett tal mellan 1 och 100");
        $(".intro-elements").hide();
        $(".game-elements").show(1000)
    }

    // Function that executes when clicking on OnClickGuessButton
    function onClickGuessButton() {

        // Decrement the counter variable and adjust info on the webpage.
        guessesLeft--;
        DocumentEdit.editGuessesLeft(guessesLeft);

        // Store the number the user has guessed from the input field
        // into an input variable and then clear the input field. 
        // Before parsing the string into a number check 
        // if the input was done correctly.   

        const input = $("#guess-input").val();
        $("#guess-input").val("");

        let guessedNumber;

        if (GuessingGameHelper.checkValidInput(input)) {
            guessedNumber = Number(input);
            // Updates info on the webpage
            DocumentEdit.editLatestGuess(guessedNumber);
        }
        else {
            // Return from the function, but first increment the guesses left
            // and make sure the incremented number shows on the webpage. 
            guessesLeft++;
            DocumentEdit.editGuessesLeft(guessesLeft);
            return;
        }

        // Check if the player's guess is a win or if the player guessed too high
        // or too low. If there's a win congratulate. If the player guessed wrongly, 
        // but has no guesses left, communicate it's game over. 
        // If the game has ended, prevent the player from putting in more numbers. 

        if (guessedNumber === randomNumber) {
            DocumentEdit.displayAnswer(randomNumber);
            GuessingGameHelper.congratulatePLayer();
            $("#guess-button").attr("disabled", true);
            return;
        }
        else {
            if (guessesLeft === 0) {
                DocumentEdit.displayAnswer(randomNumber);
                GuessingGameHelper.communicatePlayersLoss();
                $("#guess-button").attr("disabled", true);
            }
            else if (guessedNumber > randomNumber) {
                GuessingGameHelper.communicateTryLower();
            }
            else {
                GuessingGameHelper.communicateTryHigher();
            }
        }
    }
    return {
        init
    }
})();

// In this module, I group together functions that deal with basic editing of the document. 
var DocumentEdit = (function () {

    // Create an init to hide a group of elements after loading the website
    function init() {
        
        $(".game-elements").hide();
         
    }

    // Function for changing the headline  
    function editHeadline(headline) {
        $("h1").text(headline);
    }

    // Function to help highlight text 
    // It has an element and a new color,
    // both in the form of string variables, as parameters. 

    function setElementColor(element, color) {
        $(element).css("color", color);
    }

    // Function to display how many guesses a player has left   
    function editGuessesLeft(number) {
        const textPlusNumber = "Gissningar kvar: " + number;
        $("#guesses-left").text(textPlusNumber);
    }

    // Function to display the correct answer
    function displayAnswer(number) {
        const textPlusNumber = "Rätta svaret: " + number;
        $("#correct-answer").text(textPlusNumber);
    }

    // Function to edit the latest guess.   
    function editLatestGuess(number) {
        const textPlusNumber = "Senaste gissningen: " + number;
        $("#latest-guess").text(textPlusNumber);
    }

    // Function to tell the player to refresh the website in order to play again.
    // I have build in a pause in order to not directly overwrite 
    // the previously displayed headline, which is either a message that the player
    // won or lost (see next module). 

    function playAgainBanner() {
        setTimeout(function () {
            DocumentEdit.setElementColor("h1", "#233237");
            editHeadline("Ladda om websidan om du vill spela igen.");
        }, 3000)
    }

    return {
        init,
        editHeadline,
        setElementColor,
        editGuessesLeft,
        displayAnswer,
        editLatestGuess,
        playAgainBanner
    }
})();

// I've created this extra module to save some space in the OnClickGuessButton-function
// and thereby make the code in the EventHandlers-module more pleasent to read. 
// The first function performs a control task and also notifies the player of 
// the incorrect input if needed. The other four functions group together 
// pure communication tasks.   

var GuessingGameHelper = (function () {

    // Function to check valid input
    function checkValidInput(input) {
        if (input === "" || isNaN(input)) {
            DocumentEdit.editHeadline("Det var inget nummer. Försök igen.");
            return false;
        }
        else if (input > 100 || input < 1) {
            DocumentEdit.editHeadline("Ogiltigt nummer. Försök igen");
            return false;
        }
        else {
            return true;
        }
    }

    // Function to instruct player to guess lower
    function communicateTryLower() {
        DocumentEdit.editHeadline("Tyvärr");
        // Without a timeout the next headline 
        // would immediately 'run over' the previous one...
        setTimeout(function () {
            DocumentEdit.editHeadline("Gissa lägre")
        }, 1000);
    }
    
    // Function to instruct player to guess higher
    function communicateTryHigher() {
        DocumentEdit.editHeadline("Tyvärr");
        setTimeout(function () {
            DocumentEdit.editHeadline("Gissa högre")
        }, 1000);
    }

    // Function to communicate a win 
    function congratulatePLayer() {
        DocumentEdit.setElementColor("h1", "#984b43");
        DocumentEdit.editHeadline("Grattis du gissade rätt!");
        DocumentEdit.playAgainBanner();
    }
    // Function to communicate a loss
    function communicatePlayersLoss() {
        DocumentEdit.setElementColor("#guesses-left", "#984b43");
        DocumentEdit.editHeadline("Tyvärr. Du har förlorat.");  
        DocumentEdit.playAgainBanner();
    }

    return {
        checkValidInput,
        communicateTryLower,
        communicateTryHigher,
        congratulatePLayer,
        communicatePlayersLoss
    }
})();

// After the document has loaded, call two initialization functions 
$(document).ready(function () {
    
    EventHandlers.init();
    DocumentEdit.init();
});