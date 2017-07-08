let CircleCIClient = require('../circleci_client')
let MockHttpClient = require('./mock_http_client')
let assert = require('assert')
let util = require('util')


describe('build', () => {
    let repo = 'sample_repo'
    let username = 'sample_user'
    let token = '12345'
    let rev = '07f0609498a483e7d6c9ab8b3c2f7379bf45d8cb'
    let client = CircleCIClient.create(username, repo, token, rev)
    let httpClient = MockHttpClient.create()
    client.client = httpClient
    client.build(rev, () => {}, () => {})

    it('port', () => assert.equal(httpClient.param.port, 443))
    it('host', () => assert.equal(httpClient.param.hostname, 'circleci.com'))
    it('method', () => assert.equal(httpClient.param.method, 'POST'))
})
