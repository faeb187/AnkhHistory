common = ui: "grid"

export grid24 = {
  ...common
  style:
    gridTemplateColumns: "repeat(24, 1fr)"
    gridTemplateRows: "8px repeat(24, 1fr) 8px"
    height: "100%"
    position: "relative"
}

export gridHeader = {
  ...common
  inline: true
  element: "header"
}

export gridMain = {
  ...common
  inline: true
  element: "main"
  style:
    gridColumn: "1 / 25"
    gridRow: "6 / -4"
}

export gridFooter = {
  ...common
  inline: true
  element: "footer"
  style:
    alignItems: "center"
    gridColumn: "2 / 24"
    gridGap: "1rem"
    gridRow: "-4 / -2"
    gridTemplateColumns: "repeat(5, 1fr)"
    justifyItems: "center"
}
