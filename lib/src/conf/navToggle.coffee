###
  @CONF   nav toggle
  @AUTHOR faeb187
###
module.exports =
  id  : 'navToggle'
  name: 'icon'
  icon: 'menu-outline'
  events:
    click: [{ ev: "ui-slider-toggle", arg: {id: 'slider-lft'} }]
