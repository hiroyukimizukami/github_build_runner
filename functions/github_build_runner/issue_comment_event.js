class IssueCommentEvent {
    constructor(event) {
        this.action = event.action
        this.issueNumber = event.issue.number
        this.body = event.comment.body
    }
}

exports.create = (event) => { new IssueCommentEvent(event) }
