var util = require('util')
var https = require('https')

class GithubClient {
    constructor(repo, username, token) {
        this.repo = repo
        this.username = username
        this.token = token
    }

    getPullRequest(number, completion, failure) {
        var param = this._create_base_params()
        param.method = 'GET'
        param.path = util.format('/repos/%s/%s/pulls/%s', this.username, this.repo, number)

        var req = https.request(param, (response) => {
            if (!/^20/.test(response.statusCode)) {
                return failure(new Error('repsonse_code:' + response.statusCode))
            }
            var data = []

            response.on('data', (chunk) => {
                data.push(chunk)
            })
            response.on('end', () => {
                var body = Buffer.concat(data).toString()
                completion(JSON.parse(body))
            })
            response.on('error', (error) => {
                failure(error)
            })
        })

        req.end()
    }

    _create_base_params() {
        return {
            headers: {
                "Authorization": this._create_authorized_value(),
                "Accept": '*/*',
                "User-Agent": 'github_build_hook/0.0.1'
            },
            host: 'api.github.com',
            port: 443
        }
    }

    _create_authorized_value() {
        var c = new Buffer(util.format('%s:%s', this.username, this.token)).toString('base64')
        return util.format('Basic %s', c)
    }
}

exports.create = (repo, username, token) => { return new GithubClient(repo, username, token) }
