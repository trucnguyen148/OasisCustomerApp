import React from 'react';
import { ScrollView, StyleSheet, FlatList} from 'react-native';
import { View, Text, TouchableOpacity, Image, Card, GridRow,  ListView, Title } from '@shoutem/ui';
import { ScrollDriver} from '@shoutem/animation';
import { ButtonGroup } from 'react-native-elements';
import {styles, buttons} from './../components/styles'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
          selectedIndex: 2,

          photos:
          [
            { "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" } },
            { "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" } },
            { "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" } }
          ],

          collections:
          [
            {"image":{"url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg"}},
            {"image":{"url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg"}},
            {"image":{"url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg"}},
            {"image":{"url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg"}},
            {"image":{"url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg"}},
            {"image":{"url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg"}}
          ],
          services: [
            {"name": "Sugar Ciated Manicure", "price": "35e"},
            {"name": "Short and Sweet Manicure", "price": "25e"},{"name": "Add-on Gel Colour to Hands", "price": "19e"},
            {"name": "Sugar Coated Pedicure", "price": "55e"},
            {"name": "Gel extensions - Regular Full Set", "price": "65e"},
            {"name": "Fill- Sculpted set", "price": "15e"}
          ]
        }
        this.updateIndex = this.updateIndex.bind(this)
      }

      updateIndex (selectedIndex) {
        this.setState({selectedIndex})
      }

      

      renderRow(rowData) {
        const cellViews = rowData.map((collections, id) => {
          return (
            <TouchableOpacity key={id} styleName="flexible">
              <Card styleName="flexible">
                <Image
                  styleName="medium-wide"
                  source={{ uri: collections.image.url  }}
                />
              </Card>
            </TouchableOpacity>
          );
        });
      
        return (
          <GridRow columns={2}>
            {cellViews}
          </GridRow>
        );
      }

      serviceSeparator = () => {
        return (
          //Item Separator
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
          />
        );
      };
    
      GetItem(item) {
        //Function for click on an item
        Alert.alert(item);
      }
      
      render() {
        const buttons = ['Nails', 'Make up', 'Eyelasher', 'Courses']
        const { selectedIndex } = this.state
        const collections = this.state.collections;
        let isFirstArticle = false;
        const groupedData = GridRow.groupByRows(collections, 2, () => {
          if (isFirstArticle) {
            isFirstArticle = true;
            return 2;
          }
          return 1;
        });
        const driver = new ScrollDriver();

        return (
            <ScrollView style={styles.container}>
                {/* Hot Deal */}
              <ScrollView horizontal={true}>
                {
                  this.state.photos.map((photo, id) => {
                    return (
                      <View key={id} style={homeStyles.space}>
                        <Image styleName="large-wide" source={{uri: photo.image.url}} />
                      </View>
                    )
                  })
                }
              </ScrollView>
                
                {/* Services Price */}
                <Title style={homeStyles.title}>Price List</Title>
                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  selectedButtonStyle={styles.selectedButtonStyle}
                  buttonStyle={homeStyles.buttonStyle}
                  textStyle={homeStyless.textStyle}
                  innerBorderStyle={homeStyles.borderStyle}
                />
                <FlatList
                data={this.state.services}
                ItemSeparatorComponent={this.serviceSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={homeStyles.row} >
                      <Text
                        style={homeStyles.item}
                      >
                        {item.name}
                      </Text>
                      <Text style={homeStyles.floatRightPrice}>{item.price}</Text>
                  </View>
                )}
                />
                {/* Collections */}
                <Title style={homeStyles.title}>Collections</Title>
                <ListView
                  data={groupedData}
                  renderRow={this.renderRow}
                />
            </ScrollView>
        );
      }
}

export default  HomeScreen

HomeScreen.navigationOptions = {
  title: 'Home',
  // headerTintColor :'#fff',
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.3,
    borderBottomColor: '#000000',
  },
  // headerTitleStyle: {
  //   fontWeight: 'bold',
  //   fontSize: 20
  // },
};

const homeStyles = StyleSheet.create({
  title:{
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  item: {
    padding: 10,
    width: '70%',
    flexShrink: 1
  },
  floatRight: {
      position: 'absolute',
      right: '20%'
  },
  floatRightPrice: {
      position: 'absolute',
      right: 5
  },
  row: {
    elevation: 1,
    borderRadius: 2,
    flex: 1,
    flexDirection: 'row',  // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  selectedButtonStyle: {
    backgroundColor: '#c2185b'
  },
  buttonStyle: {
    borderColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 0.2,
  },
  textStyle: {
    fontSize: 14
  },
  borderStyle: {
    borderColor: 'transparent'
  },
  space:{
    paddingRight: 10,
    
  },
});
