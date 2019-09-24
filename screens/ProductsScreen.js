import React from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import { Icon, TouchableOpacity, Image, View, Text, Button, DropDownMenu } from '@shoutem/ui';
import { SearchBar } from 'react-native-elements';
import { styles } from './../components/styles';

import flowright from "lodash.flowright";
import { graphql } from 'react-apollo';
import { getProductsQuery } from '../components/queries/queries';

class ProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2,
      categories: [],
      products: [],
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  // Search bar
  state = {
    search: '',
  };
  updateSearch = search => {
    this.setState({ search });
  };

  // FlatList
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  productSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  getCategory(data) {
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
      if (this.state.products.length == 0) {
        this.getProducts(data, this.state.categories[0].id)
      }
    }
  };

  getProducts(data, category_id) {
    if (data.loading) {
      console.log('Loading')
    } else {
      this.state.products = [];
      return data.product_type.filter(product => {
        return product.category.id == category_id
      })
        .map(product => {
          this.state.products.push({
            "id": product.id,
            "image": "https://shoutem.github.io/static/getting-started/restaurant-6.jpg",
            "description": product.description,
            "name": product.name,
            "price": product.unit_price + "e"
          });
        });
    }
  };

  render() {
    const selectedCategory = this.state.selectedCategory || this.state.categories[0];
    const { search } = this.state;
    const data = this.props.getProductsQuery;
    this.getCategory(data)

    if (data.loading) {
      return <View style={styles.containerPriceProduct}><Text>Loading</Text></View>
    } else {
      return (
        <View style={styles.containerPriceProduct}>
          {/* Services Price */}

          <SearchBar
            placeholder="Search product..."
            onChangeText={this.updateSearch}
            value={search}
            inputStyle={styles.searchInput}
            containerStyle={styles.searchBackground}
            inputContainerStyle={styles.searchBackground}
            searchIcon={styles.searchIcon}
            cancelIcon={styles.searchIcon}
          />
          <View style={styles.floatRightPriceProduct}>
            {/* <Subtitle>Filter</Subtitle> */}
            <DropDownMenu
              options={this.state.categories}
              selectedOption={selectedCategory ? selectedCategory : this.state.categories[0]}
              onOptionSelected={
                (category) => {
                  this.setState({ selectedCategory: category })
                  this.getProducts(data, category.id)
                }
              }
              titleProperty="name"
              valueProperty="categories.name"
              style={productStyles.dropdownItem}
            />

          </View>
          <ScrollView style={productStyles.space}>
            <FlatList
              data={this.state.products}
              ItemSeparatorComponent={this.productSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={productStyles.row} >
                  <Image style={productStyles.image} styleName="medium-wide" source={{ uri: item.image }} />
                  <Text
                    style={productStyles.item}
                  >
                    {item.name}
                  </Text>
                  <Text style={productStyles.floatRightPrice}>{item.price}</Text>
                  <Button style={productStyles.floatRightButton}
                    styleName="secondary"><Icon style={productStyles.middle} name="plus-button" /></Button>
                </View>
              )}
            />
          </ScrollView>
        </View>
      );
    }
  }
}

export default flowright(
  graphql(getProductsQuery, {
    name: "getProductsQuery"
  }),
)(ProductsScreen)

ProductsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'PRODUCTS',
    headerTintColor: '#000000',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18
    },
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Icon style={styles.icon} name="add-to-cart" />
      </TouchableOpacity>
    ),
  };
};

const productStyles = StyleSheet.create({

  item: {
    padding: 10,
    width: '50%',
    flexShrink: 1,
    fontSize: 12
  },
  image: {
    width: 100
  },
  samerow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  floatRightPrice: {
    position: 'absolute',
    right: '15%',
    fontSize: 12
  },
  floatRightButton: {
    position: 'absolute',
    right: 0,
    width: '7%',
    height: 'auto',
    margin: 0,
    padding: 0,
    borderRadius: 65,
    borderColor: '#c2185b',
    backgroundColor: '#c2185b'
  },
  middle: {
    // width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
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
    borderColor: 'transparent',
    // borderBottomColor: '#ec407a',
    borderStyle: 'solid',
    borderWidth: 0.2,
  },
  text: {
    flex: 1
  },
  icon: {
    color: '#000000',
  },
  dropdownItem: {
    color: '#fff'
  },
  space: {
    marginTop: '15%'
  }

});
