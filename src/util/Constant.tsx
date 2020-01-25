export const apiUrl: string =
  window.location.href.indexOf("127.0.0.1") !== -1 ||
  window.location.href.indexOf("192.168.0.") !== -1
    ? "http://192.168.0.219:5000"
    : window.location.href.indexOf("172.20.") !== -1
    ? "http://172.20.31.14:5000"
    : "http://217.19.211.110:7789";

export const link = {
  login: "/login",
  registration: "/registration",
  listing: "/listing",
  product: "/product",
  productAdd: "/product/add",
  productEdit: "/product/edit",
  propertyAdd: "/property/add"
};
/*
export const loginLink: string = "/login";
export const registrationLink: string = "/registration";

export const listingLink: string = "/listing";
export const productLink: string = "/product";
export const productAddLink: string = "/product/add";
export const productEditLink: string = "/product/edit";

export const propertyAddLink: string = "/property/add";
 */
