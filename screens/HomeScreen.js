import React from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { Camera, Permissions } from "expo";
export default class HomeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Button
          title="Take A Picture"
          color="#841584"
          onPress={() => navigate("Camera")}
        />
        <Button
          title="Take A Picture"
          color="#841584"
          onPress={() => navigate("Camera")}
        />
        <Button
          title="Take A Picture"
          color="#841584"
          onPress={() => navigate("Camera")}
        />
        <Button
          title="Take A Picture"
          color="#841584"
          onPress={() => navigate("Camera")}
        />
      </View>
    );
  }
}
