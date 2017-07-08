let GithubClient = require('../github_client')
let MockHttpClient = require('./mock_http_client')
let assert = require('assert')
let util = require('util')

describe('getPullRequest', () => {
    let number = 2
    let repo = 'sample_repo'
    let username = 'sample_user'
    let token = '12345'
    let httpClient = MockHttpClient.create()
    let client = GithubClient.create(repo, username, token)
    client.client = httpClient
    client.getPullRequest(number, () => {}, () => {})

    it('port', () => assert.equal(httpClient.param.port, 443))
    it('host', () => assert.equal(httpClient.param.hostname, 'api.github.com'))
    it('method', () => assert.equal(httpClient.param.method, 'GET'))
    it('path', () => {
        let expectation = util.format('/repos/%s/%s/pulls/%s', username, repo, number)
        assert.equal(httpClient.param.path, expectation)
    })
})
