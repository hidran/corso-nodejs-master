var path = require('path')
number = Math.random() * 11 | 0;
var guessed = 0;

function guessGame() {
    var
        guess,
        text = 'Guess a number:';
    process.stdout.write("enter a number: ")

    var guessed = 0;

    process.stdin.on('data',
        function(data) {
            guess = data.toString();

            process.stdout.write(guess + "\n")
            if (number < guess) {
                process.stdout.write("You've guessed too high!\n");
                guessGame();
            } else if (number > guess) {
                process.stdout.write("You've guessed too low!\n");
                guessGame();
            } else {
                process.stdout.write("You've guessed !");
                process.exit();
            }


        }
    );



}
//guessGame();
process.on('exit', () => {
    process.stdout.write("\n\n\n\n");
})