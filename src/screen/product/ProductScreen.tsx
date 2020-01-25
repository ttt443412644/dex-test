import * as React from "react";
import "./ProductScreen.css";
import { Link, useLocation } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { link } from "../../util/Constant";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { fetchProductDetails } from "../productsSlice";
import { Property, ProductProperty, PropertyType } from "../../api/dexTestAPI";
import { Formik } from "formik";

interface KeyValue {
  id: number;
  propertyId: number;
  name: string;
  type: PropertyType;
  value: string;
  valueArray: string[];
}

function ProductScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const { productDetails } = useSelector((state: RootState) => {
    return {
      productDetails: state.products.productDetails
    };
  }, shallowEqual);

  React.useEffect(() => {
    const id = pathname.substring(pathname.lastIndexOf("/") + 1);
    dispatch(fetchProductDetails(id));
  }, [dispatch, pathname]);

  //значения
  const values: KeyValue[] = [];

  console.log(productDetails);

  if (productDetails !== null) {
    productDetails.properties.forEach((property: Property) => {
      //ищем проперти для нашего продукта
      productDetails.productProperties
        .filter((productProperty: ProductProperty) => {
          return productProperty.propertyId === property.id;
        })
        .forEach((productProperty: ProductProperty) => {
          const type = property.type;
          const value = productProperty.value;
          const propertyId = productProperty.propertyId;

          //если данное свойство Dropdown
          if (type === "Dropdown") {
            //ищем ранее добавленное свойство
            let found = false;
            values
              .filter((value: KeyValue) => {
                return value.propertyId === productProperty.propertyId;
              })
              .forEach((existsValue: KeyValue) => {
                existsValue.valueArray.push(value);
                found = true;
              });
            if (!found) {
              values.push({
                id: productProperty.id,
                propertyId: propertyId,
                name: property.name,
                type: type,
                value: value,
                valueArray: [value]
              });
            }
          } else {
            values.push({
              id: productProperty.id,
              propertyId: propertyId,
              name: property.name,
              type: type,
              value: value,
              valueArray: [value]
            });
          }
        });
    });

    console.log(values);
  }

  return (
    <div className="main-container">
      <div className="itemcard-container">
        <Link to={link.listing}>{"Вернуться"}</Link>
        <div className="line" />
        {productDetails !== null && (
          <div className="content">
            <div className="header">
              <img
                className="header-img"
                src={productDetails.image_url}
                alt={productDetails.name}
              />

              <div className="header-title">
                <div className="name">{productDetails.name}</div>
                <div className="description">{productDetails.description}</div>
              </div>
            </div>
            <div className="property-container scroll">
              <Formik
                onSubmit={() => {
                  console.log("submit");
                }}
                initialValues={values}
              >
                {props => {
                  const { values, handleSubmit, setFieldValue } = props;

                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="fields">
                        {//динамически заполняем
                        values.map((item: KeyValue) => {
                          return (
                            <div key={item.id} className="property">
                              <div className="property-name">{item.name}</div>

                              {item.type !== "Dropdown" ? (
                                <div className="property-value">
                                  {item.value}
                                </div>
                              ) : (
                                <FormControl
                                  variant="outlined"
                                  className="formControl"
                                >
                                  <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={item.value}
                                    onChange={(
                                      event: React.ChangeEvent<{
                                        value: unknown;
                                      }>
                                    ) => {
                                      const value = event.target
                                        .value as string;
                                      item.value = value;
                                      setFieldValue("field" + item.id, value);
                                    }}
                                  >
                                    {item.valueArray.map(
                                      (value: string, index) => {
                                        return (
                                          <MenuItem key={index} value={value}>
                                            {value}
                                          </MenuItem>
                                        );
                                      }
                                    )}
                                  </Select>
                                </FormControl>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>

            <div className="property">
              <div className="property-name">{"Стоимость"}</div>

              <div className="bottom">
                <div className="price">
                  {productDetails.price &&
                    productDetails.price
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+\.)/g, "$1 ")
                      .replace(".00", "") + " $"}
                </div>
                <button
                  className="button"
                  style={{ marginTop: "0px", marginRight: "95px" }}
                  onClick={() => {
                    const result: any[] = [];

                    values.forEach(value => {
                      result.push({
                        id: value.propertyId,
                        name: value.name,
                        value: value.value
                      });
                    });
                    alert(JSON.stringify(result));
                    console.log(values);
                  }}
                >
                  {"Беру!!!"}
                </button>
                <div />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductScreen;
