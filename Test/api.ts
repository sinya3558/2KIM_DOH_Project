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
            jsonfile_name = '404';
        });
    return jsonfile_name
}

async function getLicense(token, url) {
    const { graphql } = require("@octokit/graphql");
    var url_trim = url.trim();
    var url_len = url_trim.length;
    var sliced_url = url.slice(19, url_len);
    var repo_info = sliced_url.split("/",2);

    const { repository } = await graphql ({
        query: `query repository_details($owner: String!, $repo: String!) {
            repository(owner:$owner, name:$repo) {
                licenseInfo {
                    name
                }
            }
        }`,
        owner: repo_info[0],
        repo: repo_info[1],
        headers: {
            'Authorization': 'bearer ' + token,
        },
    });
    return repository
}

async function getContributor(token, url, action_info) { const { Octokit } = require("octokit");
    const octokit = new Octokit({
        auth: token
    });
    var url_trim = url.trim();
    var url_len = url_trim.length;
    var sliced_url = url.slice(19, url_len);
    var repo_info = sliced_url.split("/",2);
    var json_file = './contribute.json';
    try {
        const contribute = await octokit.request('GET /repos/{owner}/{repo}/{action}', {
            owner: repo_info[0],
            repo: repo_info[1],
            action: action_info
        });
        const jsonString = JSON.stringify(contribute.data, null, 2)
        fs.writeFileSync(json_file, jsonString, {
            flag: 'w'
        })
    } catch(error) {
        json_file = "404";
    }
    return json_file
}


async function getReadme(token, url, action_info) {
    const { Octokit } = require("octokit");
    const octokit = new Octokit({
        auth: token
    });
    var url_trim = url.trim();
    var url_len = url_trim.length;
    var sliced_url = url.slice(19, url_len);
    var repo_info = sliced_url.split("/",2);
    var json_file = './readme.json';
    try {
        const readme = await octokit.request('GET /repos/{owner}/{repo}/{action}', {
            owner: repo_info[0],
            repo: repo_info[1],
            action: action_info
        });
        const jsonString = JSON.stringify(readme.data, null, 2)
        fs.writeFileSync(json_file, jsonString, {
            flag: 'w'
        })
    } catch(error) {
        json_file = "404";
    }
    return json_file
}

async function getLang(token, url, action_info) {
    const { Octokit } = require("octokit");
    const octokit = new Octokit({
        auth: token
    });
    var url_trim = url.trim();
    var url_len = url_trim.length;
    var sliced_url = url.slice(19, url_len);
    var repo_info = sliced_url.split("/",2);
    var json_file = './language.json';
    try {
        const lang = await octokit.request('GET /repos/{owner}/{repo}/{action}', {
            owner: repo_info[0],
            repo: repo_info[1],
            action: action_info
        });
        const jsonString = JSON.stringify(lang.data, null, 2)
        fs.writeFileSync(json_file, jsonString, {
            flag: 'w'
        })
    } catch(error) {
        json_file = "404";
    }

    return json_file
}

//async function getResponsive(token, url, action_info) {
//    const { Octokit } = require("octokit");
//    const octokit = new Octokit({
//        auth: token
//    });
//    var url_trim = url.trim();
//    var url_len = url_trim.length;
//    var sliced_url = url.slice(19, url_len);
//    var repo_info = sliced_url.split("/",2);
//    const response = await octokit.request('GET /repos/{owner}/{repo}/{action}', {
//        owner: repo_info[0],
//        repo: repo_info[1],
//        action: action_info
//    });
//    return response.data.length
//}

module.exports = { getScoreCard, getContributor, getLicense,  getReadme, getLang };
