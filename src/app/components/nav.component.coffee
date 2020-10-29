common =
  ui: "nav"
  events: click: [name: "core-site-load", args: selector: "a"]

export navMain = {
  ...common
  id: "navMain"
  media: min: "l"
  items: [
    lang: "partner"
    path: "/partner"
  ]
}

export navPartner = {
  ...common
  id: "navPartner"
  media: min: "l"
  items: [
    lang: "additionalProducts"
    path: "/partner/additionalProducts"
  ]
}
