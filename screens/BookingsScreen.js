import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Image, Card, GridRow, ListView, Subtitle, View, Caption, Text } from '@shoutem/ui';
import { styles } from './../components/styles'

import { graphql } from 'react-apollo';
import { getBranchesQuery } from './../components/queries/queries';

class BookingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      branches: [],
    }
  }


  renderRow(rowData) {
    const cellViews = rowData.map((branch, id) => {
      return (
        <TouchableOpacity key={id}
          onPress={() => {
            global.booking_branchId = branch.id
            this.props.navigation.navigate('Services')
          }}>
          <Card style={bookingsStyles.border}>
            <Image
              style={bookingsStyles.image}
              styleName="medium-wide"
              source={{ uri: branch.image.url }}
            />
            <View styleName="content" >
              <Subtitle numberOfLines={3} style={{textAlign: 'center'}}>{branch.name}</Subtitle>
              <View styleName="horizontal">
                <Caption styleName="collapsible" numberOfLines={2} style={{textAlign: 'center'}}>{branch.address}</Caption>
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
    if(this.props.data.loading){
      return (
        <View>
          <Image
              style={styles.logo}
              source={require("./../assets/images/logo.png")}
            />
        </View>
      )
    }
    else{
      this.props.data.branches.forEach(branch => {
        this.state.branches.push({
          "id": branch.id,
          "name": branch.name,
          "address": branch.address,
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        })
      })
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

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'BOOKINGS',
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
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Confirmations')}>
          <Icon style={styles.icon} name="add-event" />
        </TouchableOpacity>
      ),
    };
  };

}
export default graphql(getBranchesQuery)(BookingsScreen)



const bookingsStyles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
  },
  border: {
    borderStyle: 'solid',
    borderWidth: 1.3,
    borderColor: '#c2185b',
    paddingTop: 5,
    marginBottom: 3

  },
  image: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  icon: {
    color: '#000000'
  },
  container: {
    flex: 1,
    paddingTop: 15,

  }
});