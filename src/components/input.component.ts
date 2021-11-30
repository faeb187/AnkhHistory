import { observer } from "core";

const inputName = {
  attributes: { name: "inputName", placeholder: "name" },
  events: [
    {
      bind: {
        target: "#inputName-input",
        type: "keyup",
      },
      name: "ui-input-inputName-change",
      handler: (args: { event: Event }): void => {
        observer.f("ui-input-inputName-state", args);
      },
    },
  ],
  icon: "person",
  id: "inputName",
  label: "name",
  lang: "name",
  ui: "input",
  parentId: "form",
};
const inputFirstName = {
  attributes: { name: "inputFirstName", placeholder: "firstName" },
  events: [
    {
      bind: {
        target: "#inputFirstName-input",
        type: "keyup",
      },
      name: "ui-input-inputFirstName-change",
      handler: (args: { event: Event }): void => {
        observer.f("ui-input-inputFirstName-state", args);
      },
    },
  ],
  icon: "person",
  id: "inputFirstName",
  label: "firstName",
  lang: "firstName",
  ui: "input",
  parentId: "form",
};
const inputEmail = {
  attributes: { name: "inputEmail", placeholder: "email", type: "email" },
  events: [
    {
      bind: {
        target: "#inputEmail-input",
        type: "keyup",
      },
      name: "ui-input-inputEmail-keyup",
      handler: (args: { event: Event }): void => {
        observer.f("ui-input-inputEmail-state", args);
      },
    },
  ],
  icon: "mail",
  id: "inputEmail",
  label: "email",
  lang: "email",
  ui: "input",
  parentId: "form",
};
const inputBirthday = {
  attributes: { name: "inputDate", placeholder: "birthday", type: "date" },
  events: [
    {
      bind: {
        target: "#inputBirthday-input",
        type: "change",
      },
      name: "ui-input-inputBirthday-change",
      handler: (args: { event: Event }): void => {
        observer.f("ui-input-inputBirthday-state", args);
      },
    },
  ],
  icon: "calendar",
  id: "inputBirthday",
  label: "birthday",
  lang: "birthday",
  ui: "input",
  parentId: "form",
};
const inputNumber = {
  attributes: { name: "inputNumber", type: "number" },
  events: [
    {
      bind: {
        target: "#inputNumber-input",
        type: "keyup",
      },
      name: "ui-input-inputNumber-change",
      handler: (args: { event: Event }): void => {
        observer.f("ui-input-inputNumber-state", args);
      },
    },
  ],
  icon: "happy",
  id: "inputNumber",
  label: "favoriteNumber",
  lang: "favoriteNumber",
  ui: "input",
  parentId: "form",
};
const inputTel = {
  attributes: { name: "inputTel", placeholder: "phoneNumber", type: "tel" },
  events: [
    {
      bind: {
        target: "#inputTel-input",
        type: "keyup",
      },
      name: "ui-input-inputTel-change",
      handler: (args: { event: Event }): void => {
        observer.f("ui-input-inputTel-state", args);
      },
    },
  ],
  icon: "call",
  id: "inputTel",
  label: "phoneNumber",
  lang: "phoneNumber",
  ui: "input",
  parentId: "form",
};
const inputColor = {
  attributes: {
    name: "inputColor",
    // placeholder: "favoriteColor",
    type: "color",
  },
  events: [
    {
      bind: {
        target: "#inputColor-input",
        type: "change",
      },
      name: "ui-input-inputColor-change",
      handler: (args: { event: Event }): void => {
        observer.f("ui-input-inputColor-state", args);
      },
    },
  ],
  id: "inputColor",
  label: "favoriteColor",
  lang: "favoriteColor",
  ui: "input",
  parentId: "form",
};
const inputSubmit = {
  attributes: { type: "submit" },
  id: "inputSubmit",
  lang: "submit",
  ui: "input",
  parentId: "form",
};

export {
  inputColor,
  inputBirthday,
  inputEmail,
  inputFirstName,
  inputName,
  inputNumber,
  inputSubmit,
  inputTel,
};
