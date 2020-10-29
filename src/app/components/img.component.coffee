common =
  ui: "html"
  tag: "img"
  lang: "bekb"

export imgMobileLogo = {
  ...common
  id: "logoSmall"
  src: "/assets/img/logo-small.png"
  media: max: "l"
}

export imgLogo = {
  ...common
  id: "logo"
  src: "/assets/img/logo.svg"
  media: min: "l"
}
