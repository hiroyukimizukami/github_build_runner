let util = require('util')
let https = require('https')

class GithubClient {
    constructor(repo, username, token) {
        this.repo = repo
        this.username = username
        this.token = token
        this.https = https
    }

    getPullRequest(number, completion, failure) {
        var param = this._create_base_params()
        param.method = 'GET'
        param.path = util.format('/repos/%s/%s/pulls/%s', this.username, this.repo, number)

        let req = this.https.request(param, (response) => {
            if (!/^20/.test(response.statusCode)) {
                return failure(new Error('repsonse_code:' + response.statusCode))
            }
            var data = []

            response.on('data', (chunk) => {
                data.push(chunk)
            })
            response.on('end', () => {
                completion(JSON.parse(Buffer.concat(data).toString()))
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
        let c = new Buffer(util.format('%s:%s', this.username, this.token)).toString('base64')
        return util.format('Basic %s', c)
    }
}

exports.create = (repo, username, token) => { return new GithubClient(repo, username, token) }
