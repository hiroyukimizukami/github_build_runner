let assert = require('assert')
let hookrules = require('../hook_rules')

describe('shouldBuild', () => {
    it('returns true with ', () => {
        assert.equal(hookrules.shouldBuild({
            comment: {
                body: 'test this please'
            },
            action: 'created'
        }), true)
    })
    it('returns true with ', () => {
        assert.equal(hookrules.shouldBuild({
            comment: {
                body: 'no test this please'
            },
            action: 'created'
        }), false)
    })
    it('returns true with ', () => {
        assert.equal(hookrules.shouldBuild({
            comment: {
                body: 'test this please but stop it'
            },
            action: 'created'
        }), false)
    })
})
