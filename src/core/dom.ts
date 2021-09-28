import type { KeyValue } from "types/basic.type";
import type { AnkhEventDom } from "types/event.type";

export const $$ = (() => {
  const d = document;
  const dp = new DOMParser();
  // const isHTMLElement = (element: unknown) => element instanceof HTMLElement;

  const $$ = (element: string, attributes?: KeyValue) => {
    const $element = d.createElement(element.slice(1, -2));

    attributes &&
      Object.entries(attributes).forEach(([key, value]) =>
        $element.setAttribute(key, value)
      );
    return $element;
  };

  $$.find = (
    selector: string,
    target: HTMLElement | DocumentFragment = document.body
  ): HTMLElement[] => Array.from(target.querySelectorAll(selector));

  $$.append = (toAppend: HTMLElement, $t: HTMLElement) => {
    $t.appendChild(toAppend);
    return $$;
  };

  $$.measure = (str: string, fontSize?: number) => {
    const $helper = $$("<span/>", { innerText: str });

    $$.css($helper, {
      position: "absolute",
      left: "-9999px",
      top: "-9999px",
    });

    fontSize && $$.css($helper, { fontSize: `${fontSize}px` });

    document.body.appendChild($helper);

    const measures = {
      h: $helper.clientHeight,
      w: $helper.clientWidth,
    };
    document.body.removeChild($helper);
    return measures;
  };

  $$.parse = (str: string) => dp.parseFromString(str, "text/html");

  $$.css = ($element: HTMLElement, props?: KeyValue) => {
    props &&
      Object.entries(props).forEach(([key, value]) =>
        $element.setAttribute("styles", `${key}: ${value}`)
      );
    return $$;
    // const v = window.getComputedStyle(elms)[obj];
    // return v.slice(-2) === "px" && v.indexOf(" ") === -1 ? parseFloat(v) : v;
  };

  $$.parent = ($element: HTMLElement, selector?: string): HTMLElement => {
    if (!selector) return $element.parentNode as HTMLElement;

    const selectorMatch = ($elm: HTMLElement, sel: string): HTMLElement =>
      $elm.matches(sel)
        ? $elm
        : selectorMatch($elm.parentNode as HTMLElement, sel);

    return selectorMatch($element.parentNode as HTMLElement, selector);
  };

  $$.hasClass = (elementOrSelector: HTMLElement | string, cn: string) => {
    const $element =
      typeof elementOrSelector === "string"
        ? $$(elementOrSelector)
        : elementOrSelector;
    return $element.classList.contains(cn);
  };

  $$.addClass = (element: HTMLElement, cn: string) => {
    !element.classList.contains(cn) && element.classList.add(cn);
    return $$;
  };

  $$.removeClass = (element: HTMLElement, cn: string) => {
    element.classList.contains(cn) && element.classList.remove(cn);
    return $$;
  };

  $$.toggleClass = (element: HTMLElement, toToggle: string) => {
    element.classList.toggle(toToggle);
    return $$;
  };

  $$.addAttr = (element: HTMLElement, attributes?: KeyValue) => {
    attributes &&
      Object.entries(attributes).forEach(([key, value]) =>
        element.setAttribute(key, value)
      );
    return $$;
  };

  $$.ucFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  $$.extend = (target: KeyValue, extension?: KeyValue) => {
    extension &&
      Object.entries(extension).forEach(
        ([key, value]) => (target[key] = value)
      );
    return target;
  };

  $$.index = ($element: HTMLElement) => {
    const $parent = $element.parentNode as HTMLElement;
    return Array.prototype.indexOf.call($parent.childNodes, $element);
  };

  $$.listen = (event: AnkhEventDom) => {
    const { handler, target, type } = event;
    if (handler) target.addEventListener(type, handler);
    return $$;
  };

  $$.destroy = (event: AnkhEventDom) => {
    const { handler, target, type } = event;
    if (handler) target.removeEventListener(type, handler);
    return $$;
  };

  $$.post = (url: string, data: KeyValue) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
      xhr.onload = () => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = (error) => reject(error);
    });
  };

  type PreloadOptions = {
    items: string[];
    onFileLoaded: (src: string) => void;
    onFinish: (totalLoaded: number) => void;
  };

  $$.preload = (opt: PreloadOptions) => {
    const { items, onFileLoaded, onFinish } = opt;
    const toLoad = items.length;
    const supported = ["jpg", "png"];
    let loaded = 0;

    items.forEach((item: string) => {
      const type = item.split(".").pop();
      if (type && supported.indexOf(type) === -1) return;

      const img = new Image();
      img.onload = () => {
        if (++loaded === toLoad) onFinish(toLoad);
        else onFileLoaded(img.getAttribute("src") || "");
      };
      img.src = item;
    });
  };

  $$.history = {
    go: (name: string, path: string) =>
      window.history.pushState({ site: name }, "", path),
  };

  return $$;
})();
