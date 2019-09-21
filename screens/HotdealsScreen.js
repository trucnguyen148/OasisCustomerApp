import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import { View, Image } from '@shoutem/ui';
import {styles} from './../components/styles';

import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBranchesQuery = gql`
  {
    branches {
      id 
      name
    }
  }
`

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          photos:
          [
            { "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" } },
            { "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" } },
            { "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" } },
            { "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" } },
            { "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" } },
            { "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-6.jpg" } },
            { "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-7.jpg" } }
          ]
        }
        
      }
      
      getBranches(){
        let data = this.props.data;
        if(data.loading){
          // return (<div>Loading</div>)
          console.log('Loading')
        }else {
          return data.branches.map(branch => {
            return (
              console.log(branch.name)
            )
          })
        }
      }
      
      
      render() {
        this.getBranches()
        return (
            <ScrollView style={styles.container}>
                {/* Hot Deal */}
              <ScrollView>
                {
                  this.state.photos.map((photo, id) => {
                    return (
                        
                            <View key={id} style={hotdealsStyles.space}>
                                <Image styleName="large-wide" source={{uri: photo.image.url}} />
                            </View>
                     
                    )
                  })
                }
              </ScrollView>
            </ScrollView>
        );
      }
}

export default graphql(getBranchesQuery)(HomeScreen);

HomeScreen.navigationOptions = {
  title: 'HOT DEALS',
  headerTintColor :'#000000',
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
  space:{
    paddingBottom: 10,
  },
});
