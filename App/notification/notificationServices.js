import messaging from '@react-native-firebase/messaging';

import { Alert } from 'react-native';
import navigationService from '../navigation/navigationService';


export async function notificationListeners(){
    messaging().getInitialNotification().then(async(remoteMessage)=>{
        if(remoteMessage){
          console.log("Notifications caused app to open from quit state")
          // handleNotification(remoteMessage);
        }
      });
  
      messaging().onNotificationOpenedApp(async(remoteMessage)=>{
        console.log("Notification caused app to open from background state");
       
        if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
            setTimeout(() => {
                navigationService.navigate(remoteMessage?.data?.redirect_to, { data: remoteMessage?.data });
            }, 1200);
        }
        // handleNotification(remoteMessage);
      })
  
  
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!');
       
        if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
            setTimeout(() => {
                navigationService.navigate(remoteMessage?.data?.redirect_to, { data: remoteMessage?.data })
            }, 1200);
        }
        // handleNotification(remoteMessage);
      });
  
      const unsubscribe = messaging().onMessage(async (remoteMessage )=> {
        Alert.alert('A new FCM message arrived!');
        // handleNotification(remoteMessage);
      });
  
      return unsubscribe;
}


// import messaging from '@react-native-firebase/messaging';
// import { Alert, Linking } from 'react-native';

// export async function notificationListeners() {
//   messaging().getInitialNotification().then(async (remoteMessage) => {
//     if (remoteMessage) {
//       console.log("Notification caused app to open from quit state", remoteMessage);
//       handleNotification(remoteMessage);
//     }
//   });

//   messaging().onNotificationOpenedApp(async (remoteMessage) => {
//     console.log("Notification caused app to open from background state");
//     handleNotification(remoteMessage);
//   });

//   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//     console.log('Message handled in the background!', remoteMessage);
//     handleNotification(remoteMessage);
//   });

//   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//     handleNotification(remoteMessage);
//   });

//   return unsubscribe;
// }

// function handleNotification(remoteMessage) {
//   if (remoteMessage?.data?.redirect_to) {
//     const redirectTo = remoteMessage.data?.redirect_to;
//     const requestInfo = remoteMessage.data?.requestInfo;

//     let url = '';
//     switch (redirectTo) {
//       case 'home':
//         url = 'myapp://home';
//         break;
//       case 'about':
//         url = 'myapp://about';
//         break;
//       case 'requestPage':
//         if (requestInfo) {
//           url = `myapp://requestPage/${requestInfo}`;
//         } else {
//           console.warn('Missing requestInfo');
//         }
//         break;
//       default:
//         console.warn('Invalid redirect_to value');
//         return;
//     }

//     if (url) {
//       setTimeout(() => {
//         Linking.openURL(url);
//       }, 1200);
//     }
//   }
// }


