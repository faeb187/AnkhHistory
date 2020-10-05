var design, partner;

design = require('../designs/bekb');

partner = JSON.parse(JSON.stringify(design));

partner.ids[1].ids[0].ids[1].ids = [
  {
    id: 'partnerTodo'
  }
];

module.exports = partner;
