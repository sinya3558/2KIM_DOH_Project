const score = require('./Scorecard.json');

//console.log(score.checks.findIndex(name == "Vulnerabilities"));
var checks = score.checks
console.log(checks)
//console.log(score.checks.name("Vulnerabilities"));
var index = checks.findIndex(obj => obj.name == "CI-Test");
console.log(index)
var cnt = 3
cnt -= 1
console.log(cnt)
