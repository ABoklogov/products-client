type SetUrlParameter = <T extends string>(name: string, value: T) => void;

export const setUrlParameter: SetUrlParameter = (name, value) => {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState({}, '', url.toString());
};