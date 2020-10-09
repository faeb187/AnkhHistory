design = require '../designs/bekb'
additionalTableCards = require '../conf/additionalTableCards'

partnerProductsAdditional = JSON.parse JSON.stringify design
partnerProductsAdditional.ids[1].ids[0].ids[1].ids = [
  {
    id: 'additionalAccordion'
    name: 'accordion'
    ids: [
      {
        id: 'additionalDetailsCards'
        name: 'details'
        open: true
        summary: lang: 'cards'
        ids: [
          { id: 'additionalCarouselCards', name: 'carousel', items: [{thumb:''}], media: max: 'l'},
          {...additionalTableCards, media: min: 'l'}
        ]
      }
      {
        id: 'additionalDetailsSafes'
        name: 'details'
        summary: lang: 'safes'
        ids: [] # { id: 'partnerProductsAdditionalAccordionSafes' }]
      }
    ]
  }
]

module.exports = partnerProductsAdditional