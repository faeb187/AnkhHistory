design = require '../designs/bekb'

careOverview = JSON.parse JSON.stringify design
careOverview.ids[1].ids[0].ids[1].ids = [{id: 'careIframePending'}]

module.exports = careOverview