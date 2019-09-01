import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {Icon, Image,  Card, GridRow,  ListView, Subtitle, View, Caption } from '@shoutem/ui';
import {styles} from './../components/styles'

class BookingsScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      branches: [
        {
          "name": "Gaspar Brasserie",
          "address": "185 Sutter St, San Francisco, CA 94109",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
        },
        {
          "name": "Chalk Point Kitchen",
          "address": "527 Broome St, New York, NY 10013",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        }
      ],
    }
  }
  
  renderRow(rowData) { 
    const cellViews = rowData.map((branch, id) => {
      return (
        <TouchableOpacity key={id} 
        onPress={() => this.props.navigation.navigate('Services')}>
          <Card style={bookingsStyles.border}>
            <Image
              style={bookingsStyles.image}
              styleName="medium-wide"
              source={{ uri: branch.image.url  }}
            />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{branch.name}</Subtitle>
              <View styleName="horizontal">
                <Caption styleName="collapsible" numberOfLines={2}>{branch.address}</Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
  
    return (
      <GridRow columns={2} style={bookingsStyles.background}>
        {cellViews}
      </GridRow>
    );
  }
  
  render() {
    const branches = this.state.branches;
    let isFirstArticle = false;
    const groupedData = GridRow.groupByRows(branches, 2, () => {
      if (isFirstArticle) {
        isFirstArticle = true;
        return 2;
      }
      return 1;
    });
  
    return (
      <ScrollView style={bookingsStyles.container}>
        <ListView
          data={groupedData}
          renderRow={this.renderRow}
        />
      </ScrollView>
    );
  }
}
export default BookingsScreen

BookingsScreen.navigationOptions = ({ navigation }) =>  {
  return {
    title: 'BOOKINGS',
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
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Confirmations')}>
          <Icon style={styles.icon} name="add-event"/>
      </TouchableOpacity>
    ),
  };
};

const bookingsStyles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
  },
  border:{
    borderStyle: 'solid',
    borderWidth: 1.3,
    borderColor: '#c2185b',
    paddingTop: 5,
    marginBottom: 3
    
  },
  image:{
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  icon:{
    color: '#000000'
  },
  container:{
    flex: 1,
    paddingTop: 15,
       
  }
});
