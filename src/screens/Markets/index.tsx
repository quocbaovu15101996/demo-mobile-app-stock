import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { fetchMarket } from "../../apis";
import SearchBar from "../../components/markets/SearchBar";

const Markets: FunctionComponent = () => {
  const data = useRef(null);
  const isLoading = useRef(true);
  const [_, updateState] = useState(false);

  const fetchData = async () => {
    const response = await fetchMarket();
    if (response?.status === "success") {
      data.current = response?.data;
    } else {
      // TODO:
    }
    console.log("check data ===", data.current);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar />
    </SafeAreaView>
  );
};

export default Markets;
