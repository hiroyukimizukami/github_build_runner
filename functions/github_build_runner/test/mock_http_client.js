class MockHttpClient {
    constructor() {
        this.responseStatus = 200
        this.responseBody = null
        this.param = null
        this.requestBody = null
        this.error = null
    }
    request(param, body, completion, falure) {
        this.param = param
        this.requestBody = body

        if (this.error) {
            failure(this.error)
            return
        }

        completion(this.responseBody)
    }
}

exports.create = () => { return new MockHttpClient() }
