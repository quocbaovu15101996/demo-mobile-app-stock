import React, { FC } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { CoinCard, CoinPrices } from "../../screens/types/Markets";
import { textPrimary } from "../../styles/text.styles";

type Props = {
  item: CoinCard;
  priceInfo?: CoinPrices;
};
const Card: FC<Props> = ({ item, priceInfo }) => {
  const coinName = item.marketCurrency.toLowerCase();
  const imageUrl = `https://tokenize.exchange/assets/images/currency-logos/${coinName}.png`;
  let percentIncrease = 0;
  let increase = 0;
  const askPrice = priceInfo?.askPrice ?? 0;
  const lowPrice = priceInfo?.low ?? 1;
  if (priceInfo) {
    increase = askPrice - lowPrice;
    percentIncrease = Math.round((increase / (lowPrice ?? 1)) * 100) / 100;
    if (!percentIncrease) {
      percentIncrease = 0;
    }
  }

  const textPercent =
    increase > 0 ? `+${percentIncrease}%` : `-${percentIncrease}%`;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.viewImage}
        />
        <View style={styles.flex1}>
          <Text style={[textPrimary, styles.textName]}>
            {item.marketCurrency}
          </Text>
          <Text style={[textPrimary, styles.textFullName]}>
            {item.marketCurrencyLong}
          </Text>
        </View>
        <View style={styles.viewPriceInfo}>
          <Text style={styles.textPrice}>${askPrice}</Text>
          <Text
            style={[
              styles.textPercent,
              { color: increase > 0 ? "#3BBA7D" : "#F94B5C" },
            ]}
          >
            {textPercent}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
    maxHeight: 74,
    borderRadius: 8,
  },
  content: {
    flexDirection: "row",
    padding: 18,
  },
  viewPriceInfo: {
    alignItems: "flex-end",
  },
  textName: {
    color: "#3D436C",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "bold",
  },
  textFullName: {
    color: "#8E92B2",
    fontWeight: "500",
  },
  textPrice: {
    ...textPrimary,
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 18,
    color: "#3D436C",
  },
  textPercent: {
    ...textPrimary,
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18,
  },
  viewImage: {
    height: 38,
    width: 38,
    borderRadius: 8,
    marginRight: 15,
  },
});
