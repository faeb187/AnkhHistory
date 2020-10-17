import { cols, data } from "../../data/additionalProducts/cards"
import { dbp } from "../../designs/dbp"

_additionalProducts = JSON.parse JSON.stringify dbp
_additionalProducts.ids[1].ids[0].ids[1].ids = [
  id: "toolbar"
  ui: "html"
  tag: "menu"
  type: "toolbar"
  ids: [
    id: "additionalToolbarSwitch"
    ui: "icon"
    icon: "toggle"
  ,
    # todo wrap select into <li>
    id: "additionalToolbarActions"
    ui: "select"
    options: [{ lang: "actions" }, { lang: "createAdditionalProduct" }]
  ]
,
  id: "additionalAccordion"
  ui: "accordion"
  ids: [
    id: "additionalDetailsCards"
    ui: "details"
    open: true
    summary: lang: "cards"
    ids: [
      id: "additionalTableCards"
      ui: "table"
      cols: cols
      data: data
    ]
  ,
    id: "additionalDetailsEbanking"
    ui: "details"
    summary: lang: "ebanking"
  ,
    id: "additionalDetailsSafes"
    ui: "details"
    summary: lang: "safes"
  ,
    id: "additionalDetailsPaymentTransactions"
    ui: "details"
    summary: lang: "paymentTransactions"
  ,
    id: "additionalDetailsContractsAndDocuments"
    ui: "details"
    summary: lang: "contractsAndDocuments"
  ]
]

export additionalProducts = _additionalProducts
