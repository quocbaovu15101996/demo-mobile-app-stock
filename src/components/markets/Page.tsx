import React, { FC, useCallback, useMemo } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import { CoinCard, CoinPrices } from "../../screens/types/Markets";
import Card from "./Card";

const { width } = Dimensions.get("window");

type Props = {
  list: CoinCard[];
  findCoinPrices: (marketName: string) => CoinPrices;
};

const Page: FC<Props> = (props) => {
  const renderItem: ListRenderItem<CoinCard> = useCallback(
    ({ item }) => {
      return (
        <Card item={item} priceInfo={props.findCoinPrices(item.marketName)} />
      );
    },
    [props]
  );

  const keyExtractor = useCallback(
    (_item: CoinCard, index: number): string => index.toString(),
    []
  );

  return useMemo(() => {
    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatlist}
          data={props.list}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={20}
        />
      </View>
    );
  }, [keyExtractor, props.list, renderItem]);
};

export default Page;

const styles = StyleSheet.create({
  container: {
    width,
  },
  flatlist: {
    marginTop: 10,
  },
});
