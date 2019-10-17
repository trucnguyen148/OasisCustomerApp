import React from 'react';
import { ScrollView } from 'react-native';
import { Subtitle, View, Button, Text } from '@shoutem/ui';
import { Input } from 'react-native-elements';
import { styles, buttons } from './../../components/styles';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const profile = global.profile;
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