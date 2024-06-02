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
// import firebase from '@react-native-firebase/app';
// import { navigationRef, navigate } from './App/navigationRef';
// import * as Device from "expo-device";
//  import * as Notifications from "expo-notifications";
// import { Platform } from 'react-native'

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });



export default function App() {

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

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
  


  // const linking = {
  //   prefixes: ['myapp://'],
  //   config: {
  //     screens: {
  //       home: 'home',
  //       requestPage: 'requestPage',
  //       about: 'about',
  //     },
  //   },
  // };
  
  

  
  
  
  // <NavigationContainer linking={linking} fallback={<ActivityIndicator animating />}>

  return (
    <Provider store={store}>
       <NavigationContainer ref={(ref) => navigationService.setTopLevelNavigator(ref)} >
      <GlobalNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
    </Provider>
    
  );
}


