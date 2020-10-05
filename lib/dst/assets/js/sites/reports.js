var design, reports;

design = require('../designs/bekb');

reports = JSON.parse(JSON.stringify(design));

reports.ids[1].ids[0].ids[1].ids = [
  {
    id: 'reportsTodo'
  }
];

module.exports = reports;
