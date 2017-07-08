let https = require('https')

class HttpClient {
    constructor() {
        this.https = https
    }

    request(param, payload, completion, failure) {
        console.log(payload)
        let req = this.https.request(param, (response) => {
            if (!/^20/.test(response.statusCode)) {
                return failure(new Error('repsonse_code:' + response.statusCode))
            }
            var data = []

            response.on('data', (chunk) => {
                data.push(chunk)
            })
            response.on('end', () => {
                let body = Buffer.concat(data).toString()
                console.log(body)
                completion(JSON.parse(body))
            })
            response.on('error', (error) => {
                failure(error)
            })
        })

        if (payload) req.write(payload)
        req.end()
    }
}

exports.create = () => { return new HttpClient() }
