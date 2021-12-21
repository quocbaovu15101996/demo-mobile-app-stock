import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView, View } from "react-native";
import { PagerView } from "react-native-pager-view";
import { fetchMarket, fetchMarketSummaries } from "../../apis";
import SearchBar, {
  SearchBarHandler,
} from "../../components/markets/SearchBar";
import Tabs from "../../components/markets/Tabs";
import { TabCoin } from "../types/Markets";
import Page from "../../components/markets/Page";

const { width } = Dimensions.get("window");

const Markets: FunctionComponent = () => {
  const data = useRef<TabCoin[]>([]);
  const activeTab = useRef<TabCoin | null>(null);
  const activeTabSearch = useRef<TabCoin | null>(null);
  const priceMap = useRef<any>([]);
  const isLoading = useRef(true);
  const pager = useRef<PagerView>(null);
  const refSearchBar = useRef<SearchBarHandler>(null);
  const [_, setUpdateState] = useState<boolean>(false);

  const fetchData = async () => {
    const response = await Promise.all([fetchMarket(), fetchMarketSummaries()]);
    if (
      response?.[0]?.status === "success" &&
      response?.[1]?.status === "success"
    ) {
      data.current = response?.[0]?.data;
      priceMap.current = response?.[1]?.data;
      isLoading.current = false;
      setUpdateState((prevState) => !prevState);
    } else {
      isLoading.current = false;
      setUpdateState((prevState) => !prevState);
    }
  };

  const onChangeTab = (tab, index) => {
    activeTab.current = tab;
    activeTabSearch.current = tab;
    refSearchBar.current?.clearSearchText();
    setUpdateState((prevState) => !prevState);
    pager.current?.setPage(1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const findCoinPrices = (marketName: string): any => {
    return priceMap.current?.find((item) => item.market === marketName);
  };

  const onSearchTextChange = (text: string) => {
    const dataTest = activeTab.current?.list?.filter((item) =>
      item.marketCurrency.toLowerCase().includes(text.toLowerCase())
    );
    activeTabSearch.current = {
      title: activeTab.current?.title ?? "",
      list: dataTest ?? [],
    };
    setUpdateState((prevState) => !prevState);
  };

  if (isLoading.current) {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar />
        <View style={styles.viewLoading}>
          <ActivityIndicator
            style={{ backgroundColor: "transparent" }}
            color={"#6B778C"}
            size={24}
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearchTextChange={onSearchTextChange} ref={refSearchBar} />
      <Tabs data={data.current} onChangeTab={onChangeTab} />
      <PagerView
        style={styles.container}
        initialPage={0}
        scrollEnabled={false}
        ref={pager}
      >
        <View key="page" style={{ width }}>
          <Page
            list={activeTabSearch.current?.list ?? []}
            findCoinPrices={findCoinPrices}
          />
        </View>
      </PagerView>
    </SafeAreaView>
  );
};

export default Markets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF0FA",
  },
  viewLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
