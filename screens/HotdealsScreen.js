import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Image, Text } from '@shoutem/ui';
import { styles } from './../components/styles';

import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getHotdealsQuery = gql`
  {
    hotdeals {
      id
      image
    }
  }
`

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
  }

  getHotdeals(data) {
    if (data.loading) {
      console.log('Loading')
    } else {
      data.hotdeals.forEach(hotdeal => {
        this.state.photos.push({
          "image": {
            "url": hotdeal.image 
          },
          "id": hotdeal.id
        })
      })
    }
  }


  render() {
    const data = this.props.data;
    this.getHotdeals(data)
    console.log(this.state.photos)
    if (data.loading) {
      return <View style={styles.containerPriceProduct}><Text>Loading</Text></View>
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
}

export default graphql(getHotdealsQuery)(HomeScreen);

HomeScreen.navigationOptions = {
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

const hotdealsStyles = StyleSheet.create({
  space: {
    paddingBottom: 10,
  },
});
