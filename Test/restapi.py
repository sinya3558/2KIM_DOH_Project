from octokit import Octokit

octokit = Octokit("api_key")

# Body Example | change username
octokit.request("PATCH /user", {
    "body": {
        "name": "new_username"
    }
})

# Query Example | get the latest user that signed up to github
print(octokit.request("GET /users", {
    "query": {
        "per_page": 1
    }
}))

# Headers Example | get all your gist and recieve its content in base64 format
print(octokit.request("GET /gists", {
    "headers": {
        "accept": "application/vnd.github.v3.base64"
    }
}))
