import React, { FC, useRef } from "react";
import { TextInput, TextInputProps, View, ViewStyle } from "react-native";

type Props = {
  onChangeText: (text: string) => void;
  style?: ViewStyle;
  leftIcon?: any;
  rightIcon?: any;
  textInputProps?: TextInputProps;
};

const TextField: FC<Props> = (props) => {
  const value = useRef<string>("");

  const onChangeText = (text: string) => {
    value.current = text;
  };

  return (
    <View
      style={[
        props.style,
        {
          height: 47,
          width: "100%",
          alignItems: "center",
          borderWidth: 1.5,
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 6,
          flexDirection: "row",
        },
      ]}
    >
      {props.leftIcon}
      <TextInput
        {...props.textInputProps}
        placeholderTextColor={"#D6E1FF"}
        onChangeText={onChangeText}
        style={{ flex: 1 }}
      />
      {props.rightIcon}
    </View>
  );
};

export default TextField;
