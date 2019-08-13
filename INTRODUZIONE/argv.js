console.log(process.argv);
let pars = process.argv,
    number, power;
let numIdx = pars.indexOf('--number');
if (numIdx !== -1) {
    number = pars[numIdx + 1];
}
let powerIdx = pars.indexOf('--power');
if (powerIdx !== -1) {
    power = pars[powerIdx + 1];
}
if (number && power) {
    console.log(number ** power);
} else {
    console.log('Invalid values');
}