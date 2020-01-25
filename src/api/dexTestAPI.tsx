import axios from "axios";
import parseLink, { Links } from "parse-link-header";
import { apiUrl } from "../util/Constant";

export type PropertyType = "Dropdown" | "Number" | "String";

export interface Product {
  id: number | null;
  name: string;
  image_url: string;
  price: number;
  price_dt?: number;
  description: string;
}

export interface ProductDetails extends Product {
  properties: Property[];
  productProperties: ProductProperty[];
}

export interface ProductProperty {
  id: number;
  productId: number;
  propertyId: number;
  value: string;

  property_name?: string;
  property_type?: PropertyType;
}

export interface ProductWithProperties extends Product {
  product_props: ProductProperty[];
}

export interface Property {
  id: number | null;
  name: string;
  type: PropertyType;
}

export interface User {
  id?: number;
  email: string;
  password: string;
  name?: string;
  surname?: string;
}

export interface Token {
  data: string;
}

export interface PropertiesResult {
  pageLinks: Links | null;
  pageCount: number;
  properties: Property[];
}
export interface ProductsResult {
  pageLinks: Links | null;
  pageCount: number;
  products: Product[];
}

const isLastPage = (pageLinks: Links) => {
  return (
    Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev
  );
};

const getPageCount = (pageLinks: Links) => {
  if (!pageLinks) {
    return 0;
  }
  if (isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10);
  } else {
    return 0;
  }
};

export async function getProducts(page = 1): Promise<ProductsResult> {
  //const url = `${apiUrl}/product?per_page=10&page=${page}`;
  const url = `${apiUrl}/product`;

  try {
    return axios
      .get<Product[]>(url)
      .then(response => {
        let pageCount = 0;
        const pageLinks = parseLink(response.headers.link);

        if (pageLinks !== null) {
          pageCount = getPageCount(pageLinks);
        }

        return {
          pageLinks,
          pageCount,
          products: response.data
        };
      })
      .catch(err => {
        console.log(err);

        throw err;
      });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getProductDetails(id: string): Promise<ProductDetails> {
  const url = `${apiUrl}/product/details/${id}`;
  try {
    const response = await axios.get<ProductDetails>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function delProduct(id: number) {
  const url = `${apiUrl}/product/${id}`;
  try {
    await axios.delete(url);
  } catch (err) {
    throw err;
  }
}

export async function getProperties(page = 1): Promise<PropertiesResult> {
  //const url = `${apiUrl}/properties?per_page=10&page=${page}`;
  const url = `${apiUrl}/properties`;

  try {
    const response = await axios.get<Property[]>(url);
    let pageCount = 0;
    const pageLinks = parseLink(response.headers.link);

    if (pageLinks !== null) {
      pageCount = getPageCount(pageLinks);
    }

    return {
      pageLinks,
      pageCount,
      properties: response.data
    };
  } catch (err) {
    throw err;
  }
}

export async function delProperties(id: number) {
  const url = `${apiUrl}/properties/${id}`;
  try {
    await axios.delete(url);
  } catch (err) {
    throw err;
  }
}

export async function insertProduct(product: Product) {
  const url = `${apiUrl}/product/`;
  try {
    await axios.post(url, product);
  } catch (err) {
    throw err;
  }
}

export async function updateProduct(product: Product) {
  const url = `${apiUrl}/product/${product.id}`;
  try {
    await axios.put(url, product);
  } catch (err) {
    throw err;
  }
}

/*export async function getProperty(name: string): Promise<Property[]> {
  const url = `${apiUrl}/properties?name=${name}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}*/

export async function insertProperty(property: Property) {
  const url = `${apiUrl}/properties/`;
  try {
    await axios.post(url, property);
  } catch (err) {
    throw err;
  }
}

export async function authentication(user: User, url: string): Promise<Token> {
  try {
    const response = await axios.post(`${apiUrl}/${url}`, user);
    return response.data;
  } catch (err) {
    throw err;
  }
}
