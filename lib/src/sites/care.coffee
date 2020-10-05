design = require '../designs/bekb'

care = JSON.parse JSON.stringify design
care.ids[1].ids[0].ids[1].ids = [{id: 'careTodo'}]

module.exports = care