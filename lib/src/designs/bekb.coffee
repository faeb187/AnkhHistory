nav = require "../conf/nav"
navMobile = require "../conf/navResponsive"

data = user: require "../network/data/user"

module.exports =
  ids: [
    id: "back"
    name: "html"
    ids: [
      id: "slider-lft"
      name: "slider"
      ids: [{ ...navMobile }]
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
            id: "search", name: "search", placeholder: "search"
          ]
        ,
          { ...nav, media: min: "xs" }
        ,
          id: "profile"
          name: "html"
          tag: "section"
          ids: [
            id: "profileName", name: "html", tag: "span", text: data.user.name
          ,
            id: "profileUsername"
            name: "html"
            tag: "span"
            text: data.user.username
          ]
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
    icon: "menu-outline"
    events: click: [ev: "ui-slider-toggle", arg: id: "slider-lft"]
    media: max: "xs"
  ]
