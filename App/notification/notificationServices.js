// import messaging from '@react-native-firebase/messaging';

// import { Alert } from 'react-native';
// import navigationService from '../navigation/navigationService';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';






// export async function notificationListeners(){
//     messaging().getInitialNotification().then(async(remoteMessage)=>{
//         if(remoteMessage){
//           console.log("Notifications caused app to open from quit state")
//           // handleNotification(remoteMessage);
//         }
//       });

//       messaging().onNotificationOpenedApp(async(remoteMessage)=>{
//         console.log("Notification caused app to open from background state");

//         if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
//             setTimeout(() => {
//                 navigationService.navigate(remoteMessage?.data?.redirect_to, { data: remoteMessage?.data });
//             }, 1200);
//         }
//         // handleNotification(remoteMessage);
//       })


//       messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//         console.log('Message handled in the background!');

//         if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
//             setTimeout(() => {
//                 navigationService.navigate(remoteMessage?.data?.redirect_to, { data: remoteMessage?.data })
//             }, 1200);
//         }
//         // handleNotification(remoteMessage);
//       });

//       const unsubscribe = messaging().onMessage(async (remoteMessage )=> {
//         Alert.alert('A new FCM message arrived!',JSON.stringify(remoteMessage));
//         if(remoteMessage?.data?.userRequest){
//           const res=remoteMessage.data.userRequest;
//           console.log("fcm message",res);
//           // const user=useSelector(state=>state.storeData.userDetails);
//           // const newRequests = useSelector(
//           //   (state) => state.requestData.newRequests || []
//           // );
//           // console.log("notification me ",user,newRequests)



//            try {
//             const userData = JSON.parse(await AsyncStorage.getItem("userData"));
//             console.log("user data notify",userData)
//             const response = await axios.get(
//               'https://culturtap.com/chat/get-particular-chat?retailerId=66570713965eb46439e98508&requestId=667132a822694a4b368171c8'
//             );
//             if(response.data){
//             console.log("hiii recieved",response.data);
//              dispatch(setNewRequests(response.data));
//             // setLoading(false);
//             }
//           } catch (error) {

//              console.error('Error fetching new requests by notify:', error);
//           }


//         }


//       //   // handleNotification(remoteMessage);
//       });

//       return unsubscribe;
// }



import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import navigationService from '../navigation/navigationService';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setNewRequests, setOngoingRequests, setRetailerHistory } from '../redux/reducers/requestDataSlice';
// Import your action

export async function notificationListeners(dispatch, newRequests, ongoingRequests, retailerHistory) {
    // const dispatch = useDispatch();
    // const newRequests = useSelector((state) => state.requestData.newRequests || []);

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
        // Alert.alert('A new FCM message arrived!');
        if (remoteMessage?.data?.userRequest) {
            const res = remoteMessage.data.userRequest;
            // console.log("fcm message", res);

            try {
                const userData = JSON.parse(await AsyncStorage.getItem("userData"));
                // console.log("user data notify", userData);
                const response = await axios.get(
                    `http://173.212.193.109:5000/chat/get-particular-chat?retailerId=${userData?._id}&requestId=${res}`
                );
                if (response.data) {
                    //  console.log("hiii received", response.data);
                    // Prepend new data to the existing state
                    // console.log("new notify requests",newRequests)
                             const filteredRequests = ongoingRequests.filter(
                                      (request) => request._id ===response.data[0]._id
                                    );
                                    console.log("filtered requests",filteredRequests,filteredRequests.length)
                                    if(filteredRequests && filteredRequests.length>0){
                                      
                                    }
                                    else{
                                        const updatedRequests = [...response.data, ...newRequests];
                                        dispatch(setNewRequests(updatedRequests));
                                    }
                    // console.log("updated",updatedRequests);
                   
                }
            } catch (error) {
                console.error('Error fetching new requests by notify:', error);
            }
        }

        // if(remoteMessage?.data?.close){
        //   const res = remoteMessage.data.close;
        //     console.log("fcm message", res);

        //     try {
        //         const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        //         // console.log("user data notify", userData);
        //         const response = await axios.get(
        //             `https://culturtap.com/chat/get-particular-chat?retailerId=${userData?._id}&requestId=${res}`
        //         );
        //         if (response.data) {
        //             //  console.log("hiii received", response.data);
        //             // Prepend new data to the existing state
        //             console.log("response data id",response.data[0]._id,ongoingRequests.length);

        //             const filteredRequests = ongoingRequests.filter(
        //               (request) => request._id !==response.data[0]._id
        //             );
        //             dispatch(setOngoingRequests(filteredRequests));
        //             const newHistory=[...response.data,...retailerHistory];
        //             dispatch(setRetailerHistory(newHistory));

        //         }
        //     } catch (error) {
        //         console.error('Error fetching new requests by notify:', error);
        //     }

        // }

        // if (remoteMessage?.data?.requestInfo) {
        //     const res = JSON.parse(remoteMessage.data.requestInfo);
        //     // console.log("fcm message", res);
        //     try {
        //         const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        //         // console.log("user data notify", userData);
        //         const response = await axios.get(
        //             `https://culturtap.com/chat/get-particular-chat?retailerId=${userData?._id}&requestId=${res?.requestId?._id}`
        //         );
        //         if (response.data) {


        //             //  console.log("hiii received", response.data);
        //             // Prepend new data to the existing state
        //             // console.log("response data id",ongoingRequests.length);


        //             const filteredRequests = ongoingRequests.filter(
        //                 (request) => request._id !== res._id
        //             );
        //             // const requests = ongoingRequests.filter(
        //             //   (request) => request._id ===res._id
        //             // );
        //             // if (requests && requests[0]) {
        //             //   requests[0].updatedAt = new Date().toISOString();
        //             // console.log("request ongoing",requests[0]?.updatedAt, new Date().toISOString());

        //             // }
        //             const data = [...response.data, ...filteredRequests];
        //             dispatch(setOngoingRequests(data));
        //             // const newHistory=[...response.data,...retailerHistory];
        //             // dispatch(setRetailerHistory(newHistory));

        //         }


        //     } catch (e) {
        //         console.error(e);
        //     }
        //     // handleNotification(remoteMessage);
        // }
    });

    return unsubscribe;
}



