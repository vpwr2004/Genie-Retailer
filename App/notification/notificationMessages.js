import { getAccessToken } from "./notification";



// export const sendCustomNotificationToMultipleUsers = async (mess) => {
//     try {
//       const tokens = [
//         "dDCcOdbBSHCBczVl8sM6AS:APA91bEWQ2KT0Q1JleNtv4-04pxPDj3Clm8pUf7VzoSjo4gNr-ZpczWTV727J8uHpWTFIrtJlTZSaW3VAbzAcFivT8PG2yBLgdDKv6nSXw46rCdRYPUpbbJu20szxai2saQp7QijsBPL",
//         "fgcqIA64RdOU1yIQeqxrff:APA91bGDld9pwdI2dAOWxgPryG8U8z6E4on2yDQjmH-ary5An5NPTLW1c4kVoleWaW2sYsNQt2OJOwK0AjOufpTsMo8CMsDXCd4XhRzsdvgrdhOV1KAG7Zjvss3dVbJqqOfFSob3YDXF"
//       ];
  
//       const accessToken = await getAccessToken();
  
//       const url = 'https://fcm.googleapis.com/v1/projects/genie-retailer/messages:send'; // Replace YOUR_PROJECT_ID with your actual project ID
  
//       const headers = {
//         'Content-Type': 'application/json; charset=UTF-8',
//         'Authorization': `Bearer ${accessToken}`
//       };
  
//       const notification = {
//         notification: {
//           title: "Hello! How Are You?",
//           body: "Hi there! Check out this beautiful image.",
//           image: "https://images.pexels.com/photos/22033614/pexels-photo-22033614/free-photo-of-stupa-benalmadena.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//         },
//         android: {
//           priority: "high",
//           notification: {
//             image: "https://images.pexels.com/photos/22033614/pexels-photo-22033614/free-photo-of-stupa-benalmadena.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//           }
//         },
//         data: {
//           redirect_to: "home"
//         }
//       };
  
//       for (const token of tokens) {
//         const message = {
//           message: {
//             token: token,
//             ...notification
//           }
//         };
  
//         const response = await fetch(url, {
//           method: 'POST',
//           headers: headers,
//           body: JSON.stringify(message),
//         });
  
//         const textResponse = await response.text();
//         console.log('Raw response:', textResponse);
  
//         if (!response.ok) {
//           console.error('Failed to send notification error:', textResponse);
//           throw new Error('Failed to send notification');
//         } else {
//           const successResponse = JSON.parse(textResponse);
//           console.log('Notification sent successfully:', successResponse, message);
//         }
//       }
//     } catch (e) {
//       console.error('Failed to send notification:', e);
//     }
//   };
  
//   export const sendCustomNotificationToSingleUser = async (mess) => {
//     try {
//       const message = {
//         message: {
//           token: "dDCcOdbBSHCBczVl8sM6AS:APA91bEWQ2KT0Q1JleNtv4-04pxPDj3Clm8pUf7VzoSjo4gNr-ZpczWTV727J8uHpWTFIrtJlTZSaW3VAbzAcFivT8PG2yBLgdDKv6nSXw46rCdRYPUpbbJu20szxai2saQp7QijsBPL",
//           notification: {
//             title: "Hello! How Are You?",
//             body: "Hi there! Check out this beautiful image.",
//             image: "https://images.pexels.com/photos/733860/pexels-photo-733860.jpeg"
//           },
//           android: {
//             priority: "high",
//           },
//           data: {
//             redirect_to: "requestPage"
//           }
//         }
//       };
      
  
//       const accessToken = await getAccessToken();
  
//       const notificationResponse = await fetch(`https://fcm.googleapis.com/v1/projects/genie-retailer/messages:send`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8',
//           'Authorization': `Bearer ${accessToken}`
//         },
//         body: JSON.stringify(message),
//       });
  
//       const textResponse = await notificationResponse.text();
//       console.log('Raw response:', textResponse);
  
//       if (!notificationResponse.ok) {
//         console.error('Failed to send notification error:', textResponse);
//         throw new Error('Failed to send notification');
//       } else {
//         const successResponse = JSON.parse(textResponse);
//         console.log('Notification sent successfully:', successResponse, message);
//       }
//     } catch (e) {
//       console.error('Failed to send notification:', e);
//     }
//   };
  
  export const sendCustomNotificationChat=async (mess) => {
  
    try {
      const message = {
        message: {
          token: "eIlIrEuxR9ij6cG6Byx_z-:APA91bGaP0aXDm75xN2foJoZJIBkBWd6t33GfBJOu8q-oc1DbdQeHndhOSdm24Sm_efT93lFbaC2Ixt53FWYWNLsA6jiXNsemg3D9epyebk2ChZnvqlwPRjHinAtAFtdfhGa8OWnFm42",
          notification: {
            title: `${mess.title}`,
            body: `${mess.body}`,
            image: `${mess?.image}`
          },
          android: {
            priority: "high",
            notification: {
              sound: "default",
            //   icon: "fcm_push_icon",
            //   color:"#fcb800",
              tag:`${mess?.tag}`
  
            }
          },
          data: {
            redirect_to: `${mess.redirect_to}`,
            requestInfo:JSON.stringify(`${mess.requestInfo}`)
  
          }
        }
      };
      
  
    const accessToken = await getAccessToken();

    const notificationResponse = await fetch(`https://fcm.googleapis.com/v1/projects/genie-user/messages:send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(message),
      });
  
      const textResponse = await notificationResponse.text();
      console.log('Raw response:', textResponse);
  
      if (!notificationResponse.ok) {
        console.error('Failed to send notification error:', textResponse);
        throw new Error('Failed to send notification');
      } else {
        const successResponse = JSON.parse(textResponse);
        console.log('Notification sent successfully:', successResponse, message);
      }
    } catch (e) {
      console.error('Failed to send notification:', e);
    }
  };
  export const sendCustomNotificationBid=async (mess) => {
  
    try {
      const message = {
        message: {
          token: "eIlIrEuxR9ij6cG6Byx_z-:APA91bGaP0aXDm75xN2foJoZJIBkBWd6t33GfBJOu8q-oc1DbdQeHndhOSdm24Sm_efT93lFbaC2Ixt53FWYWNLsA6jiXNsemg3D9epyebk2ChZnvqlwPRjHinAtAFtdfhGa8OWnFm42",
          notification: {
            title: `${mess.title} send a bid of ${mess.price}`,
            body: `${mess.body}`,
            image: `${mess?.image}`
          },
          android: {
            priority: "high",
            notification: {
              sound: "default",
            //   icon: "fcm_push_icon",
            //   color:"#fcb800",
            //   tag:`${mess?.tag}`  
  
            }
          },
          data: {
            redirect_to:`${mess.redirect_to}`,
            requestInfo:JSON.stringify(`${mess.requestInfo}`)
  
          }
        }
      };
      
  
    const accessToken = await getAccessToken();

    const notificationResponse = await fetch(`https://fcm.googleapis.com/v1/projects/genie-user/messages:send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(message),
      });
  
      const textResponse = await notificationResponse.text();
      console.log('Raw response:', textResponse);
  
      if (!notificationResponse.ok) {
        console.error('Failed to send notification error:', textResponse);
        throw new Error('Failed to send notification');
      } else {
        const successResponse = JSON.parse(textResponse);
        console.log('Notification sent successfully:', successResponse, message);
      }
    } catch (e) {
      console.error('Failed to send notification:', e);
    }
  };
  export const sendCustomNotificationAttachment=async (mess) => {
  
    try {
      const message = {
        message: {
            token: "eIlIrEuxR9ij6cG6Byx_z-:APA91bGaP0aXDm75xN2foJoZJIBkBWd6t33GfBJOu8q-oc1DbdQeHndhOSdm24Sm_efT93lFbaC2Ixt53FWYWNLsA6jiXNsemg3D9epyebk2ChZnvqlwPRjHinAtAFtdfhGa8OWnFm42",
          notification: {
            title: `${mess.title}`,
            body: `${mess.body}`,
            image: `${mess?.image}`
          },
          android: {
            priority: "high",
            notification: {
              sound: "default",
            //   icon: "fcm_push_icon",
            //   color:"#fcb800",
            //   tag:`${mess?.tag}`
  
            }
          },
          data: {
            redirect_to:`${mess.redirect_to}`,
            requestInfo:JSON.stringify(`${mess.requestInfo}`)
  
          }
        }
      };
      
  
    const accessToken = await getAccessToken();

    const notificationResponse = await fetch(`https://fcm.googleapis.com/v1/projects/genie-user/messages:send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(message),
      });
  
      const textResponse = await notificationResponse.text();
      console.log('Raw response:', textResponse);
  
      if (!notificationResponse.ok) {
        console.error('Failed to send notification error:', textResponse);
        throw new Error('Failed to send notification');
      } else {
        const successResponse = JSON.parse(textResponse);
        console.log('Notification sent successfully:', successResponse, message);
      }
    } catch (e) {
      console.error('Failed to send notification:', e);
    }
  };
  
  export const NotificationRequestAccepted=async (mess) => {
    try {
      const message = {
        message: {
            token: "eIlIrEuxR9ij6cG6Byx_z-:APA91bGaP0aXDm75xN2foJoZJIBkBWd6t33GfBJOu8q-oc1DbdQeHndhOSdm24Sm_efT93lFbaC2Ixt53FWYWNLsA6jiXNsemg3D9epyebk2ChZnvqlwPRjHinAtAFtdfhGa8OWnFm42",
          notification: {
            title:`${mess.title} has accepted you request`,
            body: "Congrats!",
            // image: "https://images.pexels.com/photos/733860/pexels-photo-733860.jpeg"
          },
          android: {
            priority: "high",
            notification: {
             
              sound: "default",
            //   icon: "fcm_push_icon",
              color:"#fcb800",
              tag:"request_accept"
  
            }
          },
          data: {
            redirect_to: `${mess.redirect_to}`,
            requestInfo:JSON.stringify(`${mess.requestInfo}`)
  
          }
        }
      };
      
  
      const accessToken = await getAccessToken();
  
      const notificationResponse = await fetch(`https://fcm.googleapis.com/v1/projects/genie-user/messages:send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(message),
      });
  
      const textResponse = await notificationResponse.text();
      console.log('Raw response:', textResponse);
  
      if (!notificationResponse.ok) {
        console.error('Failed to send notification error:', textResponse);
        throw new Error('Failed to send notification');
      } else {
        const successResponse = JSON.parse(textResponse);
        console.log('Notification sent successfully:', successResponse, message);
      }
    } catch (e) {
      console.error('Failed to send notification:', e);
    }
  };
  
  export  const NotificationBidRejected= async (mess) => {
    try {
      const message = {
        message: {
          token: "eIlIrEuxR9ij6cG6Byx_z-:APA91bGaP0aXDm75xN2foJoZJIBkBWd6t33GfBJOu8q-oc1DbdQeHndhOSdm24Sm_efT93lFbaC2Ixt53FWYWNLsA6jiXNsemg3D9epyebk2ChZnvqlwPRjHinAtAFtdfhGa8OWnFm42",
          notification: {
            title:`${mess.title} has rejected your bid`,
            body: "Hi,I have rejected your bid!",
            image: `${mess?.image}`
          },
          android: {
            priority: "high",
            notification: {
              sound: "default",
            //   icon: "fcm_push_icon",
              color:"#fcb800",
              tag:"bid_reject"
  
            }
          },
          data: {
            redirect_to: `${mess.redirect_to}`,
            requestInfo:JSON.stringify(`${mess.requestInfo}`)
  
          }
        }
      };
      
  
      const accessToken = await getAccessToken();
  
      const notificationResponse = await fetch(`https://fcm.googleapis.com/v1/projects/genie-user/messages:send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(message),
      });
  
      const textResponse = await notificationResponse.text();
      console.log('Raw response:', textResponse);
  
      if (!notificationResponse.ok) {
        console.error('Failed to send notification error:', textResponse);
        throw new Error('Failed to send notification');
      } else {
        const successResponse = JSON.parse(textResponse);
        console.log('Notification sent successfully:', successResponse, message);
      }
    } catch (e) {
      console.error('Failed to send notification:', e);
    }
  };
  
 