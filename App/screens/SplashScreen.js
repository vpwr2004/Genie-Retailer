// SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setMobileNumber, setUniqueToken, setUserDetails } from '../redux/reducers/storeDataSlice';
import Splash from "../assets/SplashImg.svg"


const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
 
  const opacity = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");


  useEffect(() => {
    const animateSplash = () => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 5000, // Animation duration of 3 seconds
        useNativeDriver: true,
      }).start();
    };

    const checkStoredUser = async () => {
      try {
        // Animate the splash screen
        animateSplash();

        // Check if user data exists in local storage
        const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        // const authData = JSON.parse(await AsyncStorage.getItem("authData"));
        setTimeout(() => {
          if (userData!==null) {
            // await AsyncStorage.removeItem('userData');
            dispatch(setUserDetails(userData));
            navigation.navigate("home");
           
          }
          else {
            navigation.navigate('mobileNumber');
          }
        }, 5000); // Delay for 3 seconds
      } catch (error) {
        console.error("Error checking stored user:", error);
      }
    };

    checkStoredUser();
  }, []);
 
  
  
     

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
        <Splash width={width} height={height}/>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

