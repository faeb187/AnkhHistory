export iconNavToggle =
  id: "navToggle"
  ui: "icon"
  icon: "menu"
  style:
    gridColumnStart: 5
    height: "32px"
    width: "32px"
  events: click: [name: "ui-list-toggle", args: toToggle: "navMobileWrapper"]
  media: max: "l"
