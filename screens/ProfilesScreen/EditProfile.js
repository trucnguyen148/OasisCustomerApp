import React from 'react';
import { ScrollView } from 'react-native';
import { Subtitle, View, Button, Text } from '@shoutem/ui';
import { Input } from 'react-native-elements';
import { styles, buttons } from './../../components/styles';
import { URL } from './../../components/api';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            loadingProfile: true
        }
    }

    componentDidMount() {
        this.getProfile(global.user[0].profile_id)
    }

    getProfile(id) {
        fetch(URL + "profile/" + id + "")
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    profile: responseJson,
                })
            })
            .then(() => {
                this.setState({
                    loadingProfile: false,
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        if (this.state.loadingProfile) {
            return (
                <View>
                    <Subtitle>loading</Subtitle>
                </View>
            )
        } else {
            const profile = this.state.profile;
            return (
                <ScrollView style={styles.container}>
                    <View style={styles.sameRow}>
                        <Subtitle>Name:</Subtitle>
                        <Input inputStyle={styles.input}
                        >{profile.name}</Input>
                    </View>
                    <View style={styles.sameRow}>
                        <Subtitle>Address:</Subtitle>
                        <Input inputStyle={styles.input}>{profile.address}</Input>
                    </View>
                    <View style={styles.sameRow}>
                        <Subtitle>Postal code:</Subtitle>
                        <Input inputStyle={styles.input}>{profile.postal_code}</Input>
                    </View>
                    <View style={styles.sameRow}>
                        <Subtitle>City:</Subtitle>
                        <Input inputStyle={styles.input}>{profile.city}</Input>
                    </View>
                    <View style={styles.sameRow}>
                        <Subtitle>Country:</Subtitle>
                        <Input inputStyle={styles.input}>{profile.country}</Input>
                    </View>
                    <View style={styles.sameRow}>
                        <Subtitle>Phone number:</Subtitle>
                        <Input inputStyle={styles.input}>{profile.phone}</Input>
                    </View>
                    <Button
                        onPress={() => this.props.navigation.navigate('Profiles')}
                        style={buttons.primary}
                    >
                        <Text style={buttons.primaryText}>Save</Text>
                    </Button>

                </ScrollView>
            )
        }

    }
}

export default EditProfile

EditProfile.navigationOptions = {
    title: 'EDIT PROFILE',
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