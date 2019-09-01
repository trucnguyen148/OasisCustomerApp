import React from 'react';
import { ScrollView, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, View, Image, Subtitle, Divider, Button } from '@shoutem/ui';
import {styles, buttons} from './../../components/styles'
import NumericInput from 'react-native-numeric-input'

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: [
                {
                    "image": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg",
                    "name": "Orange OPI nail polish",
                    "description": " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    "quantity": "2",
                    "price": "20e"
                },
                {
                    "image": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg",
                    "name": "Orange OPI nail polish",
                    "description": " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    "quantity": "2",
                    "price": "20e"
                },
                {
                    "image": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg",
                    "name": "Orange OPI nail polishxxxxxxx",
                    "description": " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    "quantity": "2",
                    "price": "20e"
                }
            ]
        }
    }

    productSeparator = () => {
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
    render (){
        
        return(
            <ScrollView style={styles.container}>
                <FlatList
                data={this.state.products}
                ItemSeparatorComponent={this.productSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={cartStyles.row} >
                        <Image style={cartStyles.image} styleName="medium-wide" source={{uri: item.image}}/>
                        <Text
                            style={cartStyles.item}
                            onPress={this.GetItem.bind(
                                this,
                                item.name + 'is' + item. description 
                              )}
                            >
                            {item.name}
                        </Text>
                        {/* <Input keyboardType="numeric" inputStyle={styles.inputNumeric}>{item.quantity}</Input> */}
                        <View style={cartStyles.floatRightQuantity}>
                            <NumericInput 
                                totalWidth={45}
                                totalHeight={25}
                                valueType='real'
                                textColor='#B0228C' 
                                iconStyle={{ color: 'white' }} 
                                rightButtonBackgroundColor='#c2185b' 
                                leftButtonBackgroundColor='#c2185b'
                                borderColor='#c2185b'
                                textColor='#000000'
                                onChange={value => console.log(value)}  />
                        </View>
                        <Text style={cartStyles.floatRight}>{item.price}</Text>
                    </View>
                )}
                />
                <Divider />
                <View style={styles.samerow}>
                    <Subtitle style={cartStyles.floatRightSum}>SUM:</Subtitle>
                    <Text style={cartStyles.floatRight}>xxxx</Text>
                </View>
                <Divider />
                <Button 
                    style={buttons.primary} styleName="secondary"
                    onPress={() => this.props.navigation.navigate('Delivery')}
                    >
                        <Text style={buttons.primaryText}>Confirm</Text>
                </Button>
            </ScrollView>
        )
    }
}

export default Cart

Cart.navigationOptions = {
    title: 'YOUR CART',
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
}

const cartStyles = StyleSheet.create({
    item: {
      padding: 10,
      width: '48%',
      flexShrink: 1,
      fontSize: 12
    },
    image: {
        width: 100
    },
    floatRightQuantity: {
        position: 'absolute',
        right: '14%',
        fontSize: 12
    },
    floatRight: {
        position: 'absolute',
        right: 5,
        fontSize: 12, 
    },
    floatRightSum:{
        position: 'absolute',
        right: '20%',
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
  });