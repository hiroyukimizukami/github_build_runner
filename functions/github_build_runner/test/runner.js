main = require('../main')
event = require('./event.json')
console.log('call')
completion = (error, result)  => {
    console.log(process.env)
    console.log(error)
    console.log(result)
}

main.call(event, null, completion)
