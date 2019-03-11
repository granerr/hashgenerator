import React from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image, Clipboard } from "react-native";
import moment from "moment";
import { FileSystem } from "expo";
const PHOTOS_DIR = FileSystem.documentDirectory + "photos";

function getHashtags(arr) {
  return arr.map(x => `#${x.name}`).join(" ");
}

export const SuccessResults = props => {
  state = {
    text: getHashtags(props.clarifaiData)
  };

  const latestPhoto = props.latestPhoto;

  writeToClipboard = async () => {
    await Clipboard.setString(this.state.text);
    alert("Copied to Clipboard!");
  };

  return (
    <Container>
      <Header />
      <Button
        title="Retake"
        color="#841584"
        onPress={() => navigate("Camera")}
      />
      <Content>
        <Card style={{ elevation: 3 }}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{ uri: `${PHOTOS_DIR}/${latestPhoto.name}` }}
              />
              <Body>
                <Text>Success!</Text>
                <Text note>{new Date().toDateString()}</Text>
                <Text note>{moment().format("MMMM Do YYYY, h:mm:ss a")}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: `${PHOTOS_DIR}/${latestPhoto.name}` }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Body>
              <Text>Your image hashtags:</Text>
              {props.clarifaiData.map(concept => (
                <Text key={concept.id}>
                  #{concept.name}: {concept.value * 100}% confidence
                </Text>
              ))}
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Icon.Button
                onPress={this.writeToClipboard}
                title="Write to Clipboard"
                name="clipboard"
                backgroundColor="#3b5998"
              >
                Copy To Clipboard
              </Icon.Button>
            </Left>
            <Body>
              <Icon.Button name="twitter" backgroundColor="#1da1f2">
                Share to Twitter
              </Icon.Button>
            </Body>
            <Right>
              <Icon.Button
                name="instagram"
                backgroundColor="#833AB4"
                onPress={this.shareToIg}
              >
                Share to Instagram
              </Icon.Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default SuccessResults;
