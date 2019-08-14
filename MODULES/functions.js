//console.log(__filename, __dirname);
//const PI = 3.1415;
const {PI} = Math;
//var name ='Hidran';
const calcCircAarea = r => {
 return r**2 * PI
};

const calcRectArea = (a, b)=>{
    return a*b;
}
/*exports.MYPI = {
    MYPI: PI,
    calcRectArea,
    calcCircAarea

};
*/
module.exports = {
    MYPI: PI,
    calcRectArea,
    calcCircAarea

};
/*
exports.calcRectArea =(a, b)=>{
    return a*b;
}
exports.power = function (x, n) {
     return x**n;
}
 //exports = PI// do not do this

//module.exports = PI;
/*
(function (exports, require, module, __filename, __dirname) {
    module.exports = exports = {};

    // Your module code ...

  });
  */
