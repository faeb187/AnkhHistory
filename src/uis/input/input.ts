import { twoDollars as $$ } from "twodollars";

import { observer, state } from "core";
import type { AnkhUiInputOptions } from "types/ui.type";

type AnkhInput = HTMLInputElement | HTMLSelectElement;
// @todo dynamic adapter
// import { get } from "../network/adapters/apollo";
// import { ankh } from "../app/ankh";

export const input = (() => {
  const ui = {
    /*
      addItem: (item) => {
        const { id, name, placeholder, disabled, required, checked, label } = item;
        const $input = $$.create(`<${tag}/>`, {id, type});

        name && $input.setAttribute("name", name);
        placeholder && $input.setAttribute("data-lang", placeholder);
        disabled && $input.setAttribute("disabled", "true");
        required && $input.setAttribute("required", "true");
        checked && $input.setAttribute("checked", "true");
        label && $ui.appendChild($$.create("<label/>", {for: id, "data-lang": label}));

        if(datalist){
          const $datalist = $$.create("<datalist/>",{id: `${id}-list`});
          $input.setAttribute("list", `${id}-list`);
          $input.setAttribute("autocomplete", "off");
          datalist.forEach((dl) => $datalist.appendChild($$.create("<option/>", {"data-lang": dl.lang});
          $ui.appendChild($datalist);

          opts && opts.forEach((opt) =>
            $input.appendChild(
              $$.create("<option/>",{"data-lang": opt.lang, selected: opt.selected})
            ));
        }
        if(icon){
          $$.addClass($ui, "ui-input-icon");
          $ui.appendChild($$.create("<ion-icon/>",{class: "ui-icon", name: icon}));
        }
        events && ui.setEvents(options);

        $ui.appendChild($input);
      },
      */
    setState: (args: { event: Event }) => {
      const { event } = args;
      const $input = <AnkhInput>event.target;

      state.set({
        id: $input.id,
        state: $input.value,
      });
    },
    /*
      search: (options) => {
        const { events } = options;

        events.keyup?.forEach((searchEvent) => {
          const { name: eventName, $target } = searchEvent;
          if(eventName !== "_ui-input-search") return;

          const query = "{partner {partnerNo lastname firstname birthday }}";
          const $datalist = $$.find(`#${$target.id}-list`)[0];
          $datalist.innerHTML = "";

          try {
            const res = await $$.post(ankh.networkAdapter, { query });
            res?.data?.partner?.forEach((partner) => {
              const text = "#{partner.lastname} #{partner.firstname}";
              $datalist.appendChild($$.create("<option/>", {innerText: text});
            });
          } catch(error){
            console.error("[ui-input] #{ui.search}", error);
          }
        });
      },
      */

    /*
     setEvents: (options) => {
        const { id, events = {}, target: $target } = options;

        events.keyup?.forEach((searchEvent) =>
          observer.l({name: "_ankh-ui-fire", bind: {target: $target, type: "keyup"}, args: {
              name: searchEvent.name,
              target: searchEvent.target,
              value: $target.value
          });
        });
      }
    */
  };

  // @param  datalist    OPT {json[]}      list to choose from on input (e.g. search results)
  // @param  items       OPT {json[]}      checkbox|radio items
  // @param  options     OPT {json[]}      select options
  return {
    init: (options: AnkhUiInputOptions) => {
      const {
        attributes,
        attributes: { placeholder, type },
        icon,
        id,
        label,
        lang,
      } = options;

      const inputId = `${id}-input`;
      const tag = type === "select" ? "select" : "input";
      const $ui = $$.create("<div/>", { id, class: "ui-input" });
      const $input = <AnkhInput>(
        $$.create(`<${tag}/>`, { id: inputId, ...attributes })
      );

      lang && $$.addAttr($input, { "data-lang": lang });
      placeholder && $$.addAttr($input, { "data-lang": placeholder });

      $input.value = <string>state.get({ id: inputId }) || "";

      observer.l({
        name: `ui-input-${id}-state`,
        handler: ui.setState,
      });

      label &&
        $ui.append($$.create("<label/>", { for: inputId, "data-lang": label }));

      if (icon) {
        const $wrapper = $$.create("<div/>", { class: "ui-input-wrapper" });
        $wrapper.append($$.create("<ion-icon/>", { name: icon }));
        $wrapper.append($input);
        $ui.append($wrapper);
      } else $ui.append($input);

      return $ui;
    },
  };
})();
