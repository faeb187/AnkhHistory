import { twoDollars as $$ } from "twodollars";

import type {
  AnkhUiTableColumn,
  AnkhUiTableOptions,
  AnkhUiTableRow,
} from "types/ui.type";

export const table = (() => ({
  init: (options: AnkhUiTableOptions) => {
    const { cols, data, id } = options;
    const $ui = $$.create("<table/>", { id, class: "ui-table" });
    const $thead = $$.create("<thead/>");
    const $theadTr = $$.create("<tr/>");
    const $tbody = $$.create("<tbody/>");

    // build all <th>'s
    const $ths = cols.map((col: AnkhUiTableColumn, index: number) => {
      const $th = $$.create("<th/>", { "data-col-index": index.toString() });
      col.lang && $th.setAttribute("data-lang", col.lang);
      col.svg && $th.setAttribute("data-svg", "true");
      col.date && $th.setAttribute("data-date", "true");
      col.currency && $th.setAttribute("data-currency", col.currency);
      col.right && $$.addClass($th, "right");
      col.width && $th.setAttribute("data-width", col.width);
      return $th;
    });

    // build all <tr>'s with data
    const $trs = data.map((tr: AnkhUiTableRow) => {
      const $tr = $$.create("<tr/>");

      cols.forEach((col: AnkhUiTableColumn, index: number) => {
        const $td = $$.create("<td/>");
        $td.setAttribute("data-col-index", index.toString());

        // type: svg
        if (col.svg) {
          const $svg = $$.create("<img/>", {
            src: `/assets/svg/${col.svg}.svg`,
          });
          $td.appendChild($svg);
        }
        // type: text
        else if (col.lang) {
          $td.setAttribute("data-lang-rendered", "true");
          $td.setAttribute("data-lang", col.lang);

          const v = tr[col.lang];

          /*if (col.date) {
            // v = v // todo format without moment
            $td.setAttribute("data-date", "true");
          } else if (col.currency) {
            v = v.toLocaleString("de");
            $td.setAttribute("data-currency", col.currency);
          }*/
          $td.innerText = v;
        }
        col.right && $$.addClass($td, "right");
        $tr.appendChild($td);
      });
      return $tr;
    });

    $ths.forEach(($th) => $theadTr.appendChild($th));
    $thead.appendChild($theadTr);
    $trs.forEach(($tr) => $tbody.appendChild($tr));
    $ui.appendChild($thead);
    $ui.appendChild($tbody);
    return $ui;
  },
}))();
