
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import navigationService from '../navigation/navigationService';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setNewRequests, setOngoingRequests, setRequestInfo, setRetailerHistory } from '../redux/reducers/requestDataSlice';
import * as Notifications from 'expo-notifications';
import notifee ,{EventType,AndroidImportance,AndroidStyle} from '@notifee/react-native';
// import * as Notifications from 'expo-notifications';
// import * as Clipboard from 'expo-clipboard';

async function onDisplayNotification(remoteMessage) {
        // Request permissions (required for iOS)
        await notifee.requestPermission()
       
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'chat',
        });
    
        // Display a notification
        await notifee.displayNotification({
          title: remoteMessage.notification.title,
          body:remoteMessage.notification.body,
          android: {
            channelId,
            pressAction: {
              id: 'default',
            },
            importance: AndroidImportance.HIGH, 
            // style: { type: AndroidStyle.BIGPICTURE, picture: remoteMessage?.notification?.image },
            
        
          },
        });
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
              case EventType.DISMISSED:
                // console.log('User dismissed notification', detail.notification);
                break;
              case EventType.PRESS:
                setTimeout(() => {
                    console.log("pressed",remoteMessage?.data)
                    // const data=JSON.parse(remoteMessage?.data?.requestInfo);
                    navigationService.navigate("home",{ data:remoteMessage?.data })
                }, 1200);
                break;
            }
          });
      }
      async function onDisplayNotification1(remoteMessage) {
        // Request permissions (required for iOS)
        await notifee.requestPermission()
       
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'request',
        });
    
        // Display a notification
        await notifee.displayNotification({
          title: remoteMessage.notification.title,
          body:remoteMessage.notification.body,
          android: {
            channelId,
            pressAction: {
              id: 'default',
            },
            importance: AndroidImportance.HIGH, 
            // style: { type: AndroidStyle.BIGPICTURE, picture: remoteMessage?.notification?.image },
            
        
          },
        });
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
              case EventType.DISMISSED:
                // console.log('User dismissed notification', detail.notification);
                break;
              case EventType.PRESS:
                setTimeout(() => {
                    console.log("pressed",remoteMessage?.data)
                    navigationService.navigate("home")
                }, 1200);
                break;
            }
          });
      }
export async function notificationListeners() {



    messaging().getInitialNotification().then(async (remoteMessage) => {
        if (remoteMessage) {
            console.log("Notifications caused app to open from quit state");
            // handleNotification(remoteMessage);
        }
    });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log("Notification caused app to open from background state");

        if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) { 
            setTimeout(() => {
                navigationService.navigate(remoteMessage?.data?.redirect_to, { data: remoteMessage?.data });
            }, 1200);
        }
        // handleNotification(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!');

        if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
            setTimeout(() => {
                navigationService.navigate(remoteMessage?.data?.redirect_to, { data: remoteMessage?.data });
            }, 1200);
        }
        // handleNotification(remoteMessage);
    });



    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        console.log("FCM message", remoteMessage.data);
        // console.log("requestInfo at notification service",requestInfo)
        // handleNotifcation(remoteMessage);
        if(remoteMessage?.data?.userRequest){
          
        await onDisplayNotification1(remoteMessage);

        }
        if(remoteMessage?.data?.requestInfo){
            // console.log(object)
            // const res = JSON.parse(remoteMessage.data.requestInfo);
            // dispatch(setRequestInfo(res));
           await onDisplayNotification(remoteMessage);

        }





        //     // Alert.alert('A new FCM message arrived!');
        // if (remoteMessage?.data?.userRequest) {
        //     const res = remoteMessage.data.userRequest;
        //     // console.log("fcm message", res);

        //     try {
        //         const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        //         // console.log("user data notify", userData);
        //         const response = await axios.get(
        //             `http://173.212.193.109:5000/chat/get-particular-chat?retailerId=${userData?._id}&requestId=${res}`
        //         );
        //         if (response.data) {
        //             //  console.log("hiii received", response.data);
        //             // Prepend new data to the existing state
        //             // console.log("new notify requests",newRequests)
        //                      const filteredRequests = ongoingRequests.filter(
        //                               (request) => request._id ===response.data[0]._id
        //                             );
        //                             console.log("filtered requests",filteredRequests,filteredRequests.length,newRequests.length)
        //                             if(filteredRequests && filteredRequests.length>0){

        //                             }
        //                             else{
        //                                 const updatedRequests = [...response.data, ...newRequests];
        //                                 dispatch(setNewRequests(updatedRequests));
        //                             }
        //             // console.log("updated",updatedRequests);

        //         }
        //     } catch (error) {
        //         console.error('Error fetching new requests by notify:', error);
        //     }
        // }

        //     // if(remoteMessage?.data?.close){
        //     //   const res = remoteMessage.data.close;
        //     //     console.log("fcm message", res);

        //     //     try {
        //     //         const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        //     //         // console.log("user data notify", userData);
        //     //         const response = await axios.get(
        //     //             `https://culturtap.com/chat/get-particular-chat?retailerId=${userData?._id}&requestId=${res}`
        //     //         );
        //     //         if (response.data) {
        //                 //   console.log("hiii received");
        //     //             // Prepend new data to the existing state
        //     //             console.log("response data id",response.data[0]._id,ongoingRequests.length);

        //     //             const filteredRequests = ongoingRequests.filter(
        //     //               (request) => request._id !==response.data[0]._id
        //     //             );
        //     //             dispatch(setOngoingRequests(filteredRequests));
        //     //             const newHistory=[...response.data,...retailerHistory];
        //     //             dispatch(setRetailerHistory(newHistory));

        //     //         }
        //     //     } catch (error) {
        //     //         console.error('Error fetching new requests by notify:', error);
        //     //     }

        //     // }

        //     // if (remoteMessage?.data?.requestInfo) { 
        //     //     const res = JSON.parse(remoteMessage.data.requestInfo);
        //     //     // console.log("fcm message", res);
        //     //     try {
        //     //         const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        //     //         // console.log("user data notify", userData);
        //     //         const response = await axios.get(
        //     //             `https://culturtap.com/chat/get-particular-chat?retailerId=${userData?._id}&requestId=${res?.requestId?._id}`
        //     //         );
        //     //         if (response.data) {


        //     //             //  console.log("hiii received", response.data);
        //     //             // Prepend new data to the existing state
        //     //             // console.log("response data id",ongoingRequests.length);


        //     //             const filteredRequests = ongoingRequests.filter(
        //     //                 (request) => request._id !== res._id
        //     //             );
        //     //             // const requests = ongoingRequests.filter(
        //     //             //   (request) => request._id ===res._id
        //     //             // );
        //     //             // if (requests && requests[0]) {
        //     //             //   requests[0].updatedAt = new Date().toISOString();
        //     //             // console.log("request ongoing",requests[0]?.updatedAt, new Date().toISOString());

        //     //             // }
        //     //             const data = [...response.data, ...filteredRequests];
        //     //             dispatch(setOngoingRequests(data));
        //     //             // const newHistory=[...response.data,...retailerHistory];
        //     //             // dispatch(setRetailerHistory(newHistory));

        //     //         }


        //     //     } catch (e) {
        //     //         console.error(e);
        //     //     }
        //     //     // handleNotification(remoteMessage);
        //     // }

    });

    return unsubscribe;
}



