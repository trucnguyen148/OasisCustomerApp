import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NavigationBar, Heading, Title, View, Card, Text, Subtitle, Button, ListView, GridRow, TouchableOpacity } from '@shoutem/ui';
import { Image } from '@shoutem/ui/html';


class ProfilesDetail extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            profiles: [
                {
                    "image": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg",
                    "name": "Nguyen Van Troi",
                    "address": "319 Nam Ki Khoi Nghia, Quan 1, Tp.HCM",
                    "phone": "090 xxx xxxxx",
                    "email": "xxxxxx@oasis.vn",
                    "usaged": {
                        "services": {
                            "service1": {
                                "name": "Permanent make-up",
                                "time": "8:30",
                                "date": "23/10/2018",
                                "bill": "xxxxxx000",
                                "pics": ["https://shoutem.github.io/static/getting-started/restaurant-1.jpg", "https://shoutem.github.io/static/getting-started/restaurant-2.jpg", "https://shoutem.github.io/static/getting-started/restaurant-3.jpg", "https://shoutem.github.io/static/getting-started/restaurant-4.jpg"],
                                // "detailService": [
                                //     {"name": "eye"},
                                //     {"name": "lips"}
                                // ],
                                "detailService": [ "eyes", "lips"]
                                },
                            "service2": {
                                "name": "Nails",
                                "time": "8:30",
                                "date": "23/10/2018",
                                "bill": "xxxxxx001",
                                "pics": {
                                    "url1": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg",
                                    "url2": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg",
                                    "url3": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg",
                                    "url4": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg"
                                },
                                "detailService": ["paiting", "serving"]
                            }
                        },
                        "stylist": "Thao Trang",
                        "products": [
                            {"name": "Orange OPI Nails Polish"},
                            {"name": "Black OPI Nails Polish"}
                        ]
                    }  
                } 
                
            ]
        }
    }
    // test = () => {
    //     const testing = this.state.profiles.products;
    //     return (
    //         <View>
    //             {
    //                 testing.map((item, id) =>{
    //                     return(
    //                         <Text key={id} >{item}</Text>
    //                     )
    //                 })
    //             }
    //         </View>
    //     )
    // }

    render(){
        const profiles = this.state.profiles;

        return(
            <ScrollView style={styles.container}>
                <View title="CARD WITH DIVIDER">
                {
                    profiles.map((profile, i) => {   
                    return (
                        <View key={i} >
                            <Title style={styles.header}>{profile.usaged.services.service1.name}</Title>
                            <View style={styles.sameRow}>
                                <Subtitle>Bill number:</Subtitle>
                                <Text style={styles.floatRight}>{profile.usaged.services.service1.bill}</Text>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Time:</Subtitle>
                                <Text style={styles.floatRight}>{profile.usaged.services.service1.time}</Text>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Date:</Subtitle>
                                <Text style={styles.floatRight}>{profile.usaged.services.service1.date}</Text>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Usaged Service(s):</Subtitle>
                                <Text style={styles.floatRight}>{profile.usaged.services.service1.detailService}</Text>
                            </View>
                            {/* <View>
                                {profile.usaged.products.map((item,id) => {
                                    <View key={id}>
                                        <Subtitle>Bought Product(s):</Subtitle>
                                        <Text style={styles.floatRight}>{item[0]}</Text>
                                    </View>
                                })}
                            </View> */}
                            <View style={styles.sameRow}>
                                <Subtitle>Bought Product(s):</Subtitle>
                                {profile.usaged.products.map((test,id) => {
                                    <Text key={id}>{test.name}</Text>
                                })}
                                {/* <Text style={styles.floatRight}>{profile.usaged.products.name}</Text> */}
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Stylist:</Subtitle>
                                <Text style={styles.floatRight}>{profile.usaged.stylist}</Text>
                            </View>
                        </View>
                    );
                    })
                }
                </View>
            </ScrollView>
        )
    }
}
export default ProfilesDetail

ProfilesDetail.navigationOptions = {
    title: 'DETAILS PROFILE',
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