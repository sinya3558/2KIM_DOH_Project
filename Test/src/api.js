var axios = require('axios');
var fs = require('fs');
function getScoreCard(url) {
    var api_url = new String("https://api.securityscorecards.dev/projects/");
    var repo_url = new String(url);
    var repo_url_len = repo_url.length;
    var sliced_repo_url = repo_url.slice(8, repo_url_len);
    var api_repo = api_url.concat(sliced_repo_url.toString());
    //console.log(api_repo)
    var options = {
        method: 'GET',
        url: api_repo,
        params: { category: 'all', count: 2 }
    };
    var jsonfile_name = './Scorecard.json';
    axios
        .request(options)
        .then(function (response) {
        var jsonString = JSON.stringify(response.data, null, 2);
        fs.writeFileSync(jsonfile_name, jsonString);
        //console.log(res_data);
    })["catch"](function (error) {
        console.error(error);
    });
    return jsonfile_name;
}
//const file_name = getScoreCard('https://github.com/cloudinary/cloudinary_npm');
//console.log(file_name)
function getBusFactor() {
    var bf_subscore = 5;
    return bf_subscore;
}
function getLicense() {
    var li_subscore = 3;
    return li_subscore;
}
function getCorrectness() {
    var cor_subscore = 7;
    return cor_subscore;
}
function getRampUp() {
    var ramp_subscore = 6;
    return ramp_subscore;
}
function getResponsive() {
    var resp_subscore = 4;
    return resp_subscore;
}
module.exports = { getScoreCard: getScoreCard, getBusFactor: getBusFactor, getLicense: getLicense, getCorrectness: getCorrectness, getRampUp: getRampUp, getResponsive: getResponsive };
