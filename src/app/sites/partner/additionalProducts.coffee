import { copy } from "../../../utils/basic.util"
import { routes } from "../../conf/routes"

color = primary: "#cc0033"

logo =
  id: "logoSmall"
  ui: "html"
  tag: "img"
  src: "/assets/img/logo-small.png"
  lang: "bekb"
  media: max: "l"

redTop =
  id: "redTop"
  ui: "html"
  style:
    background: color.primary
    gridColumn: "2 / 24"

redBtm = copy { ...redTop, id: "redBtm" }
redBtm.style.gridRow = "-1 / -2"

export partnerAdditionalProducts =
  ids: [
    id: "app"
    ui: "grid"
    style:
      gridTemplateColumns: "repeat(24, 1fr)"
      gridTemplateRows: "8px repeat(24, 1fr) 8px"
      height: "100%"
      position: "relative"
    ids: [
      copy redTop
    ,
      id: "header"
      ui: "grid"
      element: "header"
      style:
        alignItems: "center"
        gridArea: "2 / 2 / 4 / 24"
        gridTemplateColumns: "repeat(5, 1fr)"
      inline: true
      ids: [
        copy logo
        {
          ...copy(logo)
          id: "logo"
          src: "/assets/img/logo.svg"
          lang: "bekb"
          media: min: "l"
        }
      ]
    ,
      id: "main"
      ui: "grid"
      element: "main"
      style:
        gridColumn: "1 / 25"
        gridRow: "4 / -4"
      inline: true
    ,
      id: "footer"
      ui: "grid"
      element: "footer"
      style:
        alignItems: "center"
        gridColumn: "2 / 24"
        gridGap: "1rem"
        gridRow: "-4 / -2"
        gridTemplateColumns: "repeat(5, 1fr)"
        justifyItems: "center"
      inline: true
      ids: [
        id: "navToggle"
        ui: "icon"
        icon: "menu"
        style:
          gridColumnStart: 5
          height: "32px"
          width: "32px"
        events:
          click: [name: "ui-list-toggle", args: toToggle: "navMobileWrapper"]
        media: max: "l"
      ]
    ,
      copy redBtm
    ]
  ,
    id: "navMobileWrapper"
    ui: "grid"
    className: "hidden"
    style:
      background: "#fff"
      grid: "none"
      gridTemplateRows: "8px repeat(24, 1fr) 8px"
      gridTemplateColumns: "repeat(24, 1fr)"
      height: "100%"
      position: "absolute"
      top: 0
      bottom: 0
      left: 0
      right: 0
      zIndex: 9999
    media: max: "l"
    ids: [
      { ...copy(redTop), id: "redTopNavMobile" }
    ,
      id: "navMobile"
      ui: "list"
      items: routes
      role: "navigation"
      style:
        gridColumn: "2 / 24"
        gridRow: "4 / -4"
      events:
        click: [name: "core-site-load", args: selector: "a"]
        init: [l: "core-renderer-rendered", f: "ui-list-update"]
    ,
      id: "navMobileFooter"
      ui: "grid"
      style:
        alignItems: "center"
        gridColumn: "2 / 24"
        gridGap: "1rem"
        gridRow: "-4 / -2"
        gridTemplateColumns: "repeat(5, 1fr)"
        justifyItems: "center"
      ids: [
        id: "lang"
        ui: "lang"
        style:
          display: "inline-grid"
          gridArea: "1 / 1 / 2 / 3"
          gridTemplateColumns: "1fr 1fr"
      ,
        id: "navToggleX"
        ui: "icon"
        icon: "close"
        style:
          gridArea: "1 / 5 / 2 / 6"
          height: "32px"
          width: "32px"
        events:
          click: [name: "ui-list-toggle", args: toToggle: "navMobileWrapper"]
      ]
    ,
      { ...copy(redBtm), id: "redBtmNavMobile" }
    ]
  ]
