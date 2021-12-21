import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { SafeAreaView, View } from "react-native";
import { PagerView } from "react-native-pager-view";
import { fetchMarket, fetchMarketSummaries } from "../../apis";
import SearchBar from "../../components/markets/SearchBar";
import Tabs from "../../components/markets/Tabs";
import { TabCoin } from "../types/Markets";
import Page from "../../components/markets/Page";

const { width } = Dimensions.get("window");

const Markets: FunctionComponent = () => {
  const data = useRef<TabCoin[]>([]);
  const activeTab = useRef<TabCoin | null>(null);
  const priceMap = useRef<any>([]);
  const isLoading = useRef(true);
  const pager = useRef<PagerView>(null);
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
    setUpdateState((prevState) => !prevState);
    pager.current?.setPage(1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const findPriceInfoCoin = (marketName: string): any => {
    return priceMap.current?.find((item) => item.market === marketName);
  };

  if (isLoading.current) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar />
        <ActivityIndicator
          style={{ backgroundColor: "transparent" }}
          color={"#6B778C"}
          size={24}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEF0FA" }}>
      <SearchBar />
      <Tabs data={data.current} onChangeTab={onChangeTab} />
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        scrollEnabled={false}
        ref={pager}
      >
        <View key="1" style={{ width }}>
          <Page
            list={data.current?.[0]?.list ?? []}
            findPriceInfoCoin={findPriceInfoCoin}
          />
        </View>
        <View key="2" style={{ width }}>
          <Page
            list={activeTab.current?.list ?? []}
            findPriceInfoCoin={findPriceInfoCoin}
          />
        </View>
      </PagerView>
    </SafeAreaView>
  );
};

export default Markets;
