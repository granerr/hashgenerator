import React from "react";
import Clarifai from "clarifai";
import baseStr from "./baseStr";

import SuccessResults from "../components/SuccessResults";
import FailureResults from "../components/FailureResults";

import { Container, Text, Body } from "native-base";
import { FileSystem } from "expo";
import Photo from "./Photo";
const PHOTOS_DIR = FileSystem.documentDirectory + "photos";

const clarifaiApp = new Clarifai.App({
  apiKey: "27a4de8aab574eeb9a6695fba884472b"
});

export default class AreYouSureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selectedFile: {},
      clarifaiData: []
    };
    this.handlePredict = this.handlePredict.bind(this);
  }

  componentDidMount = async () => {
    const latestPhoto = this.props.navigation.state.params.photo.photo.base64;
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
    await this.handlePredict(latestPhoto);
  };

  renderPhoto = fileName => (
    <Photo
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
      onSelectionToggle={this.toggleSelection}
    />
  );

  async handlePredict(base64StringFromImg) {
    try {
      const clarifaiResponse = await clarifaiApp.models.predict(
        "colors",
        base64StringFromImg
      );
      this.setState({
        clarifaiData: clarifaiResponse.outputs[0].data.concepts
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const latestPhoto = this.props.navigation.state.params.photo;
    return (
      <Container>
        {this.state.clarifaiData && this.state.clarifaiData.length ? (
          <SuccessResults
            latestPhoto={latestPhoto}
            clarifaiData={this.state.clarifaiData}
          />
        ) : (
          <Body style={{ justifyContent: "center" }}>
            <Text>hang on! i'm loading...</Text>
          </Body>
        )}
      </Container>
    );
  }
}
