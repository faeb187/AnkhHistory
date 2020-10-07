design = require '../designs/bekb'

partnerProductsAdditional = JSON.parse JSON.stringify design
partnerProductsAdditional.ids[1].ids[0].ids[1].ids = [
  {
    id: 'partnerProductsAdditionalAccordion'
    ids: [
      {
        id: 'partnerProductsAdditionalDetailsCards'
        ids: [] # { id: 'partnerProductsAdditionalAccordionCards' }]
      }
      {
        id: 'partnerProductsAdditionalDetailsSafes'
        ids: [] # { id: 'partnerProductsAdditionalAccordionSafes' }]
      }
    ]
  }
]

module.exports = partnerProductsAdditional