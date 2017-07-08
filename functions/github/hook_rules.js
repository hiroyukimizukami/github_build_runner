exports.shouldBuild = (event) => {
    if (event.action !== 'created') return false
    return /^test this please$/.test(event.comment.body)
}
