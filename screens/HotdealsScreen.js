import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Image, Text } from '@shoutem/ui';
import { styles } from './../components/styles';

import { URL, makeRequest } from '../components/api';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      requests: [],
      profile: [],
      loadingHotdeals: true
    }
  }

  getHotdeals() {
    makeRequest('GET', URL + "hotdeals", this.state.requests)
      .then((response) => {
        JSON.parse(response).forEach(hotdeal => {
          this.state.photos.push({
            "image": {
              "url": hotdeal.image
            },
            "id": hotdeal.id
          })
        })
      })
      .then(() => {
        this.setState({
          loadingHotdeals: false,
        })
      })
      .catch(err => {
        console.error('There was an error in booking!', err.statusText);
      });
  }

  componentDidMount() {
    this.getProfile(global.user[0].profile_id)
    this.getHotdeals()
  }

  componentWillUnmount() {
    this.state.requests.forEach(function (request) {
      request.abort()
    })
  }

  getProfile(id) {
    makeRequest('GET', URL + "profile/" + id + "", this.state.requests)
      .then((response) => {
        this.setState({
          profile: JSON.parse(response),
        })
      })
      .then(() => {
        global.profile = this.state.profile
      })
      .catch(err => {
        console.error('There was an error in profile!', err.statusText);
      });
  }

  render() {
    if (this.state.loadingHotdeals) {
      return <View><Text>Loading</Text></View>
    }
    else {
      return (
        <ScrollView style={styles.container}>
          {/* Hot Deal */}
          <ScrollView>
            {
              this.state.photos.map(photo => {
                return (
                  <View key={photo.id} style={hotdealsStyles.space}>
                    <Image styleName="large-wide" source={{ uri: photo.image.url }} />
                  </View>
                )
              })
            }
          </ScrollView>
        </ScrollView>
      );
    }

  }


  static navigationOptions = {
    title: 'HOT DEALS',
    headerTintColor: '#000000',
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0.3,
      borderBottomColor: '#000000'
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18
    },
  };
}

export default HomeScreen;


const hotdealsStyles = StyleSheet.create({
  space: {
    paddingBottom: 10,
  },
});
