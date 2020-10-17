import { dbp } from "../../../designs/dbp"
import { steps } from "../../../conf/processes/openProduct/steps"
import { productSelection as productSelectionConf } from "../../../conf/processes/openProduct/productSelection"

_productSelection = JSON.parse JSON.stringify dbp
_productSelection.ids[1].ids[0].ids[1].ids = [
  id: "breadcrumb"
  ui: "breadcrumb"
  events: ui: [name: "ui-breadcrumb-update", target: "breadcrumb"]
  numbered: true
  readonly: true
  items: [...steps]
,
  id: "openProductAccordion"
  ui: "accordion"
  ids: [...productSelectionConf]
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

export productSelection = _productSelection
