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
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Image } from "react-native";

import moment from "moment";

import { FileSystem } from "expo";
const PHOTOS_DIR = FileSystem.documentDirectory + "photos";

export const SuccessResults = props => {
  const latestPhoto = props.latestPhoto;
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
              <Text>Your image results:</Text>

              {props.clarifaiData.map(concept => (
                <Text key={concept.id}>
                  {concept.name}: {concept.value}
                </Text>
              ))}
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default SuccessResults;
