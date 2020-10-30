import { copy } from "../../../utils/basic.util"

import { htmlRedTop, htmlRedBtm } from "../../components/html.component"
import { iconNavToggle } from "../../components/icon.component"
import { imgMobileLogo, imgLogo } from "../../components/img.component"
import { lang } from "../../components/lang.component"
import { navMain, navPartner } from "../../components/nav.component"
import { navMobile } from "../../components/list.component"
import {
  grid24
  gridHeader
  gridMain
  gridFooter
} from "../../components/grid.component"

navMobileWrapper = copy grid24
navMobileWrapper.style = {
  ...navMobileWrapper.style
  background: "#fff"
  position: "absolute"
  top: 0
  bottom: 0
  left: 0
  right: 0
  zIndex: 9999
}

navMobileFooter =
  id: "navMobileFooter"
  ui: "grid"
  style:
    alignItems: "center"
    gridColumn: "2 / 24"
    gridRow: "-4 / -2"
    gridTemplateColumns: "repeat(24, 1fr)"
  ids: [
    id: "langMobile"
    ui: "lang"
    style:
      display: "inline-grid"
      gridArea: "1/1/2/3"
      gridTemplateColumns: "1fr 1fr"
  ,
    id: "iconNavToggleX"
    ui: "icon"
    icon: "close"
    events: click: [name: "ui-list-toggle", args: toToggle: "navMobileWrapper"]
  ]

export partnerAdditionalProducts =
  ids: [
    {
      ...copy(grid24)
      id: "app"
      ids: [
        htmlRedTop
        {
          ...gridHeader
          id: "header"
          ids: [imgMobileLogo, imgLogo, navMain, navPartner]
        }
        { ...gridMain, id: "main" }
        {
          ...gridFooter
          id: "footer"
          ids: [{ ...lang, media: min: "l" }, iconNavToggle]
        }
        htmlRedBtm
      ]
    }
    {
      ...navMobileWrapper
      id: "navMobileWrapper"
      className: "hidden"
      media: max: "l"
      ids: [
        { ...copy(htmlRedTop), id: "redTopNavMobile" }
        { ...navMobile, id: "navMobile" }
        navMobileFooter
        { ...copy(htmlRedBtm), id: "redBtmNavMobile" }
      ]
    }
  ]
