import { NavigationActions } from "react-navigation";

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  // change the state of our screen
  navigator.dispatch(
    NavigationActions.navigate({
      routeName: routeName,
      params: params,
    })
  );
};
