import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ListRenderItem,
  View,
} from "react-native";
import { TabCoin } from "../../screens/types/Markets";

type Props = {
  data?: TabCoin[];
  onChangeTab: (item: TabCoin) => void;
};

const Tabs: FC<Props> = (props) => {
  const flatListRef = useRef<FlatList>(null);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const tab = useRef(props.data?.[0]);

  useEffect(() => {
    if (tab.current) {
      props.onChangeTab(tab.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabIndex]);

  const onPressTab = useCallback((item: any, index: number) => {
    tab.current = item;
    setActiveTabIndex(index);
    flatListRef?.current?.scrollToIndex({ animated: true, index });
  }, []);

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item, index }) => {
      const isActiveTab = activeTabIndex === index;
      return (
        <TouchableOpacity
          style={[
            styles.itemTab,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: isActiveTab ? "#6992FF" : "#E4E9F9",
            },
          ]}
          activeOpacity={0.9}
          onPress={() => onPressTab(item, index)}
        >
          <Text
            style={[
              styles.textTitle,
              {
                color: isActiveTab ? "white" : "#8E92B2",
              },
            ]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    },
    [activeTabIndex, onPressTab]
  );

  const keyExtractor = (_item: any, index: number): string => index.toString();
  return useMemo(
    () => (
      <View>
        <FlatList
          ref={flatListRef}
          bounces={false}
          data={props.data}
          extraData={activeTabIndex}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    ),
    [activeTabIndex, props.data, renderItem]
  );
};

export default Tabs;

const styles = StyleSheet.create({
  itemTab: {
    alignItems: "center",
    borderRadius: 6,
    marginLeft: 10,
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginTop: 8,
  },
  textTitle: {
    textAlign: "center",
    marginTop: 4,
    marginHorizontal: 16,
    marginBottom: 8,
  },
});
