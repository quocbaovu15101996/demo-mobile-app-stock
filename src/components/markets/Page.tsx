import React, { FC } from "react";
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
  const renderItem: ListRenderItem<CoinCard> = ({ item }) => {
    return (
      <Card item={item} priceInfo={props.findCoinPrices(item.marketName)} />
    );
  };
  const keyExtractor = (_item: CoinCard, index: number): string =>
    index.toString();

  return (
    <View style={{ width }}>
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
};
export default Page;

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 10,
  },
});
