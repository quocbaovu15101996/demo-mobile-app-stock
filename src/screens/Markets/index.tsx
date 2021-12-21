import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView, View } from "react-native";
import { fetchMarket, fetchMarketSummaries } from "../../apis";
import SearchBar, {
  SearchBarHandler,
} from "../../components/markets/SearchBar";
import Tabs from "../../components/markets/Tabs";
import { CoinPrices, TabCoin } from "../types/Markets";
import Page from "../../components/markets/Page";
import PagerView from "react-native-pager-view";
import { textPrimary } from "../../styles/text.styles";

const { width } = Dimensions.get("window");

const Markets: FunctionComponent = () => {
  const data = useRef<TabCoin[]>([]);
  const error = useRef(false);
  const activeTab = useRef<TabCoin | null>(null);
  const activeTabSearch = useRef<TabCoin | null>(null);
  const priceMap = useRef<CoinPrices[]>([]);
  const isLoading = useRef(true);
  const pager = useRef<PagerView>(null);
  const refSearchBar = useRef<SearchBarHandler>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      error.current = true;
      isLoading.current = false;
      setUpdateState((prevState) => !prevState);
    }
  };

  const onChangeTab = (tab: TabCoin) => {
    activeTab.current = tab;
    activeTabSearch.current = tab;
    refSearchBar.current?.clearSearchText();
    setUpdateState((prevState) => !prevState);
    pager.current?.setPage(1);
  };

  const onPressRetry = () => {
    isLoading.current = true;
    setUpdateState((prevState) => !prevState);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const findCoinPrices = (marketName: string): any => {
    return priceMap.current?.find((item) => item.market === marketName);
  };

  const onSearchTextChange = (text: string) => {
    const searchData = activeTab.current?.list?.filter((item) =>
      item.marketCurrency.toLowerCase().includes(text.toLowerCase())
    );
    activeTabSearch.current = {
      title: activeTab.current?.title ?? "",
      list: searchData ?? [],
    };
    setUpdateState((prevState) => !prevState);
  };

  if (isLoading.current) {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar />
        <View style={styles.viewLoading}>
          <ActivityIndicator
            style={styles.progress}
            color={"#6B778C"}
            size={24}
          />
        </View>
      </SafeAreaView>
    );
  }
  if (error.current) {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar />
        <View style={styles.viewLoading}>
          <Pressable onPress={onPressRetry} style={styles.btnRetry}>
            <Text style={[textPrimary, { color: "#5073F2" }]}>
              Có lỗi xảy ra vui lòng thử lại
            </Text>
          </Pressable>
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
  progress: {
    backgroundColor: "transparent",
  },
  btnRetry: {
    height: 50,
    width: 200,
    backgroundColor: "#BDCFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
});
