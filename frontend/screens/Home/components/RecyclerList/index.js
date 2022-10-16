import React, { Component } from "react";
import { View, StyleSheet, Dimensions, RefreshControl } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { fetchHomeScreenData } from "../../../../redux/app/actions/app-actions";
import RenderRow from "./RenderRow";
import { connect } from "react-redux";
import firestore from "@react-native-firebase/firestore";

class RecyclerList extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef(0);

    let data = this.props.data;
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }).cloneWithRows(data),
    };
  }
  width = Dimensions.get("window").width;
  height = Dimensions.get("window").height;

  layoutProvider = new LayoutProvider(
    (index) => {
      return index;
    },
    (type, dim) => {
      (dim.width = this.width * 0.9), (dim.height = this.height * 0.38);
    }
  );

  rowRenderer = (type, item) => {
    return (
      <>
        <RenderRow item={item} navigation={this.props.navigation} />
      </>
    );
  };
  footerRenderer = () => {
    return (
      <>
        <View style={{ marginBottom: 10 }} />
      </>
    );
  };

  componentDidMount() {
    this.firstLoad = true;
    this.getRealtimeProductsData();
  }

  getRealtimeProductsData = () => {
    this.subscriber = firestore()
      .collection("products")
      .onSnapshot(
        (querySnapshot) => {
          if (this.firstLoad) {
            this.firstLoad = false;
          } else {
            querySnapshot.docChanges().map((change) => {
              const docData = change.doc.data();
              if (change.type == "removed") {
                const filteredData = this.state.dataProvider._data.filter(
                  (item) => item.id !== docData.id
                );
                this.setState({
                  dataProvider:
                    this.state.dataProvider.cloneWithRows(filteredData),
                });
              }
              if (change.type == "added") {
                this.setState({
                  dataProvider: this.state.dataProvider.cloneWithRows([
                    ...this.state.dataProvider._data,
                    docData,
                  ]),
                });
              }
              if (change.type == "modified") {
                let arr = [];
                this.state.dataProvider._data.forEach((item) => {
                  if (item.id == docData.id) {
                    arr.push(docData);
                  } else {
                    arr.push(item);
                  }
                });
                this.setState({
                  dataProvider: this.state.dataProvider.cloneWithRows(arr),
                });
              }
            });
          }
        },
        (error) => {}
      );
  };

  componentWillUnmount() {
    this.subscriber();
  }

  refetchProducts = () => {
    this.props.fetchProductItems();
  };

  Pressed = () => {};

  render() {
    let dataLength = this.state.dataProvider._data.length !== 0;
    const loading = this.props.loadingReducer;
    const requests = loading?.REQUEST?.id;
    const isFetchingProducts = requests?.includes("HOME_SCREEN_DATA_REQUEST");

    return (
      <>
        {dataLength ? (
          <>
            <RecyclerListView
              dataProvider={this.state.dataProvider}
              layoutProvider={this.layoutProvider}
              rowRenderer={this.rowRenderer}
              renderFooter={this.footerRenderer}
              scrollViewProps={{
                showsVerticalScrollIndicator: false,
                refreshControl: (
                  <RefreshControl
                    refreshing={isFetchingProducts}
                    onRefresh={this.refetchProducts}
                  />
                ),
              }}
              style={styles.innerScrollViewStyle}
            />
          </>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductItems: () => dispatch(fetchHomeScreenData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecyclerList);

const styles = StyleSheet.create({
  innerScrollViewStyle: {
    position: "absolute",
    top: 100,
    left: 18,
    right: 18,
    bottom: 0,
  },
});
