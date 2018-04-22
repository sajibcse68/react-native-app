import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

export default class App extends React.Component {
  state = {
    userLocation: null,
    usersPlaces: []
  }

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421,
        }
      });
      fetch('https://react-native-map-1524207100397.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      })
      /*
      Alert.alert(
        'data',
        JSON.stringify(position.coords.latitude)
      );
       */
    }, err => {
      console.log(err);
    })
  }

  getUserPlacesHandler = () => {
    const that = this;
    fetch('https://react-native-map-1524207100397.firebaseio.com/places.json')
      .then(resp => resp.json())
      .then(parsedResp => {
        console.log('parsedResp=======', parsedResp);
        const placesArr = [];
        for (let key in parsedResp) {
          const o = {
            latitude: parsedResp[key].latitude,
            longitude: parsedResp[key].longitude,
            id: key
          }
          placesArr.push(o);
        }
        this.setState({ 
          usersPlaces: placesArr
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Button
            title='Get User Places'
            onPress={this.getUserPlacesHandler}>
          </Button>
        </View>
        <FetchLocation onGetLocation={this.getUserLocationHandler}></FetchLocation>
        <UsersMap
          userLocation={this.state.userLocation}
          usersPlaces={this.state.usersPlaces}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
