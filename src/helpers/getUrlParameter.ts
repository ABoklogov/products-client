type GetUrlParameter = (name: string) => string | null;

export const getUrlParameter: GetUrlParameter = (name) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
};