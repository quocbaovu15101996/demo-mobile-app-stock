import { LayoutRoot, Navigation } from "react-native-navigation";
import { Screens } from "../../screens/Screens";

const layoutAuthenticate: LayoutRoot = {
  root: {
    stack: {
      id: "StackLogin",
      children: [
        {
          component: {
            name: Screens.Login,
            options: {
              topBar: {
                visible: false,
                height: 0,
              },
              statusBar: {
                visible: false,
                drawBehind: false,
              },
            },
          },
        },
      ],
    },
  },
};

export function startLogin(): void {
  Navigation.setRoot(layoutAuthenticate);
}

const layoutRoot: LayoutRoot = {
  root: {
    bottomTabs: {
      id: "BOTTOM_TABS_LAYOUT",
      children: [
        {
          stack: {
            id: "HOME_TAB",
            children: [
              {
                component: {
                  id: "HOME_SCREEN",
                  name: Screens.Home,
                  options: {
                    topBar: {
                      visible: false,
                      height: 0,
                    },
                    statusBar: {
                      backgroundColor: "#F8F9FD",
                    },
                  },
                },
              },
            ],
            options: {
              bottomTab: {
                testID: "HOME_SCREEN_TAB",
                text: "Trang chủ",
                selectedTextColor: "#597AF4",
                icon: require("../../../asset/bottomTabs/home.png"),
                selectedIcon: require("../../../asset/bottomTabs/selected_home.png"),
              },
            },
          },
        },
        {
          stack: {
            id: "MARKETS_TAB",
            children: [
              {
                component: {
                  id: "MARKETS_SCREEN",
                  name: Screens.Markets,
                  options: {
                    topBar: {
                      visible: false,
                      height: 0,
                    },
                    statusBar: {
                      backgroundColor: "#F8F9FD",
                    },
                  },
                },
              },
            ],
            options: {
              bottomTab: {
                testID: "MARKETS_SCREEN_TAB",
                text: "Markets",
                selectedTextColor: "#597AF4",
                icon: require("../../../asset/bottomTabs/me.png"),
                selectedIcon: require("../../../asset/bottomTabs/selected_me.png"),
              },
            },
          },
        },
      ],
    },
  },
};

export function startApp(): void {
  Navigation.setRoot(layoutRoot);
}
