var util = require('util')
var https = require('https')

class CircleCIClient {
    constructor(token) {
        this.token = token
    }

    build(sha1) {
    }

    _create_base_params() {
    }

}

exports.create = (token) => { return new CircleCIClient(token) }
