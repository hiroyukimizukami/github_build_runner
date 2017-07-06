main = require('../main')
event = require('./event.json')

completion = (error, result)  => {
    console.log(error)
    console.log(result)
}
main.main(event, null, completion)
