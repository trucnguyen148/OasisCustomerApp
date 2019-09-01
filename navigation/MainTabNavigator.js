import React from 'react';
import { Platform, StyleSheet,Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import TabBarIcon from '../components/TabBarIcon';
import HotdealsScreen from '../screens/HotdealsScreen';
import PricelistScreen from '../screens/PricelistScreen';

import BookingsScreen from '../screens/BookingsScreen';
import ProfilesScreen from '../screens/ProfilesScreen';
import ProductsScreen from '../screens/ProductsScreen';
import BookingService from '../screens/BookingsScreen/BookingService';
import BookingTime from '../screens/BookingsScreen/BookingTime';
import BookingConfirmation from '../screens/BookingsScreen/BookingConfirmation';
import Cart from '../screens/ProductsScreen/Cart';
import Delivery from '../screens/ProductsScreen/Delivery';
import PaymentMethods from '../screens/ProductsScreen/PaymentMethods';
import MasterCard from '../screens/ProductsScreen/MasterCard';
import VisaCard from '../screens/ProductsScreen/VisaCard';
import PayPal from '../screens/ProductsScreen/PayPal';
import ProfileDetail from '../screens/ProfilesScreen/ProfilesDetail';
import EditProfile from '../screens/ProfilesScreen/EditProfile';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
// Hot deals
const HotdealsStack = createStackNavigator(
  {
    Hotdeals: HotdealsScreen,
  },
  config
);

HotdealsStack.navigationOptions = {
  tabBarLabel: ({ tintColor }) => (
    <Text style={[styles.label, {color: tintColor}]}>
      Hot Deals
    </Text>
  ),
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name={Platform.OS === 'ios' ? 'ios-flame' : 'md-flame'}
      size={22}
      color={tintColor}
    />
  ),
};

HotdealsStack.path = '';

// PriceList and Collections
const PricelistStack = createStackNavigator(
  {
    Pricelist: PricelistScreen,
  },
  config
);

PricelistStack.navigationOptions = {
  tabBarLabel: ({ tintColor }) => (
    <Text style={[styles.label, {color: tintColor}]}>
      Price List
    </Text>
  ),
  tabBarIcon: ({ tintColor }) => (
    <Icon
    name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
      size={21}
      color={tintColor}
    />
  ),
};

PricelistStack.path = '';

// Booking 
const BookingsStack = createStackNavigator(
  {
    Bookings: BookingsScreen,
    Services: BookingService,
    Times: BookingTime,
    Confirmations: BookingConfirmation
  },
  config
);

BookingsStack.navigationOptions = {
  tabBarLabel: ({ tintColor }) => (
    <Text style={[styles.label, {color: tintColor}]}>
     Bookings
    </Text>
  ),
  tabBarIcon: ({ tintColor }) => (
    <Icon
    name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
    size={21}
    color={tintColor}
    />
  )
};

BookingsStack.path = '';

const ProductsStack = createStackNavigator(
  {
    Products: ProductsScreen,
    Cart: Cart,
    Delivery: Delivery,
    Payments: PaymentMethods,
    MasterCard: MasterCard,
    VisaCard: VisaCard,
    PayPal: PayPal,
  },
  config
);

ProductsStack.navigationOptions = {
  tabBarLabel: ({ tintColor }) => (
    <Text style={[styles.label, {color: tintColor}]}>
      Products
    </Text>
  ),
  tabBarIcon: ({ tintColor }) => (
    <Icon
    name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}    size={21}
    color={tintColor}
    />
  )
};

ProductsStack.path = '';

const ProfilesStack = createStackNavigator(
  {
    Profiles: ProfilesScreen,
    Details: ProfileDetail,
    Edit: EditProfile
  },
  config
);

ProfilesStack.navigationOptions = {
  tabBarLabel: ({ tintColor }) => (
    <Text style={[styles.label, {color: tintColor}]}>
      Profile
    </Text>
  ),
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} size={21}
      color={tintColor}
    />
  )
};

ProfilesStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HotdealsStack,
  BookingsStack,
  PricelistStack,
  ProductsStack,
  ProfilesStack
},
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#c2185b',
      // activeBackgroundColor: '#000000',
      activeColor: '#c2185b',
      swipeEnabled: false,
      showLabel: true,
      showIcon: true,
      style: {
        backgroundColor: '#000000',
        
        // paddingTop: 1,
        height: 50,
      },
      indicatorStyle: {
        backgroundColor: 'white',
      }
    },
    swipeEnabled: false,
  }

);

tabNavigator.path = '';



export default tabNavigator;

const styles = StyleSheet.create({
  icon:{
    backgroundColor: '#fff',
    color: '#fff'
  },
  label:{
    fontSize: 10
  }
})