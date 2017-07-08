class MockHttps {
    constructor() {
        this.repsonse_body = MockHttps.DEFAULT_RESPONSE_BODY
        this.repsonse_status = 200
        this.error = null
        this._request = null
    }

    request(param, callback) {
        this.param = param
        var response = new MockResponse(this.response_status, this.response_body, this.error)

        if (callback) {
            callback(response)
        }

        this._request = new MockRequest(response, param)
        return this._request
    }
}

MockHttps.DEFAULT_RESPONSE_BODY = 'mocked_repsonse_body'

class MockRequest {
    constructor(response, param) {
        this.response = response
        this.param = param
    }

    end() { this.response.end() }
}

class MockResponse {
    constructor(status, body, error) {
        this.statusCode = status
        this.body = body
        this.error = error
        this.events = {}
    }
    on(event_name, callback) {
        this.events[event_name]= callback
    }
    end() {
        if (this.events.data) {
            this.events.data(Buffer.from(this.body))
        }
        if (this.events.end) {
            this.events.end()
        }
        if (this.error && this.events.error) {
            this.events.error(this.error)
        }
    }
}

exports.create = () => { return new MockHttps() }
