import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import CameraScreen from "../screens/CameraScreen";
import AreYouSureScreen from "../screens/AreYouSureScreen";
import ResultsScreen from "../screens/ResultsScreen";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Camera: CameraScreen,
    AreYouSure: AreYouSureScreen,
    Results: ResultsScreen
  })
);
