import React from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { FaceDetector } from "expo";
import { Ionicons } from "@expo/vector-icons";

const pictureSize = 150;

export default class ResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  _mounted = false;

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  toggleSelection = () => {
    this.setState({ selected: !this.state.selected }, () =>
      this.props.onSelectionToggle(this.props.uri, this.state.selected)
    );
  };

  getImageDimensions = ({ width, height }) => {
    if (width > height) {
      const scaledHeight = (pictureSize * height) / width;
      return {
        width: pictureSize,
        height: scaledHeight,

        scaleX: pictureSize / width,
        scaleY: scaledHeight / height,

        offsetX: 0,
        offsetY: (pictureSize - scaledHeight) / 2
      };
    } else {
      const scaledWidth = (pictureSize * width) / height;
      return {
        width: scaledWidth,
        height: pictureSize,

        scaleX: scaledWidth / width,
        scaleY: pictureSize / height,

        offsetX: (pictureSize - scaledWidth) / 2,
        offsetY: 0
      };
    }
  };

  render() {
    const latestPhoto = this.props.navigation.state.params.photo;
    // console.log("LATEST PHOTO", latestPhoto);
    // console.log("PHOTO 0", this.state.photos[0]);
    console.log("LATEST PHOTO DOT PHOTO", Object.keys(latestPhoto.photo));
    console.log(latestPhoto.photo.uri);

    // const uri = latestPhoto.photo.uri;
    const { navigate } = this.props.navigation;
    const { uri } = this.props;
    console.log(uri);
    return (
      <View style={styles.container}>
        <Text style={styles.areYouSure}>This Is The Results Screen</Text>
        <TouchableOpacity
          // style={styles.pictureWrapper}
          onPress={this.toggleSelection}
          activeOpacity={1}
        >
          <Text>Image Should Go Here</Text>
          <Image style={styles.areYouSure} source={{ uri }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // // flex: 1,
    // paddingTop: 0,
    // alignItems: "flex-end",
    // // justifyContent: "center",
    // backgroundColor: "transparent"
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "stretch"
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingTop: 200
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  picture: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: "contain"
  },
  areYouSure: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  pictureWrapper: {
    width: pictureSize,
    height: pictureSize,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  }
});
