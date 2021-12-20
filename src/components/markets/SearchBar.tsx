import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import { textPrimary } from "../../styles/text.styles";

type Props = {};

const SearchBar: FC<Props> = (props) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={[
          textPrimary,
          {
            flex: 1,
            height: 20,
            color: "#3D436C",
            paddingLeft: 8,
            fontSize: 16,
            lineHeight: 16,
            fontWeight: "bold",
            color: "#3D436C",
          },
        ]}
      >
        MARKETS
      </Text>
      <Image
        source={require("../../../asset/markets/searchIcon.png")}
        style={{ height: 18, width: 18, marginRight: 4 }}
      />
    </View>
  );
};

export default SearchBar;
