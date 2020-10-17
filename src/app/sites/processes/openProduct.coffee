import { dbp } from "../../designs/dbp"

pathOpenProduct = "openProduct/"

_openProduct = JSON.parse JSON.stringify dbp
_openProduct.ids[1].ids[0].ids[1].ids = [
  id: "processOpenProduct"
  ui: "process"
  steps: [
    path: "#{pathOpenProduct}productSelection"
  ,
    path: "#{pathOpenProduct}accountData"
  ,
    path: "#{pathOpenProduct}deliveryAddress"
  ,
    path: "#{pathOpenProduct}portfolio"
  ,
    path: "#{pathOpenProduct}summary"
  ,
    path: "#{pathOpenProduct}confirmationOfCompletion"
  ]
]

console.log "openProduct:", _openProduct

export openProduct = _openProduct
