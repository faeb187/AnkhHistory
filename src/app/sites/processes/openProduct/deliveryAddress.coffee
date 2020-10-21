import { dbp } from "../../../designs/dbp"
import { steps } from "../../../conf/processes/openProduct/steps"

_deliveryAddress = JSON.parse JSON.stringify dbp
_deliveryAddress.ids[1].ids[0].ids[1].ids = [
  id: "breadcrumb"
  ui: "breadcrumb"
  # events: ui: [name: "ui-breadcrumb-update", target: "breadcrumb"]
  numbered: true
  readonly: true
  active: 2
  items: [...steps]
,
  id: "prcCtrl"
  ui: "process"
  steps: [...steps]
,
  classNames: "ui-html-box"
  id: "boxAccountData"
  ui: "html"
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
    id: "btnBack"
    events:
      click: [name: "ui-process-back", target: "prcCtrl"]
    ui: "button"
    lang: "back"
  ,
    classNames: "primary"
    events:
      click: [name: "ui-process-continue", target: "prcCtrl"]
    id: "btnContinue"
    ui: "button"
    lang: "continue"
  ]
]

export processesOpenProductDeliveryAddress = _deliveryAddress
