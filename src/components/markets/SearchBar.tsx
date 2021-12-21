import React, { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import FastImage from "react-native-fast-image";
import { textPrimary } from "../../styles/text.styles";

type Props = {
  onSearchTextChange?: (text: string) => void;
};

export type SearchBarHandler = {
  clearSearchText: () => void;
};

const SearchBar = forwardRef<SearchBarHandler, Props>((props, ref) => {
  const [searchText, setSearchText] = useState("");

  useImperativeHandle(ref, () => ({
    clearSearchText: () => setSearchText(""),
  }));

  const onChangeText = (text: string) => {
    setSearchText(text);
    props.onSearchTextChange?.(text);
  };

  return (
    <View style={styles.container}>
      <Text style={[textPrimary, styles.textTitle]}>MARKETS</Text>
      <View style={styles.viewTextInput}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={searchText}
          placeholder="Search..."
        />
      </View>
      <FastImage
        source={require("../../../asset/markets/searchIcon.png")}
        style={styles.iconSearch}
      />
    </View>
  );
});

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  textTitle: {
    color: "#3D436C",
    paddingLeft: 8,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "bold",
  },
  iconSearch: {
    height: 18,
    width: 18,
    marginRight: 4,
  },
  viewTextInput: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 12,
    borderRadius: 6,
  },
  textInput: {
    ...textPrimary,
    color: "#3D436C",
    marginLeft: 4,
    maxHeight: 38,
  },
});
