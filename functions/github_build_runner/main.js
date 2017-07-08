let IssueCommentEvent = require('./issue_comment_event')
let GithubClient = require('./github_client')
let config = require('./config')

exports.call = (e, context, callback) => {
    let event = IssueCommentEvent.create(e)
    let githubClient = GithubClient.create(config.repo, config.username, process.env.GITHUB_TOKEN)

    githubClient.getPullRequest(event.issueNumber, (pullRequest) => {
        console.log(pullRequest.head.sha)
        callback(null, { status: 0 })
    }, (error) => {
        callback(error, { status : 1})
    })
}
