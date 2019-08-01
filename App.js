import React, { Component } from "react";

import {
  View,
  Image,
  Text,
  Platform,
  Animated,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";

import User from "./components/User";

import * as Animatable from 'react-native-animatable';


const { width } = Dimensions.get("window");

export default class App extends Component {
  state = {
    scrollOffset: new Animated.Value(0),
    listProgress: new Animated.Value(0),
    userInfoProgress: new Animated.Value(0),
    userSelected: null,
    userInfoVisible: false,
    users: [
      {
        id: 1,
        name: "Bruno Alves",
        description: "Estudante de programação!",
        avatar: "https://avatars3.githubusercontent.com/u/43477835?s=460&v=4",
        thumbnail:
          "https://avatars3.githubusercontent.com/u/43477835?s=460&v=4",
        likes: 200,
        color: "#57BCBC"
      },
      {
        id: 2,
        name: "João Ferreira",
        description: "O cara da telefonia",
        avatar: "https://scontent-gig2-1.xx.fbcdn.net/v/t1.0-1/c0.0.160.160a/p160x160/1012539_401519486660371_1174559786_n.jpg?_nc_cat=101&_nc_oc=AQkvKHjRYaUj5eWySomp3vVnUtpn6JDJV7FPz6TcrRj-6ANkObL2IKiF816fqgSquyw&_nc_ht=scontent-gig2-1.xx&oh=9e29e203b3944b43872dbbc4a2c49556&oe=5DED8843",
        thumbnail:
          "https://scontent-gig2-1.xx.fbcdn.net/v/t1.0-1/c0.0.160.160a/p160x160/1012539_401519486660371_1174559786_n.jpg?_nc_cat=101&_nc_oc=AQkvKHjRYaUj5eWySomp3vVnUtpn6JDJV7FPz6TcrRj-6ANkObL2IKiF816fqgSquyw&_nc_ht=scontent-gig2-1.xx&oh=9e29e203b3944b43872dbbc4a2c49556&oe=5DED8843",
        likes: 350,
        color: "#E75A63"
      },
      {
        id: 3,
        name: "Raphael Carvalho",
        description: "Piloto",
        avatar: "https://avatars0.githubusercontent.com/u/4669899?s=460&v=4",
        thumbnail:
          "https://scontent-gig2-1.xx.fbcdn.net/v/t1.0-1/p160x160/38260596_2054329547920021_7529482238627414016_n.jpg?_nc_cat=100&_nc_oc=AQkq3wKC5u_AL4Eg19m1179eSVxgD0hHmzefs2eB-AFwsrhVD3kaGjL4govAfVcbbkU&_nc_ht=scontent-gig2-1.xx&oh=001e528778b76166709708f428e3ea23&oe=5DA2EE57",
        likes: 250,
        color: "#2E93E5"
      },
      
    ]
  };

  

  selectUser = (user) => {
    this.setState({ userSelected: user });

    Animated.sequence([
      Animated.timing(this.state.listProgress, {
        toValue: 100,
        duration: 300,      
      }),

      Animated.timing(this.state.userInfoProgress, {
        toValue: 100,
        duration: 500,
      }),
  ]).start(() => {
      this.setState({ userInfoVisible: true });
  });
}

  renderDetail = () => (
    <View>
      <User user={this.state.userSelected} onPress={() => {}} />
    </View>
  );

  renderList = () => (
    <Animated.View
     style={[
       styles.container,
       {
         transform: [
           { translateX: this.state.listProgress.interpolate({
             inputRange: [ 0, 100],
             outputRange: [0, width],
           })}
         ]
       }
       ]}
       >
      <ScrollView
      scrollEventThrottle={16}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: { y: this.state.scrollOffset } 
          }
        }])}
      >
        {this.state.users.map(user => (
          <User
            key={user.id}
            user={user}
            onPress={() => this.selectUser(user)}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );

  render() {
    const { userSelected } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Animated.View 
        style={[
          styles.header,
          {
            height: this.state.scrollOffset.interpolate({
              inputRange: [0, 140],
              outputRange: [200, 70],
              extrapolate: 'clamp',
            }),
            }
          ]}
          >

          <Animated.Image
            style={[
              styles.headerImage,
              {
                opacity: this.state.userInfoProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],                  
                }),
              }
            ]}
            source={userSelected ? { uri: userSelected.thumbnail } : null}
          />

          <Animated.Text 
          style={[
            styles.headerText,
            {
              fontSize: this.state.scrollOffset.interpolate({
                inputRange: [120, 140],
                outputRange: [24, 16],
                extrapolate: 'clamp',
            }),

            transform: [{
              translateX: this.state.userInfoProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, width],
              })
            }]

            }
            ]}
            >
            Animações com React Native
        </Animated.Text>
        

        

        <Animated.Text 
          style={[
            styles.headerText,
            {
              transform: [{
                translateX: this.state.userInfoProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: [width * -1, 0],
                })
              }]
            }
            
            ]}
            >
            { userSelected ? userSelected.name : null }
        </Animated.Text>

        <Animatable.Text animation="zoomInUp">Praticando</Animatable.Text>

        <Animatable.Text animation="slideInDown" iterationCount={10} direction="alternate">Animações com React Native</Animatable.Text>

        <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>REACT NATIVE</Animatable.Text>

        <TouchableOpacity onPress={() => this.setState({fontSize: (this.state.fontSize || 10) + 5 })}>
        <Animatable.Text transition="fontSize" style={{fontSize: this.state.fontSize || 10}}>touch me</Animatable.Text>
        </TouchableOpacity>


        </Animated.View>
        {this.state.userInfoVisible ? this.renderDetail() : this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    paddingHorizontal: 15,
    backgroundColor: "#2E93E5"
  },

  headerImage: {
    ...StyleSheet.absoluteFillObject
  },

  headerText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFF",
    backgroundColor: "transparent",
    position: "absolute",
    left: 15,
    bottom: 20
  }
});
