import React from "react";
import Clarifai from "clarifai";
import baseStr from "./baseStr";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  ImageBackground,
  Image
} from "react-native";
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from "expo";
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
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
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
      console.log(clarifaiResponse.outputs[0].data.concepts);
      this.setState({
        clarifaiData: clarifaiResponse.outputs[0].data.concepts
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const latestPhoto = this.props.navigation.state.params.photo;
    const uri = latestPhoto.photo.uri;
    const { navigate } = this.props.navigation;
    console.log();
    return (
      <View style={styles.container}>
        {this.state.clarifaiData && this.state.clarifaiData.length ? (
          <View>
            {console.log(this.state.clarifaiData)}
            <Image source={{ uri: uri }} />
            {this.renderPhoto(latestPhoto.name)}
            <Text>Got it!</Text>
            <Button
              title="Retake"
              color="#841584"
              onPress={() => navigate("Camera")}
            />
            {/* {this.renderPhoto(latestPhoto.name)} */}
            {/* <Image source={require(`${latestPhoto.uri}`)} /> */}

            {/* <Image
          style={{ flex: 1, height: undefined, width: undefined }}
          source={{ uri }}
        /> */}
          </View>
        ) : (
          <Text>something went wrong</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  areYouSure: {
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
    margin: 2,
    fontSize: 10,
    backgroundColor: "transparent"
  },
  pictureWrapper: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  picture: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: "contain"
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "transparent"
  }
});
