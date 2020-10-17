import { dbp } from "../../../designs/dbp"
import { steps } from "../../../conf/processes/openProduct/steps"

_productSelection = JSON.parse JSON.stringify dbp
_productSelection.ids[1].ids[0].ids[1].ids = [
  id: "breadcrumb"
  ui: "breadcrumb"
  # events: ui: [name: "ui-breadcrumb-update", target: "breadcrumb"]
  numbered: true
  readonly: true
  items: [...steps]
,
  id: "prcCtrl"
  ui: "process"
  steps: [...steps]
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
    events:
      click: [name: "ui-process-abort", target: "prcCtrl"]
    id: "btnAbort"
    ui: "button"
    lang: "abort"
  ,
    classNames: "primary"
    events:
      click: [name: "ui-process-continue", target: "prcCtrl"]
    id: "btnContinue"
    ui: "button"
    lang: "continue"
  ]
]

export productSelection = _productSelection
