import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import GlobalNavigation from './App/navigation/appNavigation';
import './global.css';
import { Provider } from 'react-redux';
import store from './App/redux/store';
import { useEffect,useState } from 'react';
import navigationService from './App/navigation/navigationService';
import {  notificationListeners } from './App/notification/notificationServices';
import { firebase } from '@react-native-firebase/auth'
import { ActivityIndicator } from 'react-native-paper';
import { useFonts } from 'expo-font';




export default function App() {

  let [fontsLoaded]=useFonts(
    {
     'Poppins-Regular':require('./App/assets/fonts/Poppins-Regular.ttf'),
     'Poppins-Medium':require('./App/assets/fonts/Poppins-Medium.ttf'),
     'Poppins-SemiBold':require('./App/assets/fonts/Poppins-SemiBold.ttf'),
     'Poppins-Bold':require('./App/assets/fonts/Poppins-Bold.ttf'),
     'Poppins-ExtraBold':require('./App/assets/fonts/Poppins-ExtraBold.ttf'),
     'Poppins-Light':require('./App/assets/fonts/Poppins-Light.ttf'),
     'Poppins-ExtraLight':require('./App/assets/fonts/Poppins-ExtraLight.ttf'),
     'Poppins-Thin':require('./App/assets/fonts/Poppins-Thin.ttf'),
     'Poppins-Black':require('./App/assets/fonts/Poppins-Black.ttf'),
     'Poppins-Italic':require('./App/assets/fonts/Poppins-Italic.ttf'),
    
    }
 )



  useEffect(()=>{
  
    notificationListeners();

  },[]);
  
  // Adjust this import according to your project structure
  
  // useEffect(() => {
  //   const checkUserAndRequestPermission = async () => {
  //     try {
  //       const user = firebase.auth().currentUser;
  //       if (user) {
  //         // User is logged in, request permission and get token
  //         // console.log("user is signed in",user)
  //         // const enabled = await requestUserPermission();
  //         // console.log("enabled",enabled)
  //         if (user) {
  //           try {
  //             const token = await messaging().getToken();
  //             console.log(token);
  //             notificationListeners();
  //           } catch (tokenError) {
  //             console.error('Error getting token:', tokenError);
  //           }
  //         } else {
  //           console.log("Permission not granted");
  //         }
  //       } else {
  //         // User is not logged in
  //         console.log("User is not logged in. Token will not be generated.");
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  
  //   checkUserAndRequestPermission();
  // }, []);
  


  

  
  
  

  return (
    <Provider store={store}>
       <NavigationContainer ref={(ref) => navigationService.setTopLevelNavigator(ref)} >
      <GlobalNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
    </Provider>
    
  );
}


