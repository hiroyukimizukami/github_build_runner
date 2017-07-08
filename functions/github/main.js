let IssueCommentEvent = require('./issue_comment_event')
let GithubClient = require('./github_client')
let CircleCIClient = require('./circleci_client')
let HookRules = require('./hook_rules')
let config = require('./config')

exports.call = (e, context, callback) => {
    console.log(e)
    let event = IssueCommentEvent.create(e)
    let github = GithubClient.create(config.repo, config.username, process.env.GITHUB_TOKEN)
    let circleci = GithubClient.create(config.repo, config.username, process.env.CIRCLECI__TOKEN)

    if (!HookRules.shouldBuild(e)) {
        callback(null, { status: 0 })
        return
    }

    github.getPullRequest(event.issueNumber, (pullRequest) => {
        circleci.build(pullRequest.head.sha, (response) => {
            console.log(response.build_url)
            callback(null, { status: 0 })
        }, (error) => {
            callback(error, { status : 1})
        })
    }, (error) => {
        callback(error, { status : 1})
    })
}
