import {
  getAllProductsOrSortOrSearchAndPangination,
  getProductById,
} from "../api/products";

export const getAllProducts = async (number, sort, name, pageS) => {
  try {
    const { data } = await getAllProductsOrSortOrSearchAndPangination(
      number,
      sort,
      name,
      pageS
    );
    return data;
  } catch (error) {
    console.log("get all fail client");
  }
};

export const getById = async (id) => {
  try {
    const { data } = await getProductById(id);
    return data.produtcsId;
  } catch (error) {
    console.log("get by id fail client");
  }
};
