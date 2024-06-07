// SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUniqueToken, setUserDetails } from '../redux/reducers/storeDataSlice';
import Splash from "../assets/SplashImg.svg"


const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
 
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateSplash = () => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 3000, // Animation duration of 3 seconds
        useNativeDriver: true,
      }).start();
    };

    const checkStoredUser = async () => {
      try {
        // Animate the splash screen
        animateSplash();

        // Check if user data exists in local storage
        const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        setTimeout(() => {
          if (userData) {
            // await AsyncStorage.removeItem('userData');
            navigation.navigate("home", { userData: userData });
            dispatch(setUserDetails(userData));
          } else {
            navigation.navigate('mobileNumber');
          }
        }, 3000); // Delay for 3 seconds
      } catch (error) {
        console.error("Error checking stored user:", error);
      }
    };

    checkStoredUser();
  }, [opacity]);
 
  
  
     

  // useEffect(() => {
  //   const checkStoredUser = async () => {
  //     try {
  //       // Check if user data exists in local storage
  //       const userData = JSON.parse(await AsyncStorage.getItem("userData"));
  //       if (userData) {
  //           // await AsyncStorage.removeItem('userData');
  //        navigation.navigate("home",{userData: userData});
         
  //       }
  //       else{
  //           navigation.navigate('mobileNumber');
  //       }
  //     } catch (error) {
  //       console.error("Error checking stored user:", error);
  //     }
  //   };

  //   checkStoredUser();
  // }, []);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
      
//     }, 3000); // Adjust as needed for your splash screen duration

//     return () => clearTimeout(timeout);
//   }, [navigation]);



  return (
    <View className="flex justify-center items-center">
      <Animated.View style={{ opacity }}>
        <Splash />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

