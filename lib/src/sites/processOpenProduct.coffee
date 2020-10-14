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

_processOpenProduct = JSON.parse JSON.stringify dbp
_processOpenProduct.ids[1].ids[0].ids[1].ids = [
  id: "breadcrumb"
  ui: "breadcrumb"
  events: ui: [name: "ui-breadcrumb-update", target: "breadcrumb"]
  numbered: true
  readonly: true
  items: [...steps]
]

export processOpenProduct = _processOpenProduct
