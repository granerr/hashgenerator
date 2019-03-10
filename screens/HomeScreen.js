import { Camera, Permissions } from "expo";
import React, { Component } from "react";
import { Container, Button, Text, Header, Body, Title } from "native-base";
import RNCalendarEvents from "react-native-calendar-events";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    };
    this.setAlarmFunc = this.setAlarmFunc.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  setAlarmFunc() {
    // RNAlarm.setAlarm(
    //   "Meeting",
    //   "Meeting with customer",
    //   "",
    //   "",
    //   () => {
    //     console.log("success");
    //   },
    //   () => {
    //     console.log("failure");
    //   }
    // );

    RNCalendarEvents.saveEvent("Title of event", {
      startDate: "2016-08-19T19:26:00.000Z",
      endDate: "2017-08-19T19:26:00.000Z",
      alarms: [
        {
          date: "2016-08-19T19:21:00.000Z"
        }
      ]
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header>
          <Title>Image Predictor Model</Title>
        </Header>
        <Body style={{ justifyContent: "center" }}>
          <Button rounded onPress={() => navigate("Camera")}>
            <Text>Take A Picture</Text>
          </Button>
          <Button rounded onPress={() => this.setAlarmFunc()}>
            <Text>Set An Alarm</Text>
          </Button>
        </Body>
      </Container>
    );
  }
}
