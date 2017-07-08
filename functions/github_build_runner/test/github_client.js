let GithubClient = require('../github_client')
let MockHttps = require('./https_mock')
let assert = require('assert')
let util = require('util')

describe('getPullRequest', () => {
    let number = 2
    let https = MockHttps.create()
    let repo = 'sample_repo'
    let username = 'sample_user'
    let token = '12345'
    let githubClient = GithubClient.create(repo, username, token)
    githubClient.https = https
    githubClient.getPullRequest(number, () => {}, () => {})

    console.log(https.request.param)
    it('port', () => assert.equal(https._request.param.port, 443))
    it('host', () => assert.equal(https._request.param.host, 'api.github.com'))
    it('method', () => assert.equal(https._request.param.method, 'GET'))
    it('path', () => {
        let expectation = util.format('/repos/%s/%s/pulls/%s', username, repo, number)
        assert.equal(https._request.param.path, expectation)
    })
})
