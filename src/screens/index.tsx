import { Navigation } from "react-native-navigation";
import Home from "./Home";
import Login from "./Login";
import Markets from "./Markets";
import { Screens } from "./Screens";

function registerScreens(): void {
  Navigation.registerComponent(Screens.Login, () => Login);

  Navigation.registerComponent(Screens.Home, () => Home);
  Navigation.registerComponent(Screens.Markets, () => Markets);
}

export { registerScreens };
