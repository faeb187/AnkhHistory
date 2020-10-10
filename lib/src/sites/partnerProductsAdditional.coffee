design = require "../designs/bekb"

data =
  productsAdditional:
    cards: require "../network/data/productsAdditional/cards"

partnerProductsAdditional = JSON.parse JSON.stringify design
partnerProductsAdditional.ids[1].ids[0].ids[1].ids = [
  id: "toolbar"
  name: "html"
  tag: "menu"
  type: "toolbar"
  ids: [
    id: "additionalToolbarSwitch"
    name: "icon"
    icon: "toggle"
  ,
    # todo wrap select into <li>
    id: "additionalToolbarActions"
    name: "select"
    options: [{ lang: "actions" }, { lang: "createAdditionalProduct" }]
  ]
,
  id: "additionalAccordion"
  name: "accordion"
  ids: [
    id: "additionalDetailsCards"
    name: "details"
    open: true
    summary: lang: "cards"
    ids: [
      id: "additionalTableCards"
      name: "table"
      data: data.productsAdditional.cards
    ]
  ,
    id: "additionalDetailsEbanking"
    name: "details"
    summary: lang: "ebanking"
  ,
    id: "additionalDetailsSafes"
    name: "details"
    summary: lang: "safes"
  ,
    id: "additionalDetailsPaymentTransactions"
    name: "details"
    summary: lang: "paymentTransactions"
  ,
    id: "additionalDetailsContractsAndDocuments"
    name: "details"
    summary: lang: "contractsAndDocuments"
  ]
]

module.exports = partnerProductsAdditional
