# import { copy } from "../../../utils/basic.util"
import { htmlRedTop, htmlRedBtm } from "../../components/html.component"
import { iconNavToggle } from "../../components/icon.component"
import { imgMobileLogo, imgLogo } from "../../components/img.component"
import { lang } from "../../components/lang.component"
import { navMain, navPartner } from "../../components/nav.component"
import {
  grid24
  gridHeader
  gridMain
  gridFooter
} from "../../components/grid.component"

export partnerAdditionalProducts =
  ids: [
    {
      ...grid24
      id: "app"
      # media: min: "l"
      ids: [
        htmlRedTop
        { ...gridHeader, id: "header", ids: [imgMobileLogo, imgLogo, navMain] }
        { ...gridMain, id: "main" }
        { ...gridFooter, id: "footer", ids: [lang, iconNavToggle] }
        htmlRedBtm
      ]
    }
  ]

  ###
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
          id: "langMobile"
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
  ###
