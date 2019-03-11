import { Camera, Permissions } from "expo";
import React, { Component } from "react";
import { Container, Button, Text, Header, Body, Title } from "native-base";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header>
          <Title>Wedding#Generator</Title>
        </Header>
        <Body style={{ justifyContent: "center" }}>
          <Button rounded onPress={() => navigate("Camera")}>
            <Text>Take A Picture</Text>
          </Button>
        </Body>
      </Container>
    );
  }
}
