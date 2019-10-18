import React from 'react';
import { ScrollView, FlatList, StyleSheet } from 'react-native';
import { Title, View, Text, Subtitle, Image, Divider } from '@shoutem/ui';
import { URL, makeRequest } from './../../components/api';
import { styles } from './../../components/styles'
import { LinearGradient } from 'expo-linear-gradient';

class ProfilesDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: {},
            employee: [],
            products: [],
            loadingEmployee: true,
            loadingProducts: true,
            requests: [],
        }
    }
    serviceSeparator = () => {
        return (
          //Item Separator
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: '#FF92A5'}}
          />
        );
    };
    componentDidMount() {
        this.state.booking = this.props.navigation.getParam('booking', '');
        this.getEmp(this.state.booking.emp_id)
        this.getProducts(this.state.booking.id)
    }

    componentWillUnmount() {
        this.state.requests.forEach(function (request) {
            request.abort()
        })
    }

    getEmp(id) {
        makeRequest('GET', URL + "employee/" + id + "", this.state.requests)
            .then((response) => {
                this.setState({
                    employee: JSON.parse(response),
                })
            })
            .then(() => {
                this.setState({
                    loadingEmployee: false,
                })
            })
            .catch(err => {
                console.error('There was an error in employee!', err.statusText);
            });
    }

    getProducts(id) {
        makeRequest('GET', URL + "booking-products/" + id + "", this.state.requests)
            .then((response) => {
                this.setState({
                    products: JSON.parse(response),
                })
            })
            .then(() => {
                this.setState({
                    loadingProducts: false,
                })
            })
            .catch(err => {
                console.error('There was an error in products!', err.statusText);
            });
    }

    filterProductType(type) {
        return this.state.products.filter(product => {
            return product.type == type
        })
    }

    render() {

        const booking = this.state.booking;

        if (this.state.loadingProducts) {
            return (
                <View>
                    <Image
                        style={styles.logo}
                        source={require("./../../assets/images/logo.png")}
                    />
                </View>
            )
        } else {
            const employee = this.state.employee
            const product_type1 = this.filterProductType(1)
            const product_type2 = this.filterProductType(2)

            return (
                <ScrollView style={styles.container}>
                    <View title="CARD WITH DIVIDER">
                        <Title style={styles.header}>{booking.name}</Title>
                        <View style={styles.sameRow}>
                            <Subtitle>Bill id:</Subtitle>
                            <Text style={styles.floatRight}>{booking.id}</Text>
                        </View>
                        <View style={styles.sameRow}>
                            <Subtitle>Stylist:</Subtitle>
                            <Text style={styles.floatRight}>{employee.name}</Text>
                        </View>
                        <View style={styles.sameRow}>
                            <Subtitle>Time:</Subtitle>
                            <Text style={styles.floatRight}>{booking.date_time.split(" ")[1]}</Text>
                        </View>
                        <View style={styles.sameRow}>
                            <Subtitle>Date:</Subtitle>
                            <Text style={styles.floatRight}>{booking.date_time.split(" ")[0]}</Text>
                        </View>

                        <View style={styles.sameRow}>
                            <Subtitle>Usaged Service(s):</Subtitle>
                        </View>
                        <LinearGradient colors={['#FFE5E5', '#FFC0CB']} >
                           {/* Title */}
                           <View style={profileDetailStyles.sameRow}>
                                <Subtitle style={styles.name}>Name
                                </Subtitle>
                                <Subtitle style={styles.price}>Price</Subtitle>
                            </View>
                            <View
                                style={{ height: 0.5, width: '100%', backgroundColor: '#FF92A5'}}
                            />
                            <FlatList
                                data={product_type2}
                                ItemSeparatorComponent={this.serviceSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={profileDetailStyles.sameRow}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.price}>{item.unit_price}</Text>
                                    </View>
                                )}
                            />
                        </LinearGradient>
                        <Divider />
                        <View style={styles.sameRow}>
                            <Subtitle>Bought Product(s):</Subtitle>
                        </View>
                        
                        <LinearGradient colors={['#FFE5E5', '#FFC0CB']} >
                        {/* Title */}
                            <View style={profileDetailStyles.sameRow}>
                                <Subtitle style={styles.name}>Name
                                </Subtitle>
                                <Subtitle style={styles.price}>Price</Subtitle>
                            </View>
                            <View
                                style={{ height: 0.5, width: '100%', backgroundColor: '#FF92A5'}}
                            />
                            <FlatList
                                data={product_type1}
                                ItemSeparatorComponent={this.serviceSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={profileDetailStyles.sameRow}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.price}>{item.unit_price}</Text>
                                    </View>
                                )}
                            />
                        </LinearGradient>
                    </View>
                </ScrollView>
            )
        }
    }
}
export default ProfilesDetail

ProfilesDetail.navigationOptions = {
    title: 'DETAILS PROFILE',
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
}

const profileDetailStyles = StyleSheet.create({
    sameRow:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 8,
        paddingBottom:8
    },
})