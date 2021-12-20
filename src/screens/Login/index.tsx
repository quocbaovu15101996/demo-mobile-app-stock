import React, { FunctionComponent } from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { Navigation } from "react-native-navigation";
import TextField from "../../components/login/TextField";
import { startApp } from "../../libs/navigation/Utils";
import { textPrimary } from "../../styles/text.styles";

const Login: FunctionComponent = () => {
  const actionActiveMarkets = () => {
    Navigation.mergeOptions("MARKETS_TAB", {
      bottomTabs: {
        currentTabIndex: 1,
      },
    });
  };
  const onPressSignIn = () => {
    startApp(actionActiveMarkets);
  };
  return (
    <>
      <StatusBar translucent backgroundColor="red" hidden={true} />
      <ImageBackground
        source={require("../../../asset/login/backgroundLogin.png")}
        style={styles.flex1}
      >
        <View style={styles.content}>
          <Image
            source={require("../../../asset/login/logo.png")}
            style={styles.iconLogo}
          />
          <Text style={[textPrimary, styles.textSignIn]}>Sign in</Text>
          <Text style={[textPrimary, styles.textGuide]}>
            Please sign in to continue
          </Text>

          <TextField
            onChangeText={() => {}}
            style={{ marginTop: 60, paddingHorizontal: 14 }}
            textInputProps={{
              placeholder: "Email",
            }}
            leftIcon={
              <Image
                source={require("../../../asset/login/userIcon.png")}
                style={{ marginRight: 9 }}
              />
            }
          />
          <TextField
            onChangeText={() => {}}
            style={{ marginTop: 10, paddingHorizontal: 14 }}
            textInputProps={{
              placeholder: "Password",
            }}
            leftIcon={
              <Image
                source={require("../../../asset/login/passwordIcon.png")}
                style={{ marginRight: 9 }}
              />
            }
            rightIcon={
              <Image source={require("../../../asset/login/eyeIcon.png")} />
            }
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 16,
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 19,
                width: 19,
                borderRadius: 4,
                borderWidth: 1.5,
                borderColor: "rgba(255, 255, 255, 0.2)",
                marginRight: 6,
              }}
            />
            <Text style={[textPrimary, { flex: 1 }]}>Remember me</Text>
            <Text style={[textPrimary]}>Forgot your password?</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            alignItems: "center",
            paddingBottom: 62,
          }}
        >
          <Pressable onPress={onPressSignIn} style={styles.btnSignIn}>
            <Text
              style={[
                textPrimary,
                { lineHeight: 16, color: "#5073F2", fontWeight: "bold" },
              ]}
            >
              SIGN IN
            </Text>
          </Pressable>
          <Text style={[textPrimary, { marginTop: 20 }]}>
            Don’t have an account yet?{" "}
            <Text style={[textPrimary, { fontWeight: "bold" }]}>SIGN UP</Text>
          </Text>
        </View>
      </ImageBackground>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  content: { flex: 1, alignItems: "center", paddingHorizontal: 10 },
  iconLogo: { height: 55, width: 55, marginTop: 80 },
  textSignIn: {
    fontWeight: "900",
    fontSize: 23,
    lineHeight: 30,
    marginTop: 24,
    marginBottom: 9,
  },
  textGuide: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
  },
  btnSignIn: {
    width: "100%",
    height: 45,
    backgroundColor: "#BDCFFF",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "rgba(98, 120, 241, 0.5)",
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
