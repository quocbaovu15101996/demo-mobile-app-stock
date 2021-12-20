import { Navigation } from "react-native-navigation";
import { startLogin } from "./libs/navigation/Utils";
import { registerScreens } from "./screens";

const start = () => {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(() => {
    startLogin();
  });
};

export { start };
