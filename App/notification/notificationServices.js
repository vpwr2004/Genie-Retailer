import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import navigationService from "../navigation/navigationService";
import * as Notifications from 'expo-notifications';

import notifee, {
  EventType,
  AndroidImportance,
  AndroidStyle,
} from "@notifee/react-native";


async function onDisplayNotification(remoteMessage) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: "default",
    name: "chat",
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId,
      pressAction: {
        id: "default",
        launchActivity: remoteMessage?.data?.requestInfo,
      },
      importance: AndroidImportance.HIGH,
      timestamp: Date.now(),
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
          // console.log("pressed",remoteMessage?.data)
          // const req=JSON.parse(remoteMessage?.data?.requestInfo);
          // console.log("data",req)
          const reqt = detail.notification.android.pressAction.launchActivity;
          console.log("pressed", reqt);

          // Assuming requestInfo is stored in the notification data
          const req = JSON.parse(reqt);
          console.log("data", req);
          navigationService.navigate("requestPage", { req });
        }, 1200);
        break;
    }
  });
}

async function onDisplayNotification1(remoteMessage) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: "default",
    name: "request",
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId,
      pressAction: {
        id: "default",
        launchActivity: remoteMessage?.data?.userRequest,
      },
      timestamp: Date.now(),
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
          console.log("pressed", remoteMessage?.data);
          navigationService.navigate("home");
        }, 1200);
        break;
    }
  });
}
export  function notificationListeners() {
  messaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notifications caused app to open from quit state",
          remoteMessage
        );
        // handleNotification(remoteMessage);
      }
    });

 messaging().onNotificationOpenedApp(
    async (remoteMessage) => {
      console.log("Notification caused app to open from background state");

      if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
        setTimeout(() => {
          if (remoteMessage?.data?.userRequest) {
            navigationService.navigate("home");
          } else if (remoteMessage?.data?.requestInfo) {
            const req = JSON.parse(remoteMessage?.data?.requestInfo);
            console.log("data", req);
            navigationService.navigate("requestPage", { req });
          }
        }, 1200);
      }
      // handleNotification(remoteMessage);
    }
  );

 messaging().setBackgroundMessageHandler(
    async (remoteMessage) => {
      console.log("Message handled in the background!");

      if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
        setTimeout(() => {
          if (remoteMessage?.data?.userRequest) {
            navigationService.navigate("home");
          } else if (remoteMessage?.data?.requestInfo) {
            const req = JSON.parse(remoteMessage?.data?.requestInfo);
            console.log("data", req);
            navigationService.navigate("requestPage", { req });
          }
        }, 1200);
      }
      // handleNotification(remoteMessage);
    }
  );

  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    // console.log("FCM message", remoteMessage.data);
    // console.log("requestInfo at notification service",requestInfo)
    // handleNotifcation(remoteMessage);
    // const currentRoute = navigationService.getCurrentRoute();
    // const currentScreen = currentRoute ? currentRoute.name : null;
    // console.log("Notification received on screen:", currentScreen);
    // console.log("notification:", userId);
    // const req=JSON.parse(remoteMessage?.data?.requestInfo);
    //              console.log("data", req?.requestId);
    //              const currentId=req?.requestId;

    if (remoteMessage?.data?.userRequest) {
      console.log("request notification");

      await onDisplayNotification1(remoteMessage);
    }
    if (remoteMessage?.data?.requestInfo ){
      // console.log(object)
      // const res = JSON.parse(remoteMessage.data.requestInfo);
      // dispatch(setRequestInfo(res));
      console.log("message notification");
      await onDisplayNotification(remoteMessage);
    }
  });

  return unsubscribe;
  // return () => {
  //   unsubscribeForeground();
  //   unsubscribeBackground();
  //   unsubscribeMessage();
  //   unsubscribeInitial();
  // };
}



