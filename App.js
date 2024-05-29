import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import GlobalNavigation from './App/navigation/appNavigation';
import './global.css';
import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import store from './App/redux/store';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { useEffect,useState } from 'react';
import navigationService from './App/navigation/navigationService';
import {  notificationListeners } from './App/notificationServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/auth'
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

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(()=>{


    if(requestUserPermission()){
        messaging().getToken().then(token=>{
          console.log(token)
        })
    }
    else{
      console.log("permission not granted",authStatus);
    }
    // createNotificationChannels();
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
  


  // const [expoPushToken, setExpoPushToken] = useState("");

  // useEffect(() => {
  //   console.log("Registering for push notifications...");
  //   registerForPushNotificationsAsync()
  //     .then((token) => {
  //       console.log("token: ", token);
  //       setExpoPushToken(token);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // async function registerForPushNotificationsAsync() {
  //   let token;

  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     // Learn more about projectId:
  //     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  //     token = (
  //       await Notifications.getExpoPushTokenAsync({
  //         projectId: "a223dd99-024d-419f-ad2b-39dd8dce18df",
  //       })
  //     ).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   return token;
  // }

  
  
 
  

  
  

  
  
  
  

  return (
    <Provider store={store}>
    <NavigationContainer ref={(ref) => navigationService.setTopLevelNavigator(ref)} >
      <GlobalNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
    </Provider>
    // <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    //   <Button title="Send Notification to Users" onPress={sendCustomNotificationToUsers} />
    // </View>
    // <View style={{ marginTop: 100, alignItems: "center" }}>
    // <Text style={{ marginVertical: 30 }}>Expo RN Push Notifications</Text>
    // <Button title="Send push notification" onPress={sendNotification} />
    // </View>
  );
}


