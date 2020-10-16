import { dbp } from "../designs/dbp"

steps = [
  lang: "productSelection"
,
  lang: "accountData"
,
  lang: "deliveryAddress"
,
  lang: "portfolio"
,
  lang: "summary"
,
  lang: "confirmationOfCompletion"
]

details = _processOpenProduct = JSON.parse JSON.stringify dbp
_processOpenProduct.ids[1].ids[0].ids[1].ids = [
  id: "breadcrumb"
  ui: "breadcrumb"
  events: ui: [name: "ui-breadcrumb-update", target: "breadcrumb"]
  numbered: true
  readonly: true
  items: [...steps]
,
  id: "openProductAccordion"
  ui: "accordion"
  ids: [
    id: "accordionPay"
    ui: "details"
    summary: lang: "pay"
  ,
    id: "accordionSaveUp"
    ui: "details"
    summary: lang: "saveUp"
  ,
    id: "accordionPrecaution"
    ui: "details"
    summary: lang: "precaution"
  ,
    id: "accordionInvest"
    ui: "details"
    summary: lang: "invest"
  ,
    id: "accordionFinance"
    ui: "details"
    summary: lang: "finance"
  ,
    id: "accordionVarious"
    ui: "details"
    summary: lang: "various"
  ]
,
  id: "openProductButtons"
  ui: "html"
  classNames: "ui-button-group"
  ids: [
    id: "btnAbort", ui: "button", lang: "abort"
  ,
    classNames: "primary", id: "btnContinue", ui: "button", lang: "continue"
  ]
]

export processOpenProduct = _processOpenProduct
