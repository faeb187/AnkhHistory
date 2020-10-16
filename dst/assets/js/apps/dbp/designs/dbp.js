"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbp = void 0;

var _routes = require("../conf/routes");

var _user = require("../data/user");

var dbp = {
  ids: [{
    id: "back",
    ui: "html",
    ids: [{
      id: "slider-lft",
      ui: "slider",
      ids: [{
        id: "navMobile",
        ui: "list",
        items: _routes.routes,
        role: "navigation",
        events: {
          click: [{
            name: "_helper-site-load",
            target: "navMobile"
          }]
        },
        media: {
          max: "l"
        }
      }]
    }]
  }, {
    id: "front",
    ui: "html",
    ids: [{
      id: "cnt",
      ui: "html",
      ids: [{
        id: "h",
        ui: "html",
        tag: "header",
        ids: [{
          id: "hTop",
          ui: "html",
          ids: [{
            id: "logo",
            lang: "bekb",
            ui: "html",
            tag: "img",
            src: "/assets/img/logo.svg",
            alt: "logo"
          }, {
            id: "hTopRight",
            ui: "html",
            ids: [{
              id: "profile",
              ui: "html",
              tag: "section",
              media: {
                min: "l"
              },
              ids: [{
                id: "profileInner",
                ui: "html",
                ids: [{
                  id: "iconProfile",
                  ui: "icon",
                  icon: "person"
                }, {
                  id: "profileUserInfo",
                  ui: "html",
                  ids: [{
                    id: "profileName",
                    ui: "html",
                    tag: "span",
                    text: _user.user.name
                  }, {
                    id: "profileUsername",
                    ui: "html",
                    tag: "span",
                    text: _user.user.username
                  }]
                }]
              }]
            }, {
              id: "search",
              ui: "input",
              placeholder: "partnerSearch"
            }]
          }]
        }, {
          id: "nav",
          ui: "list",
          items: _routes.routes,
          role: "navigation",
          events: {
            click: [{
              name: "_helper-site-load",
              target: "nav"
            }]
          },
          media: {
            min: "l"
          }
        }]
      }, {
        id: "m",
        ui: "html",
        tag: "main"
      }]
    }, {
      id: "f",
      ui: "html",
      tag: "footer",
      ids: [{
        id: "copyright",
        ui: "html",
        tag: "small",
        lang: "copyright"
      }, {
        id: "lang",
        ui: "lang"
      }]
    }]
  }, {
    id: "navToggle",
    ui: "icon",
    icon: "menu",
    events: {
      click: [{
        name: "_ui-slider-toggle",
        target: "slider-lft",
        side: "bottom"
      }, {
        name: "_ui-icon-toggle",
        target: "navToggle",
        icons: ["close", "menu"]
      }]
    },
    media: {
      max: "l"
    }
  }]
};
exports.dbp = dbp;