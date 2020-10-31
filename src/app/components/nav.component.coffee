common =
  ui: "nav"
  events: click: [name: "core-site-load", args: selector: "a"]

export navMain = {
  ...common
  id: "navMain"
  attributes: "aria-label": "Main"
  items: [
    lang: "partner"
    path: "/partner"
  ]
}

export navPartner = {
  ...common
  id: "navPartner"
  attributes:
    "aria-label": "Partner"
    "data-level": 1
  items: [
    lang: "products"
    path: "/partner/products"
  ,
    lang: "additionalProducts"
    path: "/partner/additionalProducts"
  ]
}
