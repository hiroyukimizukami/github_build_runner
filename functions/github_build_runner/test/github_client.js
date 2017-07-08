var GithubClient = require('../github_client')
var MockHttps = require('./https_mock')
var assert = require('assert')
var util = require('util')

describe('getPullRequest', () => {
    var number = 2
    var https = MockHttps.create()
    var repo = 'sample_repo'
    var username = 'sample_user'
    var token = '12345'
    var githubClient = GithubClient.create(repo, username, token)
    githubClient.https = https
    githubClient.getPullRequest(number, () => {}, () => {})

    console.log(https.request.param)
    it('port', () => assert.equal(https._request.param.port, 443))
    it('host', () => assert.equal(https._request.param.host, 'api.github.com'))
    it('method', () => assert.equal(https._request.param.method, 'GET'))
    it('path', () => {
        var expectation = util.format('/repos/%s/%s/pulls/%s', username, repo, number)
        assert.equal(https._request.param.path, expectation)
    })
})
