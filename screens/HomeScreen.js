import { Camera, Permissions } from "expo";
import React, { Component } from "react";
import {
  Container,
  Button,
  Text,
  Card,
  Header,
  Body,
  Title
} from "native-base";

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
        <Card style={{ elevation: 3 }}>
          <Text>
            I'll automatically generate hashtags for your image based on a
            Clarifai model trained to recognize wedding photos. (If you REALLY
            give me nothing to work with, I'll either tell you that or spit out
            some non-wedding-related concepts.) After you share to social,
            access your photos and save them to your phone's camera roll via the
            gallery - icon in the bottom right corner of the camera screen.{" "}
          </Text>
        </Card>
        <Body style={{ justifyContent: "center" }}>
          <Button rounded onPress={() => navigate("Camera")}>
            <Text>Take A Picture</Text>
          </Button>
        </Body>
      </Container>
    );
  }
}
