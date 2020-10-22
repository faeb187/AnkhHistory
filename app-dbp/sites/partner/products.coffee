import { dbp } from "../../designs/dbp"

_products = JSON.parse JSON.stringify dbp
_products.ids[1].ids[0].ids[1].ids = []

export partnerProducts = _products
