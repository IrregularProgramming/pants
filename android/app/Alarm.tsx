import React, { useContext, useEffect, useState } from 'react';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import Sound from 'react-native-sound';
import AlarmResponseComponent from "./AlarmResponse"
import {Context} from '../../Store'

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
  

function calculateDistance(lattitude1 : number, longittude1 : number,lattitude2 : number , longittude2: number )
{
    console.log("l132", lattitude1)
    const toRadian = (n : number)  => (n * Math.PI) / 180

    let lat2 = lattitude2
    let lon2 = longittude2
    let lat1 = lattitude1
    let lon1 = longittude1

    console.log(lat1, lon1+"==="+lat2, lon2)
    let R = 6371  // km
    let x1 = lat2 - lat1
    let dLat = toRadian(x1)
    let x2 = lon2 - lon1
    let dLon = toRadian(x2)
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c
    console.log("distance==?",d)
    return d 
}

interface AlarmProps { lat: string, long: string}
  
const AlarmComponent = ({lat, long} : AlarmProps) => {
    const [currentLocation, setLocation] = useState<any>();
    const [alarmed, setAlarmed] = useState(false);
    const [state, setState] = useContext(Context);

    const PlaySound = () => {
        let loop = 4;
        Sound.setCategory('Playback');
        
        const sound = new Sound('score.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
              }
              // if loaded successfully
              console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
              
              sound.setVolume(1.0);
              sound.play((success) => {
                  if (success) {
                    console.log('successfully finished playing');
                  } else {
                    console.log('playback failed due to audio decoding errors');
                  }
                });
            });
            sound.release();
    }
    

    // const requestLocationPermission = async () => {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           title: 'Geolocation Permission',
    //           message: 'Can we access your location?',
    //           buttonNeutral: 'Ask Me Later',
    //           buttonNegative: 'Cancel',
    //           buttonPositive: 'OK',
    //         },
    //       );
          
    //       //console.log('granted', granted);
    //       if (granted === 'granted') {
          
    //         //console.log('You can use Geolocation');
    //         return true;
    //       } else {
    //         console.log('You cannot use Geolocation');
    //         return false;
    //       }
    //     } catch (err) {
    //       Alert.alert("test");
    //       return false;
    //     }
    //   };
      
    // const getLocation = () => {
    
    //     const result = requestLocationPermission();
    //     result.then(res => {
          
    //       //console.log('res is:', res);
    //       if (res) {
    //         Geolocation.getCurrentPosition(
    //             currentLocation => {
    //             console.log(currentLocation);
    //             setLocation(currentLocation);
    //           },
    //           error => {
    //             Alert.alert(error.message);
    //             // See error code charts below.
    //             //console.log(error.code, error.message);
    //             setLocation(false);
    //           },
    //           {enableHighAccuracy: true, timeout: 15000, maximumAge: 0},
    //         );
    //       }
    //     });
    //     console.log(currentLocation);
    //   };  

  useEffect(() => {
    const interval = setInterval(() => {
      
      if(Number(lat) > 0 && Number(long) > 0)
      {
        let calculatedDistance = calculateDistance(Number(lat), Number(long), 59.304, 18.085)*1000;
        console.log("calculated==?", calculatedDistance);
        console.log("state", state.reset);
        if(Number(calculatedDistance) > 50 && state.reset === false )
        {
            console.log("calculated3==?", calculatedDistance);
            //if(!alarmed)
            {
                PlaySound();
                setAlarmed(true);
                setState({off: true, reset: false});
            }
        }
        else if(state.reset === true)
        {
            setAlarmed(false);
        }
        if(Number(calculateDistance) < 200)
        {
            setState({reset: false})
        }
      }
      
      // Call your function here
    }, 5000); // 60000 milliseconds = 1 minute

    return () => clearInterval(interval); // This is important for cleanup
  });

  return (
    alarmed ? <AlarmResponseComponent /> : ""
  );
};

export default AlarmComponent;