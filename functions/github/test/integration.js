let main = require('../main')
let event = require('./event.json')

let completion = (error, result)  => {
    console.log(error)
    console.log(result)
}

main.call(event, null, completion)
