design = require '../designs/bekb'

careOverview = JSON.parse JSON.stringify design
careOverview.ids[1].ids[0].ids[1].ids = [id: 'careIframePending', name: 'iframe', src: 'localhost:5000']

module.exports = careOverview