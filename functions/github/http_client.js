let https = require('https')

class HttpClient {
    constructor() {
        this.https = https
    }

    request(param, body, completion, failure) {
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

        if (body) req.write(body)
        req.end()
    }
}

exports.create = () => { return new HttpClient() }
