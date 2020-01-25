import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { RootState } from "../store/rootReducer";
import { Product } from "../api/dexTestAPI";
import { connect } from "react-redux";
import { clearNotify } from "../store/helper/actions";
import { fetchProducts, fetchProductDetails } from "./productsSlice";
import { AnyAction, bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";

interface StateProps {
  init: boolean;
}

type PathParamsType = {
  id?: string;
};

/*interface PropsFromDispatch {
  aaaFunc: () => void;
  bbbFunc: (id: string | null) => void;
  cccFunc: () => void;
}*/

interface PropsFromState {
  products: Product[];
}

type PropsType = RouteComponentProps<PathParamsType> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    //other props
  };

class TestComponent extends React.Component<PropsType, StateProps> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      init: false
    };
  }

  componentDidMount() {
    this.props.aaaFunc();
    //    this.props.bbbFunc("1");
    this.props.cccFunc();
  }

  render() {
    const { init } = this.state;
    const { products } = this.props;
    //доступ к состоянию есть
    console.log(products);
    return (
      <div style={{ width: "100%", height: "100px", background: "green" }}>
        {init}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): PropsFromState => ({
  products: state.products.products
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, AnyAction>
) /*: PropsFromDispatch */ => ({
  aaaFunc: () => dispatch(clearNotify()),
  //  bbbFunc: id => dispatch(fetchProductWithProperties(id)),
  cccFunc: () => dispatch(fetchProducts()),
  bbbFunc: bindActionCreators(fetchProductDetails, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TestComponent)
);
