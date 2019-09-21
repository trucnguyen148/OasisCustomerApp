import React from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import { View, Text, DropDownMenu } from '@shoutem/ui';
import { SearchBar } from 'react-native-elements';
import { styles } from './../components/styles'


import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getServicesQuery = gql`
  {
    positions(type: 2) {
      id
      name
    },
    product_type(type: 2) {
        id 
        name 
        unit_price
        category{
          id
        }
      }
  }
`

class PricelistScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      services: [],
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
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };
  getData(data) {
    if (data.loading) {
      console.log('Loading')
    } else {
      if (this.state.categories.length == 0) {
        data.positions.map(service => {
          this.state.categories.push({
            "id": service.id,
            "name": service.name,
          });
        });
      }
      if (this.state.services.length == 0) {
        data.product_type.map(product => {
          this.state.services.push({
            "id": product.id,
            "name": product.name,
            "price": product.unit_price + "e"
          });
        });
      }

    }
  };

  getProducts(data, category_id) {
    if (data.loading) {
      console.log('Loading')
    } else {
      let result = data.product_type.filter(product => {
        if (product.category != null) {
          return product.category.id == category_id
        }
      });

      console.log(result)
    }
  }

  render() {
    const data = this.props.data;
    this.getData(data)

    const { search } = this.state;
    const selectedCategory = this.state.selectedCategory || this.state.categories[0];

    if (data.loading) {
      return <View style={styles.containerPriceProduct}><Text>Loading</Text></View>
    } else {
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
              onOptionSelected={
                (category) => {
                  this.setState({ selectedCategory: category })
                  // this.getProducts(data, category.id)
                  console.log(category.id)
                }
              }
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
}

export default graphql(getServicesQuery)(PricelistScreen);

PricelistScreen.navigationOptions = {
  title: 'PRICE LIST',
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

const pricelistStyles = StyleSheet.create({
  title: {
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
  space: {
    marginTop: '15%'
  },

});
