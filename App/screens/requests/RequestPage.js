import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
  
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ThreeDots from "../../assets/ThreeDotIcon.svg";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import Copy from "../../assets/Copy.svg";
import Document from "../../assets/Document1.svg";
import Send from "../../assets/Send.svg";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../assets/ProfileIcon2.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import RetailerBidMessage from "../../components/RetailerBidMessage";
import UserBidMessage from "../../components/UserBidMessage";
import UserMessage from "../../components/UserMessage";
import RetailerMessage from "../../components/RetailerMessage";

import RequestAcceptModal from "../../components/RequestAcceptModal";
import UserAttachment from "../../components/UserAttachment";
import RequestCancelModal from "../../components/RequestCancelModal";
import { socket } from "../utils/socket.io/socket";
import Attachment from "../../components/Attachment";
import { setRequestInfo } from "../../redux/reducers/requestDataSlice";
import { NotificationBidRejected } from "../../notification/notificationMessages";
import MessageLoaderSkeleton from "../utils/MessageLoaderSkeleton";
// import MessageLoaderSkeleton from "../utils/MessageLoaderSkeleton";
// import { setMessages } from "../../redux/reducers/requestDataSlice";

const RequestPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const scrollViewRef = useRef(null);

  // const [requestInfo, setRequestInfo] = useState();
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [accept, setAcceptLocal] = useState(false);
  const [available, setAvailable] = useState(false);

  const [modal, setModal] = useState(false);
  const [closeRequestModal, setCloseRequestModal] = useState(false);
  const [acceptRequestModal, setAcceptRequestModal] = useState(false);
  const [cancelRequestModal, setCancelRequestModal] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [attachmentScreen, setAttachmentScreen] = useState(false);
  const [cameraScreen, setCameraScreen] = useState(false);
  const [loading,setLoading]=useState(true);
  const requestInfo = useSelector(
    (state) => state.requestData.requestInfo || {}
  );
  //  console.log("params",route?.params?.data?.requestInfo);

   

  const fetchRequestData = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("userData"));
      setUser(userData);
      console.log("User data found successfully");

      console.log("requestInfo page", requestInfo);
      let req;
      if (route?.params?.data) {
        req = JSON.parse(route?.params?.data?.requestInfo);
      }
      // let response = 
      await axios.get(
        "https://genie-backend-meg1.onrender.com/chat/get-spade-messages",
        {
          params: {
            id: requestInfo?._id ? requestInfo?._id : req?._id,
          },
        }
      )
      .then(response => {
          setMessages(response?.data);
          console.log("Messages found successfully");
          // console.log("user joined chat with chatId", response.data[0].chat._id);
          socket.emit("join chat", response?.data[0].chat._id);

          console.log("socket join chat setup successfully");
          setLoading(false);
          
      })

      // dispatch(setMessages(response.data));
      
      // socket.emit("join chat", response?.data[0].chat._id);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const SocketSetUp = async (id) => {
    // const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    // setUser(userData);
    // let req;
    // if (route?.params?.data) {
    //   req = JSON.parse(route?.pa;'rams?.data?.requestInfo);
    // }
    socket.emit(
      "setup",
      id
    );
    console.log("socket setup for personal user setup successfully");
    // console.log("user connected with userId", requestInfo.users[0]._id);

    socket.on("connected", () => {
      setSocketConnected(true);

      // console.log("socket connected", userData._id, requestInfo?._id);
    });
  };

  useEffect(() => {
    // console.log('route.params.data',route?.params?.data);
    if(requestInfo){
      console.log("find error of requestPage from home screen")
         SocketSetUp(requestInfo?.users[0]?._id);
    }
    if (route?.params?.data) {
      console.log("Params data found");
      let req = JSON.parse(route?.params?.data?.requestInfo);
      // console.log('reqInfo from notification section',req);
      
      dispatch(setRequestInfo(req));
      SocketSetUp(req?.users[0]._id);
      
      // setTimeout(()=>{
      //   console.log('reqInfo from params',requestInfo);
      // },2000);
    }
    
    fetchRequestData();
    // SocketSetUp();

    // }
  }, []);

 

  // useEffect(() => {
  //   const fetchRequestData = async () => {
  //     try {
  //       const userData = JSON.parse(await AsyncStorage.getItem("userData"));
  //       setUser(userData);
  //       // console.log(userData);

  //        console.log("requestPage", requestInfo);
  //        let response;
  //        if (route.params?.data) {
  //         response = await axios.get(
  //           "https://genie-backend-meg1.onrender.com/chat/get-spade-messages",
  //           {
  //             params: {
  //               id: req?._id,
  //             },
  //           }
  //         );
  //       }
  //       else{
  //        response = await axios.get(
  //         "https://genie-backend-meg1.onrender.com/chat/get-spade-messages",
  //         {
  //           params: {
  //             id: requestInfo?._id,
  //           },
  //         }
  //       );
  //     }

  //       // dispatch(setMessages(response.data));
  //       setMessages(response.data);
  //       // console.log("user joined chat with chatId", response.data[0].chat._id);
  //       socket.emit("join chat", response?.data[0]?.chat?._id);
  //       // socket.emit("join chat",response.data[0].chat._id);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchRequestData();
  // }, []);

  // Fetch request data

  const RejectBid = async () => {
    try {
      const lastMessage = messages[messages.length - 1]; // Get the last message
      if (!lastMessage) {
        console.log("No messages available to update.");
        return;
      }
      try {
        const response = await axios.patch(
          "https://genie-backend-meg1.onrender.com/chat/reject-bid",
          {
            messageId: lastMessage?._id,
          }
        );

        // console.log("res", response);

        socket.emit("new message", response.data);
        const updatedMessages = messages.map((message) => {
          if (message?._id === lastMessage?._id) {
            return { ...message, bidAccepted: "rejected" };
          }
          return message;
        });
        // dispatch(setMessages(updatedMessages));
        setMessages(updatedMessages);
        const notification = {
          token: requestInfo?.customerId?.uniqueToken,
          title: user?.storeName,
          body: lastMessage.message,
          requestInfo: requestInfo,
          tag: user?._id,
          image: lastMessage?.bidImages[0],
          redirect_to: "bargain",
        };
         NotificationBidRejected(notification);
      } catch (error) {
        console.log("Error updating chat:", error);
      }
      // } else {
      //   console.error("Error updating message.");
      // }
    } catch (error) {
      console.error("Error updating requesttype:", error);
    }
  };

  // New message recieved from socket code
  useEffect(() => {
    const handleMessageReceived = (newMessageReceived) => {
      // console.log("Message received from socket:", newMessageReceived);
      setMessages((prevMessages) => {
        if (
          prevMessages[prevMessages.length - 1]?.chat._id ===
          newMessageReceived?.chat._id
        ) {
          if (
            prevMessages[prevMessages.length - 1]?._id ===
            newMessageReceived?._id
          ) {
            // Update the last message if it's the same as the new one
            return prevMessages.map((message) =>
              message._id === newMessageReceived._id
                ? newMessageReceived
                : message
            );
          } else {
            // Add the new message to the list
            return [...prevMessages, newMessageReceived];
          }
        }
        // If the chat ID does not match, return the previous messages unchanged
        return prevMessages;
      });

      // let mess = [...messages];
      // if(mess[mess.length-1]?.chat?._id===newMessageReceived?.chat?._id){
      //   if(mess[mess.length-1]?._id===newMessageReceived?._id){
      //     mess[mess.length-1]=newMessageReceived;
      //   }
      //   else{
      //     mess.push(newMessageReceived);
      //   }
      // }
      // // dispatch(setMessages(mess));
      // setMessages(mess);
    };

    // dispatch(setMessages(handleMessageReceived));

    socket.on("message received", handleMessageReceived);
    console.log("Listening for 'message received' events");

    // Cleanup the effect
    return () => {
      socket.off("message received", handleMessageReceived);
      console.log("Stopped listening for 'message received' events");
    };
  }, []);

  // const messages = useSelector(state => state.requestData.messages);

  return (
    <View style={{ flex: 1 }}>
      <View className="relative  flex-grow">
        {attachmentScreen && (
          <View style={styles.overlay}>
            <Attachment
              setAttachmentScreen={setAttachmentScreen}
              setCameraScreen={setCameraScreen}
              user={user}
              // requestInfo={requestInfo}
              messages={messages}
              setMessages={setMessages}
            />
          </View>
        )}

        <View className=" relative bg-[#ffe7c8] pt-[40px] w-full flex flex-row px-[32px] justify-between items-center py-[30px]">
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{ padding: 2 }}
          >
            <FontAwesome name="arrow-left" size={15} color="black" />
          </Pressable>

          <View className="gap-[9px]">
            <View className="flex-row gap-[18px]">
              <View className=" flex items-center justify-center rounded-full">
                {requestInfo?.customerId?.pic ? (
                  <Image
                    source={{ uri: requestInfo?.customerId?.pic }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      objectFit: "cover",
                    }}
                    // className="w-[40px] h-[40px] rounded-full"
                  />
                ) : (
                  <Profile className="w-full h-full rounded-full" />
                )}
              </View>
              <View className="w-[60%]">
                <Text className="text-[14px]  text-[#2e2c43] capitalize">
                  {requestInfo?.customerId?.userName}
                </Text>
                <Text className="text-[12px] text-[#c4c4c4]">
                  Active 3 hr ago
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              setModal(!modal);
            }}
          >
            <View className="px-[20px] py-[10px] ">
              <ThreeDots />
            </View>
          </TouchableOpacity>
        </View>
        {modal && (
          <View className="absolute top-[20px] right-[80px]  bg-white rounded-md">
            <TouchableOpacity
              onPress={() => {
                setModal(!modal);
                navigation.navigate("viewrequest");
              }}
            >
              <Text className="mx-5  py-3">View Request</Text>
            </TouchableOpacity>
            {/* <Pressable
              onPress={() => {
                setCloseRequestModal(true);
                setModal(!modal);
              }}
            >
              <Text className="mx-5 py-3">Close Request</Text>
            </Pressable> */}
          </View>
        )}

        <View className="px-[50px] pb-[20px] flex bg-[#ffe7c8]">
          <View className="flex-row gap-[10px] items-center">
            <Text className="text-[16px] font-bold">Request Id</Text>
            <Text>{requestInfo?.requestId?._id}</Text>
            {/* {
              route.params?.data ? ( <Text>{req?.requestId._id}</Text>):( )
            } */}
          </View>
          <Text>
            {requestInfo?.requestId?.requestDescription
              ?.split(" ")
              .slice(0, 12)
              .join(" ")}
            ....
          </Text>
          {/* {
              route.params?.data ? ( <Text>{req?.requestId?.requestDescription}</Text>):( <Text>{requestInfo?.requestId?.requestDescription}</Text>)
            } */}
        </View>

        {/*  message are mapped here */}
          
        
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          style={{ marginBottom: 90 }}
        >
          {
            loading && 
            <View style={{flex:1}}>
               <View style={{ flex: 1,alignSelf:"flex-start" }}>
            <MessageLoaderSkeleton />
            </View>
              <View style={{ flex: 1,alignSelf:"flex-end" }}>
            <MessageLoaderSkeleton />
            </View>
           
           
            </View>
           
             
            
          }
          
          {  !loading && <View className="flex gap-[21px] px-[10px] pt-[40px] pb-[100px]">
            {/* <ChatMessage
              bidDetails={messages[0]}
             
            /> */}
            {messages &&
              messages?.map((message) => {
                // console.log("mapping", message); // You can move console.log outside of the return statement if you want to log the value
                if (message?.bidType === "update") {
                  return (
                    <View
                      key={message?._id}
                      className="flex flex-row justify-center bg-[#FFE7C8] rounded-xl px-4 py-1"
                    >
                      <Text className="text-[16px] text-[#FB8C00]">
                        {message?.message}
                      </Text>
                    </View>
                  );
                } else if (message?.sender?.refId !== user?._id) {
                  if (message?.bidType === "true" || messages[0] === message) {
                    return (
                      <View
                        key={message?._id}
                        className="flex flex-row justify-start"
                      >
                        <UserBidMessage bidDetails={message} />
                      </View>
                    );
                  } else if (message?.bidType === "false") {
                    return (
                      <View
                        key={message?._id}
                        className="flex flex-row justify-start"
                      >
                        <UserMessage bidDetails={message} />
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={message?._id}
                        className="flex flex-row justify-start"
                      >
                        <UserAttachment bidDetails={message} />
                      </View>
                    );
                  }
                } else {
                  if (message?.bidType === "true") {
                    return (
                      <View
                        key={message?._id}
                        className="flex flex-row justify-end"
                      >
                        <RetailerBidMessage bidDetails={message} user={user} />
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={message?._id}
                        className="flex flex-row justify-end"
                      >
                        <RetailerMessage bidDetails={message} user={user} />
                      </View>
                    );
                  }
                }
              })}
          </View>
            }

          {/* Spacer View */}
        </ScrollView>

      </View>

      {/* Typing Area */}
      <View
        className={`absolute bottom-0 left-0 right-0 pt-[10] ${
          attachmentScreen ? "-z-50" : "z-50"
        } `}
      >
        {requestInfo?.requestType !== "closed" &&
          requestInfo?.requestType === "new" &&
          available === false && (
            <View className="gap-[20px] items-center bg-white pt-[20px] shadow-2xl">
              <View>
                <Text className="text-[14px] font-bold text-center">
                  Are you accepting the customer bid?
                </Text>
                <Text className="text-[14px] text-center">
                  Please confirm the product availability by {"\n"} accepting
                  this request
                </Text>
              </View>

              <View className="w-full flex-row justify-between bg-white">
                <TouchableOpacity
                  onPress={() => setAcceptRequestModal(true)}
                  style={{ flex: 1 }}
                >
                  <View className="h-[63px] flex items-center justify-center border-[1px] bg-[#FB8C00] border-[#FB8C00]">
                    <Text className="font-bold text-[16px] text-white">
                      Accept
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCancelRequestModal(true)}
                  style={{ flex: 1 }}
                >
                  <View className="h-[63px] flex items-center justify-center border-2 border-[#FB8C00] bg-white">
                    <Text className="font-bold text-[16px] text-[#FB8C00]">
                      Product Not Available
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

        {requestInfo?.requestType !== "closed" &&
          requestInfo?.requestType !== "cancelled" &&
          requestInfo?.requestType !== "new" &&
          ((requestInfo?.requestId?.requestActive === "completed" &&
            requestInfo?.requestId?.requestAcceptedChat === user?._id) ||
            (messages[messages.length - 1]?.bidType === "true" &&
              messages[messages.length - 1]?.bidAccepted === "accepted") ||
            (messages[messages.length - 1]?.bidType === "true" &&
              messages[messages.length - 1]?.bidAccepted === "rejected") ||
            messages[messages.length - 1]?.bidType === "false" ||
            messages[messages.length - 1]?.bidType === "image") && (
            <View
              className="flex flex-row bg-white items-center justify-center"
              style={{ padding: 10 }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("bidQuery", {
                    user,
                    // requestInfo: requestInfo,
                    messages,
                    setMessages,
                  })
                }
                style={{ backgroundColor: "white", flex: 1 }}
              >
                <View className="h-[63px] flex items-center justify-center bg-white border-[1px] border-[#FB8C00] rounded-3xl">
                  <Text className="font-bold text-[16px] text-[#fb8c00] text-center">
                    Send Message to Customer
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAttachmentScreen(true);
                }}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View className="h-[63px] flex-row items-center justify-center bg-white border-[1px] border-[#FB8C00] rounded-3xl px-[4px]">
                  <Document />
                  <Text className="font-bold text-[16px] text-[#fb8c00] text-center">
                    Send attachment
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        {requestInfo?.requestType !== "closed" &&
          requestInfo?.requestType !== "cancelled" &&
          requestInfo?.requestId?.requestActive === "active" &&
          messages &&
          messages.length > 0 &&
          messages[messages.length - 1]?.bidType === "true" &&
          messages[messages.length - 1]?.bidAccepted === "new" &&
          messages[messages.length - 1]?.sender?.refId !== user?._id && (
            <View className="gap-[20px] items-center bg-white pt-[20px] shadow-2xl">
              <View>
                <Text className="text-[14px] font-bold text-center">
                  Are you accepting the customer bid?
                </Text>
                <Text className="text-[14px] text-center">
                  If you don’t understand the customer’s need,
                  {"\n"}select no and send query for clarification.
                </Text>
              </View>

              <View className="w-full flex-row justify-between">
                <TouchableOpacity
                  onPress={() => setAcceptRequestModal(true)}
                  style={{ flex: 1 }}
                >
                  <View className="h-[63px] flex items-center justify-center border-[1px] bg-[#FB8C00] border-[#FB8C00]">
                    <Text className="font-bold text-[16px] text-white">
                      Yes
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={RejectBid} style={{ flex: 1 }}>
                  <View className="h-[63px] flex items-center justify-center border-2 border-[#FB8C00] bg-white">
                    <Text className="font-bold text-[16px] text-[#FB8C00]">
                      No
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        {requestInfo?.requestType !== "closed" &&
          requestInfo?.requestType === "ongoing" &&
          requestInfo?.requestType !== "cancelled" &&
          requestInfo?.requestId?.requestActive === "active" &&
          messages &&
          messages.length > 0 &&
          ((messages[messages.length - 1]?.bidType === "true" &&
            messages[messages.length - 1]?.bidAccepted === "rejected") ||
            messages[messages.length - 1]?.bidType === "false" ||
            messages[messages.length - 1]?.bidType === "image") && (
            <View className="gap-[20px] bg-white pt-2">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("bidPageInput", {
                    user,
                    // requestInfo: requestInfo,
                    messages,
                    setMessages,
                  })
                }
              >
                <View className="h-[63px] flex items-center justify-center bg-[#FB8C00]">
                  <Text className="font-bold text-[16px] text-white">
                    Send a Bid
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
      </View>
      <RequestCancelModal
        modalVisible={cancelRequestModal}
        setModalVisible={setCancelRequestModal}
        // requestInfo={requestInfo}
      />
      {/* <RequestCancelModal
        modalVisible={closeRequestModal}
        setModalVisible={setCloseRequestModal}
      /> */}
      <RequestAcceptModal
        user={user}
        modalVisible={acceptRequestModal}
        setModalVisible={setAcceptRequestModal}
        messages={messages}
        setMessages={setMessages}
        // requestInfo={requestInfo}
        setAcceptLocal={setAcceptLocal}
      />

      {/* {closeRequestModal && <View style={styles.overlay} />} */}
      {acceptRequestModal && <View style={styles.overlay} />}
      {cancelRequestModal && <View style={styles.overlay} />}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    zIndex: 100,
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // position:"absolute",
    // bottom:0// Semi-transparent greyish background
  },
  // menuContainer: {
  //     flex: 1,
  //     // Add other styles for menu container
  // },
  attachments: {
    zIndex: 20, // Ensure the overlay is on top
  },
});

export default RequestPage;
