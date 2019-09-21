import React from 'react';
import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Image, Card, GridRow, ListView, Subtitle, View, Caption } from '@shoutem/ui';
import { styles } from './../components/styles'

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

class BookingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      branches: []
    }
  }


  test1() {
    // const data = this.props.data;
    // if (data.loading) {
    //   console.log('Loading')
    // } else {
    //   return rowData.map(branch => {
    //     return (
    //       <GridRow key={branch.id} columns={2} style={bookingsStyles.background}>
    //         <TouchableOpacity >
    //           <Card style={bookingsStyles.border}>
    //             <Image
    //               style={bookingsStyles.image}
    //               styleName="medium-wide"
    //               source={{ uri: "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" }}
    //             />
    //             <View styleName="content">
    //               <Text>{branch.name}</Text>
    //             </View>
    //           </Card>
    //         </TouchableOpacity>
    //       </GridRow>
    //     );
    //   })
    // }
  }

  test () {
    const data = this.props.data;
    if (data.loading) {
      console.log('Loading')
    } else {
      data.branches.map(branch => {
        this.state.branches.push({
          'name': branch.name
        })
      })
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
    this.test();
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
export default graphql(getBranchesQuery)(BookingsScreen);

BookingsScreen.navigationOptions = ({ navigation }) => {
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
