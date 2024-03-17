/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{ useState, useEffect, useContext } from 'react';
import type {PropsWithChildren} from 'react';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import AlarmComponent from "./android/app/Alarm"
import Store from "./Store";

import {
  ImageBackground,
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  useColorScheme,
  Alert,
  PermissionsAndroid
} from 'react-native';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [location, setLocation] = useState<any>();
  
  const MINUTE_MS = 6000;

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      
      //console.log('granted', granted);
      if (granted === 'granted') {
      
        //console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      Alert.alert("test");
      return false;
    }
  };

  
  const getLocation = () => {
    
    const result = requestLocationPermission();
    result.then(res => {
      
      //console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            Alert.alert(error.message);
            // See error code charts below.
            //console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 0},
        );
      }
    });
    console.log(location);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Fetch data or reset state here if needed
  }, [location]);

  return (
    <Store>
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={require('./android/app/images/pant1.png')}>
      
      <View style={styles.container}>
      <View 
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="My Home" onPress={() => { getLocation() }} />
      </View>
      <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text>
      <AlarmComponent lat={location ? location.coords.latitude : null} long={location ? location.coords.longitude : null} />
    
      
      </View>
    </ImageBackground>
    </Store>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 });
 

export default App;
