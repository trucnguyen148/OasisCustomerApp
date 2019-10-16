import React from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import { NavigationBar, Heading, Title, View, Card, Text, Subtitle, Button, ListView, GridRow, TouchableOpacity } from '@shoutem/ui';
import { Image } from '@shoutem/ui/html';
import { URL } from './../../components/api';

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

    makeRequest(method, url, array) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            array.push(xhr);
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }

    getEmp(id) {
        this.makeRequest('GET', URL + "employee/" + id + "", this.state.requests)
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
        this.makeRequest('GET', URL + "booking-products/" + id + "", this.state.requests)
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
                    <Subtitle>loading</Subtitle>
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

                        <FlatList
                            data={product_type2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.sameRow}>
                                    <Text style={styles.floatRight}>{item.name}</Text>
                                </View>
                            )}
                        />

                        <View style={styles.sameRow}>
                            <Subtitle>Bought Product(s):</Subtitle>
                        </View>

                        <FlatList
                            data={product_type1}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.sameRow}>
                                    <Text style={styles.floatRight}>{item.name}</Text>
                                </View>
                            )}
                        />


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

const styles = StyleSheet.create({
    card: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        width: '80%'
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        width: 90
    },
    space: {
        margin: 10
    },
    container: {
        flex: 1
    },
    image: {
        width: 150
    },
    sameRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    floatRight: {
        position: 'absolute',
        right: 20,
        fontSize: 12
    },
    container: {
        flex: 1,
        paddingTop: 15,
        margin: 10
    },
    header: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 50
    },

})