import React from 'react';
import { Button, View, Alert } from 'react-native';

const fetchLocation = props => {
  console.log('props>>>>');
  return (
    <View>
      <View>
      <Button
        title="Get Location"
        onPress={props.onGetLocation}
        />
    </View>
    <View>
      <Button
        onPress={() => {
          Alert.alert('You tapped the button!');
        }}
        title="Press Me"
      />
    </View>
    </View>
  );
};

export default fetchLocation;
