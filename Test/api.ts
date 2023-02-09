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

//const octokit = net Octokit({
//    auth: ,
//});
//await octokit.request("Get /octocat", {});

//console.log(getScoreCard("https://github.com/cloudinary/cloudinary_npm"));
//console.log(getScoreCard("https://github.com/lodash/lodash"));
//console.log(getScoreCard("https://github.com/nullivex/nodist"));
//const { graphql } = require("@octokit/graphql");
//import type { GraphQlQueryResponseData } from "@octokit/graphql";
//const graphqlWithAuth = graphql.defaults({
//    headers: {
//        authorization: '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',
//    },
//});
//
////export {}
//
//const { lastIssues } = graphql({
//  query: `query lastIssues($owner: String!, $repo: String!, $num: Int = 3) {
//    repository(owner:$owner, name:$repo) {
//      issues(last:$num) {
//        edges {
//          node {
//            title
//          }
//        }
//      }
//    }
//  }`,
//  owner: "octokit",
//  repo: "graphql.js",
//  headers: {
//    authorization: `token secret123`,
//  },
//});

//console.log(lastIssues);

//const { repository } = async () => Promise<void> {
//    await graphqlWithAuth (
//        `{
//            repository(owner: "octokit", name: "graphql.js") {
//                issues(last: 3) {
//                    edges {
//                        node {
//                            title
//                        }
//                    }
//                }
//            }
//        }`
//    ),
//};
const { Octokit } = require("@octokit/core");

export {}

async function myfunction(url: string)  {
    const octokit = await new Octokit({
        auth: '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'
    });
    //const response = await octokit.request('GET /repos/{owner}/{repo}/license', {
    //    owner: 'danieldoh',
    //    repo: '2KIM_DOH_Project'

    //})
    const response = await octokit.request('GET /licenses', {})
    console.log(response);
    console.log(url);
}

myfunction.length;



function getBusFactor() {
    const bf_subscore = 5
    return bf_subscore
}

function getLicense() {
    const li_subscore = 3
    return li_subscore
}

function getRampUp() {
    const ramp_subscore = 6
    return ramp_subscore
}

function getResponsive() {
    const resp_subscore = 4
    return resp_subscore
}

module.exports = { getScoreCard, getBusFactor, getLicense,  getRampUp, getResponsive, myfunction };
