const axios = require('axios')
const fs = require('fs')

function getScoreCard(url) {
    var api_url = new String("https://api.securityscorecards.dev/projects/");
    var repo_url = new String(url);
    var repo_url_len = repo_url.length
    var sliced_repo_url = repo_url.slice(8, repo_url_len);
    var api_repo = api_url.concat(sliced_repo_url.toString());
    //console.log(api_repo)
    const options = {
        method : 'GET',
        url: api_repo,
        params: { category: 'all', count: 2},
        //transformResponse: (r: ServerResponse) => r.data
    };

    const jsonfile_name = './Scorecard.json'
    axios
        .request(options)
        .then(function (response) {
            const jsonString = JSON.stringify(response.data, null, 2)
            fs.writeFileSync(jsonfile_name, jsonString)
            //console.log(res_data);
        })
        .catch(function (error) {
            console.error(error);
        });
    return jsonfile_name
}

const data = require('./Scorecard.json');

function getBusFactor() {
    const bf_subscore = 5
    return bf_subscore
}

function getLicense() {
    const li_subscore = 3
    return li_subscore
}

function getCorrectness() {
    //CL test, CLL test, and vulnerability
    const checks = data.checks;
    var cnt = 3;
    var vuln = 0;
    var cii = 0;
    var ci = 0;

    var index_vuln = checks.findIndex(obj => obj.name == "Vulnerabilities");
    if (index_vuln == -1) {
        cnt -= 1;
    } else {
        var check_vuln = checks[index_vuln].score;
        if (check_vuln == undefined){
            vuln = 0;
        } else {
            vuln = check_vuln
        }
    }

    var index_cii = checks.findIndex(obj => obj.name == "CII-Best-Practices");
    if (index_cii == -1) {
        cnt -= 1;
    } else {
        var check_cii = checks[index_cii].score;
        if (check_cii == undefined){
            cii = 0;
        } else {
            cii = check_cii
        }
    }

    var index_ci = checks.findIndex(obj => obj.name == "CI-Test");
    if (index_ci == -1) {
        cnt -= 1;
    } else {
        var check_ci = checks[index_ci].score;
        if (check_ci == undefined){
            ci = 0;
        } else {
            ci = check_ci
        }
    }
    var cor_subscore = (vuln + cii + ci)
    return cor_subscore
}

function getRampUp() {
    const ramp_subscore = 6
    return ramp_subscore
}

function getResponsive() {
    const resp_subscore = 4
    return resp_subscore
}

module.exports = { getScoreCard, getBusFactor, getLicense, getCorrectness, getRampUp, getResponsive };
// need to implement how to get into the github repo when the url is 'npm' (need some think)
// 'npm' URLs cause error with axios.
// need to implement how to read json file and use them to calculate each sub-score (not too hard)
