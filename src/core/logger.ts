export const logger = (() => {
  return {
    error: console.error,
    info: console.info,
    log: console.log,
    title: (title: string) => {
      console.log(`\n%c ${title} `, "background: #fff; color: #000");
    },
    warn: console.warn,
    group: console.group,
    groupCollapsed: console.groupCollapsed,
    groupEnd: console.groupEnd,
  };
})();
