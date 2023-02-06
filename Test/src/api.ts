const axios = require('axios')
const fs = require('fs')

function getScoreCard(url: string) {
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
        .then(function (response: any) {
            const jsonString = JSON.stringify(response.data, null, 2)
            fs.writeFileSync(jsonfile_name, jsonString)
            //console.log(res_data);
        })
        .catch(function (error:any) {
            console.error(error);
        });
    return jsonfile_name
}
//const file_name = getScoreCard('https://github.com/cloudinary/cloudinary_npm');
//console.log(file_name)

function getBusFactor() {
    const bf_subscore: number = 5
    return bf_subscore
}

function getLicense() {
    const li_subscore: number = 3
    return li_subscore
}

function getCorrectness() {
    const cor_subscore: number = 7
    return cor_subscore
}

function getRampUp() {
    const ramp_subscore: number = 6
    return ramp_subscore
}

function getResponsive() {
    const resp_subscore: number = 4
    return resp_subscore
}

module.exports = { getScoreCard, getBusFactor, getLicense, getCorrectness, getRampUp, getResponsive };
// need to implement how to get into the github repo when the url is 'npm' (need some think)
// 'npm' URLs cause error with axios.
// need to implement how to read json file and use them to calculate each sub-score (not too hard)
