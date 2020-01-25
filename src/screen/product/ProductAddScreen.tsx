import * as React from "react";
import "./ProductScreen.css";
import "./ProductAddScreen.css";
import { link } from "../../util/Constant";
import { Product } from "../../api/dexTestAPI";
import { Formik } from "formik";
import ItemCardSchema from "../../component/form/validation/ItemCardSchema";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useLocation } from "react-router-dom";
import { fetchProductDetails, addProduct } from "../productsSlice";

//https://fooobar.com/questions/2448454/react-router-typescript-errors-on-withrouter-after-updating-version
function ProductAddScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const pathname = location.pathname;

  const { productDetails } = useSelector((state: RootState) => {
    return {
      productDetails: state.products.productDetails
    };
  }, shallowEqual);

  React.useEffect(() => {
    dispatch(
      fetchProductDetails(pathname.substring(pathname.lastIndexOf("/") + 1))
    );
  }, [dispatch, pathname]);

  const submitAction = (product: Product) => {
    const promise: any = dispatch(addProduct(product));
    (promise as Promise<boolean>).then((result: boolean) => {
      result && history.push(link.listing);
    });
  };

  return (
    <div className="main-container">
      <div className="itemcard-container itemcardedit-container">
        {productDetails && (
          <Formik
            initialValues={{
              name: productDetails?.name,
              description: productDetails?.description,
              price: productDetails?.price,
              image: productDetails?.image_url
            }}
            validationSchema={ItemCardSchema}
            onSubmit={async values => {
              //    console.log(image);

              const product: Product = {
                id: productDetails?.id || null,
                name: values.name!,
                description: values.description!,
                price: values.price!,
                image_url:
                  "https://sales.mercedes-orenburg.ru/image/cache/catalog/cars/order_0852438909_uploaded/15574639295220015-1920x1080_crop.jpg"
              };

              submitAction(product);
            }}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
              } = props;

              return (
                <form onSubmit={handleSubmit} className="form-container">
                  <div className="button-container">
                    <button
                      className="button cancel"
                      type="button"
                      onClick={(_: React.MouseEvent<HTMLButtonElement>) => {
                        history.push(link.listing);
                        //        history.goBack();
                      }}
                    >
                      {"Вернуться"}
                    </button>

                    <button
                      className="button save"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {"Сохранить"}
                    </button>
                  </div>

                  <div className="fields">
                    <div className="title">
                      <p>
                        {productDetails
                          ? "Редактирование товара"
                          : "Добавление товара"}
                      </p>
                    </div>
                    <label className="label" htmlFor="name">
                      {"Название товара"}
                      <span>{"*"}</span>
                    </label>

                    <input
                      id="name"
                      placeholder="Mercedes S550 4matic"
                      type="text"
                      maxLength={100}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name
                          ? "field field-error"
                          : "field"
                      }
                    />
                    {errors.name && touched.name && (
                      <div className="text-error">{errors.name}</div>
                    )}

                    <label className="label" htmlFor="price">
                      {"Стоимость"}
                      <span>{"*"}</span>
                    </label>

                    <input
                      id="price"
                      placeholder="113 000"
                      type="number"
                      maxLength={7}
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.price && touched.price
                          ? "field field-error"
                          : "field"
                      }
                    />
                    {errors.price && touched.price && (
                      <div className="text-error">{errors.price}</div>
                    )}

                    <label className="label">
                      {"Изображение"}
                      <span>{"*"}</span>
                    </label>

                    <label className="label field file-label" htmlFor="image">
                      <span>{values.image}</span>
                      <FontAwesomeIcon icon={faUpload} />
                    </label>

                    <input
                      id="image"
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={(event: any) => {
                        //https://stackoverflow.com/questions/56149756/reactjs-how-to-handle-image-file-upload-with-formik
                        //                     event: React.ChangeEvent<{ value: unknown }>
                        const files = event.target.files;
                        if (files.length > 0) {
                          setFieldValue("image", files[0].name);
                          //setFile(files[0]);
                        }

                        //setChanged(handleChange, event);
                      }}
                      onBlur={handleBlur}
                      className={"inputfile"}
                    />
                    {errors.image && touched.image && (
                      <div className="text-error">{errors.image}</div>
                    )}

                    <label className="label" htmlFor="description">
                      {"Описание"}
                    </label>

                    <textarea
                      id="description"
                      placeholder=""
                      maxLength={500}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={"field textarea"}
                    />
                  </div>
                </form>
              );
            }}
          </Formik>
        )}
      </div>
    </div>
  );
}
export default ProductAddScreen;
