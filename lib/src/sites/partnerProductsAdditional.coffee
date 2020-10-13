import {
  cols as cardsCols
  data as cardsData
} from "../network/data/productsAdditional/cards"

design = require "../designs/bekb"

partnerPA = JSON.parse JSON.stringify design
partnerPA.ids[1].ids[0].ids[1].ids = [
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
      cols: cardsCols
      data: cardsData
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

export partnerProductsAdditional = partnerPA
