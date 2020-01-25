import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Product,
  getProducts,
  delProduct,
  getProductDetails,
  insertProduct,
  updateProduct,
  ProductDetails
} from "../api/dexTestAPI";
import { AppThunk } from "../store";
import { sendNotify, setTabIndex } from "../store/helper/actions";

interface ProductState {
  loading: boolean;
  fetchIndex: number;

  products: Product[];
  productDetails: ProductDetails | null;
}

interface ProductsLoaded {
  products: Product[];
}

const initialState: ProductState = {
  loading: false,
  fetchIndex: 0,

  products: [],
  productDetails: null
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsStart(state) {
      state.loading = true;
    },
    getProductsFailure(state) {
      state.loading = false;
    },

    getProductsSuccess(state, action: PayloadAction<ProductsLoaded>) {
      const { products } = action.payload;
      state.products = products;
      state.loading = false;
    },

    deleteProductSuccess(state) {
      state.fetchIndex = state.fetchIndex + 1;
    },

    addProductSuccess(state) {
      state.fetchIndex = state.fetchIndex + 1;
    },

    getProductDetailsStart(state) {
      state.productDetails = null;
    },
    getProductDetailsSuccess(state, action: PayloadAction<ProductDetails>) {
      state.productDetails = action.payload;
    }
  }
});

export const {
  getProductsStart,
  getProductsFailure,
  getProductsSuccess,
  getProductDetailsStart,
  getProductDetailsSuccess,
  deleteProductSuccess,
  addProductSuccess
} = products.actions;

export default products.reducer;

export const fetchProducts = (): AppThunk => async dispatch => {
  try {
    dispatch(getProductsStart());
    const products = await getProducts();
    console.log(products);
    const result: ProductsLoaded = {
      products: products.products
    };
    dispatch(getProductsSuccess(result));
  } catch (err) {
    dispatch(getProductsFailure());

    dispatch(
      sendNotify({
        text: "Ошибка при получении списка продуктов! " + err.toString(),
        type: "dialog"
      })
    );
  }
};

export const deleteProduct = (id: number): AppThunk => async dispatch => {
  try {
    await delProduct(id);
    dispatch(deleteProductSuccess());
  } catch (err) {
    dispatch(
      sendNotify({
        text: "Ошибка при удалении продукта! " + err.toString(),
        type: "dialog"
      })
    );

    return;
  }

  dispatch(
    sendNotify({
      text: "Продукт успешно удален!",
      type: "notification"
    })
  );
};

export const fetchProductDetails = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(getProductDetailsStart());
    const product = await getProductDetails(id);
    dispatch(getProductDetailsSuccess(product));
  } catch (err) {
    dispatch(
      sendNotify({
        text: "Ошибка при получении данных о продукте! " + err.toString(),
        type: "dialog"
      })
    );
  }
};

export const addProduct = (product: Product): AppThunk => async dispatch => {
  let successText = "Продукт успешно добавлен!";
  let errorText = "Ошибка при добавлении продукта!";

  try {
    dispatch(setTabIndex(0));
    if (product.id === null) {
      await insertProduct(product);
    } else {
      successText = "Продукт успешно изменен!";
      errorText = "Ошибка при изменении продукта";

      await updateProduct(product);
    }
    dispatch(addProductSuccess());
  } catch (err) {
    dispatch(
      sendNotify({
        text: errorText + err.toString(),
        type: "dialog"
      })
    );

    return false;
  }

  dispatch(
    sendNotify({
      text: successText,
      type: "notification"
    })
  );

  return true;
};
