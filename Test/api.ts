const axios = require('axios')
const fs = require('fs')

async function getScoreCard(url: string) {
    var api_url = new String("https://api.securityscorecards.dev/projects/");
    var repo_url = new String(url);
    var repo_url_len = repo_url.length
    var sliced_repo_url = repo_url.slice(8, repo_url_len);
    var api_repo = api_url.concat(sliced_repo_url.toString());
    const options = {
        method : 'GET',
        url: api_repo,
        params: { category: 'all', count: 2},
    };

    var jsonfile_name = './Scorecard.json'
    await axios
        .request(options)
        .then(function (response: any) {
            const jsonString = JSON.stringify(response.data, null, 2)
            fs.writeFileSync(jsonfile_name, jsonString, {
                flag: 'w'
            })
        })
        .catch(function (error: any) {
            console.error(error);
        });
    return jsonfile_name
}

async function getLicense(token, url) {
    const { Octokit } = require("octokit");
    const octokit = new Octokit({
        auth: token
    });
    //octokit.paginate(
    //    "GET /repos/{owner}/{repo}/issues",
    //    { owner: "octokit", repo: "rest.js" },
    //    (response, done) => {
    //        if (response.data.find((issue) => issue.body.includes("something"))) {
    //        done();
    //        }
    //        return response.data;
    //    }
    //);
    var url_len = url.length;
    var sliced_url = url.slice(19, url_len);
    var repo_info = sliced_url.split("/",2);
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: repo_info[0],
        repo: repo_info[1]
    });
    return response.data.length
}


async function getBusFactor(token, url) {
    const { Octokit } = require("octokit");
    const octokit = new Octokit({
        auth: token
    });
    var url_len = url.length;
    var sliced_url = url.slice(19, url_len);
    var repo_info = sliced_url.split("/",2);
    console.log(repo_info[0]);
    console.log(repo_info[1]);
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: repo_info[0],
        repo: repo_info[1]
    });
    return response.data.length
}

async function getRampUp(token, url) {
    const { Octokit } = require("octokit");
    const octokit = new Octokit({
        auth: token
    });
    var url_len = url.length;
    var sliced_url = url.slice(19, url_len);
    var repo_info = sliced_url.split("/",2);
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: repo_info[0],
        repo: repo_info[1]
    });
    return response.data.length
}

async function getResponsive(token, url) {
    const { Octokit } = require("octokit");
    const octokit = new Octokit({
        auth: token
    });
    var url_len = url.length;
    var sliced_url = url.slice(19, url_len);
    var repo_info = sliced_url.split("/",2);
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: repo_info[0],
        repo: repo_info[1]
    });
    return response.data.length
}

module.exports = { getScoreCard, getBusFactor, getLicense,  getRampUp, getResponsive};
