import * as React from "react";
import "./ListingScreen.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TablePanel } from "../../component/table/TablePanel";
import { TabPanel, a11yProps } from "../../component/tab/TabPanel";
import { Link } from "react-router-dom";
import { link } from "../../util/Constant";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchProperties } from "../propertiesSlice";
import { fetchProducts } from "../productsSlice";
import { RootState } from "../../store/rootReducer";
import { productsColumns, propertiesColumns } from "./listingHelper";
import { setTabIndex } from "../../store/helper/actions";
import { TabIndexType } from "../../store/helper/types";

function ListingScreen() {
  const dispatch = useDispatch();

  const {
    productsLoading,
    products,
    productsFetchIndex,

    tabIndex,

    propertiesLoading,
    properties,
    propertiesFetchIndex
  } = useSelector((state: RootState) => {
    return {
      productsLoading: state.products.loading,
      productsFetchIndex: state.products.fetchIndex,
      products: state.products,

      tabIndex: state.helper.tabIndex,

      propertiesLoading: state.properties.loading,
      properties: state.properties,
      propertiesFetchIndex: state.properties.fetchIndex
    };
  }, shallowEqual);

  //получаем данные
  React.useEffect(() => {
    if (tabIndex === 0) {
      dispatch(fetchProducts());
    }
    if (tabIndex === 1) {
      dispatch(fetchProperties());
    }
  }, [dispatch, tabIndex, productsFetchIndex, propertiesFetchIndex]);

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    dispatch(setTabIndex(newValue as TabIndexType));
  };

  //добавляем для проперти

  let renderProducts;

  if (products) {
    const columns = productsColumns(dispatch);
    renderProducts = (
      <TablePanel
        columns={columns}
        data={products.products}
        defOrderFieldName={"name"}
      />
    );
  } else if (productsLoading) {
    renderProducts = (
      <div>
        <p>Loading products...</p>
      </div>
    );
  }

  let renderProperties;

  if (properties) {
    const columns = propertiesColumns(dispatch);
    renderProperties = (
      <TablePanel
        columns={columns}
        data={properties.properties}
        defOrderFieldName={"name"}
      />
    );
  } else if (propertiesLoading) {
    renderProducts = (
      <div>
        <p>Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="listing-tabs-container">
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Листинг товаров" {...a11yProps(0)} />
          <Tab label="Листинг проперти" {...a11yProps(1)} />
        </Tabs>
      </div>
      <div className="listing-container">
        <TabPanel value={tabIndex} index={0}>
          <div className="listing-controls-container">
            <Link
              to={link.productAdd}
              className="button"
              style={{ marginTop: "0px", marginRight: "95px" }}
            >
              {"Добавить товар"}
            </Link>
          </div>
          {renderProducts}
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <div className="listing-controls-container">
            <Link
              to={link.propertyAdd}
              className="button"
              style={{ marginTop: "0px", marginRight: "95px" }}
            >
              {"Добавить проперти"}
            </Link>
          </div>
          {renderProperties}
        </TabPanel>
      </div>
    </div>
  );
}

export default ListingScreen;
