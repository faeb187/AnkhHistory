import { dbp } from "../../designs/dbp"
import { steps } from "../../conf/processes/openProduct/steps"

_openProduct = JSON.parse JSON.stringify dbp
_openProduct.ids[1].ids[0].ids[1].ids = [
  id: "prcCtrl"
  ui: "process"
  gateway: true
  steps: [...steps]
]

export openProduct = _openProduct
