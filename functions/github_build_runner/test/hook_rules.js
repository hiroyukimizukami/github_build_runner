let assert = require('assert')
let hookrules = require('../hook_rules')

describe('shouldBuild', () => {
    console.log(assert)
    it('returns true with ', () => { assert.equal(hookrules.shouldBuild('test this please'), true) })
    it('returns true with ', () => { assert.equal(hookrules.shouldBuild('no test this please'), false) })
    it('returns true with ', () => { assert.equal(hookrules.shouldBuild('test this please but stop it'), false) })
})
