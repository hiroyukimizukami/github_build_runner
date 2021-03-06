let util = require('util')
let HttpClient = require('./http_client')

class GithubClient {
    constructor(repo, username, token) {
        this.repo = repo
        this.username = username
        this.token = token
        this.client = HttpClient.create()
    }

    getPullRequest(number, completion, failure) {
        var param = this._create_base_params()
        param.method = 'GET'
        param.path = util.format('/repos/%s/%s/pulls/%s', this.username, this.repo, number)
        this.client.request(param, null, completion, failure)
    }

    _create_base_params() {
        return {
            headers: {
                "Authorization": this._create_authorized_value(),
                "Accept": '*/*',
                "User-Agent": 'github_build_hook/0.0.1'
            },
            hostname: 'api.github.com',
            port: 443
        }
    }

    _create_authorized_value() {
        let c = new Buffer(util.format('%s:%s', this.username, this.token)).toString('base64')
        return util.format('Basic %s', c)
    }
}

exports.create = (repo, username, token) => { return new GithubClient(repo, username, token) }
