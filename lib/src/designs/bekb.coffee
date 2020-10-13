import { routes } from "../conf/routes"

data = user: require "../network/data/user"

module.exports =
  ids: [
    id: "back"
    name: "html"
    ids: [
      id: "slider-lft"
      name: "slider"
      ids: [
        id: "navMobile"
        name: "nav"
        items: routes
        events: [ev: "_helper-site-load", target: "navMobile"]
        media: max: "l"
      ]
    ]
  ,
    id: "front"
    name: "html"
    ids: [
      id: "cnt"
      name: "html"
      ids: [
        id: "h"
        name: "html"
        tag: "header"
        ids: [
          id: "hTop"
          name: "html"
          ids: [
            id: "logo"
            name: "html"
            tag: "img"
            src: "/assets/img/logo.svg"
            alt: "logo"
          ,
            id: "hTopRight"
            name: "html"
            ids: [
              id: "profile"
              name: "html"
              tag: "section"
              media: min: "l"
              ids: [
                id: "profileInner"
                name: "html"
                ids: [
                  id: "iconProfile"
                  name: "icon"
                  icon: "person"
                ,
                  id: "profileUserInfo"
                  name: "html"
                  ids: [
                    id: "profileName"
                    name: "html"
                    tag: "span"
                    text: data.user.name
                  ,
                    id: "profileUsername"
                    name: "html"
                    tag: "span"
                    text: data.user.username
                  ]
                ]
              ]
            ,
              id: "search", name: "search", placeholder: "partnerSearch"
            ]
          ]
        ,
          id: "nav"
          name: "nav"
          items: routes
          events: [{ ev: "_helper-site-load" }, { target: "nav" }]
          media: min: "l"
        ]
      ,
        id: "m", name: "html", tag: "main"
      ]
    ,
      id: "f"
      name: "html"
      tag: "footer"
      ids: [
        id: "copyright", name: "html", tag: "small", lang: "copyright"
      ,
        id: "lang", name: "lang"
      ]
    ]
  ,
    id: "navToggle"
    name: "icon"
    icon: "menu"
    events:
      click: [
        ev: "_ui-slider-toggle"
        arg: id: "slider-lft", target: "navToggle", side: "bottom"
      ,
        ev: "_ui-icon-toggle"
        arg: target: "navToggle", icons: ["close", "menu"]
      ]
    media: max: "l"
  ]
