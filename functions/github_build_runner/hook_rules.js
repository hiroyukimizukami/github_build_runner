exports.shouldBuild = (comment) => {
    return /^test this please$/.test(comment)
}
