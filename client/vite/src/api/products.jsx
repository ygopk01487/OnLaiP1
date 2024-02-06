import { API } from "./url";

export const getAllProductsOrSortOrSearchAndPangination = (
  number,
  sort,
  name,
  pageS
) =>
  API.get(
    `/products/AllProducts?page=${number || ""}&sort=${sort.sort || ""}&name=${
      name || ""
    }&type=${sort.type || ""}&pageSize=${pageS || 3}`
  );

export const getProductById = (id) => API.get(`/products/IdProducts/${id}`);
