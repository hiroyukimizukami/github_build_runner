let util = require('util')
let HttpClient = require('./http_client')

class CircleCIClient {
    constructor(repo, username, token) {
        this.username = username
        this.repo = repo
        this.token = token
        this.client = HttpClient.create()
    }

    build(rev, completion, failure) {
        let body = this._create_body(rev)
        var param = this._create_base_params(body)
        param.method = 'POST'
        param.path = util.format('api/v1.1/project/%s/%s/%s/?circle-token=%s', 'github', this.username, this.repo, this.token)

        console.log(param)
        console.log(body)
        this.client.request(param, body, completion, failure)
    }

    _create_body(rev) {
        return JSON.stringify({
            revision: rev
        })
    }

    _create_base_params(body) {
        return {
            hreaders: {
                "Content-Type" : "application/json",
                "Content-Length" : Buffer.byteLength(body)
            },
            hostname: "circleci.com",
            port: 443
        }
    }

}

exports.create = (repo, username, token) => { return new CircleCIClient(repo, username, token) }
