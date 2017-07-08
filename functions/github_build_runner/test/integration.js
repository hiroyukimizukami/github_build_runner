main = require('../main')
event = require('./event.json')

completion = (error, result)  => {
    console.log(error)
    console.log(result)
}

main.call(event, null, completion)
