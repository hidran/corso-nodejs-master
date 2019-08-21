number = Math.ceil(Math.random() * 10);
tries = 0;
process.stdout.write("Indovina un numero\n");

function ask() {
    if (tries > 5) {
        process.stdout.write("Non ce l'hai fatta! " + number);
        process.exit();
    }
    process.stdin.setEncoding('utf8');


    process.stdin.on('data', (data) => {
        answer = data.toString();
        process.stdout.write("answer" + answer + "\n");
        if (answer == number) {
            process.stdout.write('indovinato in ' + " " + tries + "\n");
            process.exit();
        } else if (answer > number) {
            tries++;
            process.stdout.write('troppo grosso' + "\n")
            ask()
        } else {
            tries++;
            process.stdout.write('troppo piccolo' + "\n")
            ask()
        }

    });
}

ask()