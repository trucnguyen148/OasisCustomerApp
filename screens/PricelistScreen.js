import React from 'react';
import { ScrollView, StyleSheet, FlatList} from 'react-native';
import { View, Text, DropDownMenu} from '@shoutem/ui';
import { SearchBar } from 'react-native-elements';
import {styles} from './../components/styles'

class PricelistScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {"name": "Nails"},
                {"name": "Permanent Make-up"},
                {"name": "Eyelash Extension"},
                {"name": "Courses"}
            ],
            services: [
                {"name": "Sugar Ciated Manicure", "price": "35e"},
                {"name": "Short and Sweet Manicure", "price": "25e"},{"name": "Add-on Gel Colour to Hands", "price": "19e"},
                {"name": "Sugar Coated Pedicure", "price": "55e"},
                {"name": "Gel extensions - Regular Full Set", "price": "65e"},
                {"name": "Fill- Sculpted set", "price": "15e"}
          ]
        }
      }
      state = {
        search: '',
      };
      updateSearch = search => {
        this.setState({ search });
      };
      serviceSeparator = () => {
        return (
          //Item Separator
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
          />
        );
      };
      
      render() {
        const { search } = this.state;
        const selectedCategory = this.state.selectedCategory || this.state.categories[0];
        return (
            <View style={styles.containerPriceProduct}>
                
                {/* Seach bar */}
                <SearchBar
                  placeholder="Search product..."
                  onChangeText={this.updateSearch}
                  value={search}
                  inputStyle={styles.searchInput}
                  containerStyle={styles.searchBackground}
                  inputContainerStyle={styles.searchBackground}
                  searchIcon={styles.searchIcon}
                  cancelIcon={styles.cancelIcon}
                />
                {/* Dropdown */}
                <View style={styles.floatRightPriceProduct}>
                  <DropDownMenu
                    options={this.state.categories}
                    selectedOption={selectedCategory ? selectedCategory : this.state.categories[0]}
                    onOptionSelected={(category) => this.setState({ selectedCategory: category })}
                    titleProperty="name"
                    valueProperty="categories.name"
                  />
                </View>
                
                {/* Show details with Flatlist */}
                <ScrollView style={pricelistStyles.space}>
                    <FlatList
                    data={this.state.services}
                    ItemSeparatorComponent={this.serviceSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={pricelistStyles.row} >
                            <Text
                                style={pricelistStyles.item}
                            >
                                {item.name}
                            </Text>
                            <Text style={pricelistStyles.floatRightPrice}>{item.price}</Text>
                        </View>
                    )}
                    />
                </ScrollView>
                
            </View>
        );
      }
}

export default  PricelistScreen

PricelistScreen.navigationOptions = {
  title: 'PRICE LIST',
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

const pricelistStyles = StyleSheet.create({
  title:{
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  item: {
    padding: 10,
    width: '70%',
    flexShrink: 1,
    fontSize: 12
  },
  floatRightPrice: {
      position: 'absolute',
      right: 5,
      fontSize: 12
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
  space:{
    marginTop: '15%'
  },
  
});
