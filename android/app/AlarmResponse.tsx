import React, { useEffect, useState, useContext } from 'react';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import Sound from 'react-native-sound';
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
  
  

const AlarmResponseComponent = () => {
    const [currentLocation, setLocation] = useState<any>();
    let alarmed = false;
    const [animationFrame, setAnimationFrame] = useState(true);
    const [backgroundImage, setBackgroundImage] = useState(require('./images/pantrotate.png'));
    const [state, setState] = useContext(Context);

    const toggleAlarm = () => {
      setState({off: true, reset: true});
    };

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

  useEffect(() => {
    const interval = setInterval(() => {
      
      if(animationFrame == false)
      {
        setBackgroundImage(require('./images/pantrotate.png'));
        setAnimationFrame(true);
      }
      else
      {
        setBackgroundImage(require('./images/pantrotate2.png'));
        setAnimationFrame(false);
      }
      
      // Call your function here
    }, 400); // 60000 milliseconds = 1 minute

    return () => clearInterval(interval);
    
  }, [animationFrame]);

  // useEffect(() => {
  //   const music = setInterval(() => {
  //     PlaySound();
      
  //     // Call your function here
  //     return () => clearInterval(music);
  //   }, 4000); 
  //    // This is important for cleanup
  // }, []);

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={backgroundImage}>
      
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Turn off" onPress={toggleAlarm} />
      </View>
      
    </ImageBackground>
  );
};

export default AlarmResponseComponent;