interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64, GlobalFetch, WindowOrWorkerGlobalScope, WindowEventHandlers {
  jQuery?: JQueryStatic;
  $?: JQueryStatic;
}

interface JQuery<HTMLTextAreaElement> {
  trumbowyg?: any;
}