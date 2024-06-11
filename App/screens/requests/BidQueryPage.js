import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import ThreeDots from "../../assets/ThreeDotIcon.svg";
import { FontAwesome } from "@expo/vector-icons";

import Copy from "../../assets/Copy.svg";
import Document from "../../assets/Document.svg";
import Send from "../../assets/Send.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../assets/ProfileIcon2.svg";

import axios from "axios";
import { socket } from "../utils/socket.io/socket";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/reducers/requestDataSlice";
import { sendCustomNotificationChat } from "../../notification/notificationMessages";


const BidQueryPage = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [query, setQuery] = useState("");
  const { user, messages, setMessages } = route.params;
  const requestInfo = useSelector((state) => state.requestData.requestInfo);
  const [loading,setLoading]=useState(false)
  // const messages = useSelector(state => state.requestData.messages);
  // console.log("messages of ",messages);

  // useEffect(() => {
  //     if (route.params) {
  //         setUser(route.params.user);
  //         setRequestInfo(route.params?.requestInfo);
  //         //         // console.log('images', images);
  //         //         // console.log('route.params.data', route.params.data);
  //     }
  // }, [route.params])

  const sendQuery = async () => {
    setLoading(true)
    try {
     

      const response = await axios.post(
        "http://173.212.193.109:5000/chat/send-message",
        {
          sender: {
            type: "Retailer",
            refId: user?._id,
          },
          message: query,
          bidType: "false",
          warranty: 0,
          bidPrice: 0,
          bidImages: [],
          chat: requestInfo?._id,
        }
      );
      //    console.log("res",response);
      if (response.status === 201) {
        //  console.log("messages recieved",response.data);

        socket.emit("new message", response.data);
        let mess = [...messages];
        //  console.log("query send",mess);
        mess.push(response.data);
        //  console.log("query update",mess);

        //  dispatch(setMessages(mess));
        setMessages(mess);
       
        // console.log("notification", notification.requestInfo);
        setLoading(false)
        navigation.navigate("requestPage");
        const token=await axios.get(`http://173.212.193.109:5000/user/unique-token?id=${requestInfo?.customerId._id}`);
        console.log("token",token.data);
        if(token.data.length > 0){
        const notification = {
          token:token.data,
          title: user?.storeName,
          body: query,
          requestInfo: requestInfo,
          tag: user?._id,
          redirect_to: "bargain",
        };
        sendCustomNotificationChat(notification);
         }
        //  console.log("res after sending notification ",res);
        //   try{
        //  const res=await axios.get(`http://localhost:3000/send-notification-chat?name=Rohit&body=Hii how are you&redirect_to=requestPage&requestInfo={"__v": 1, "_id": "66532414ff164bf94697251d", "bidCompleted": true, "createdAt": "2024-05-26T11:59:16.279Z", "requestId": {"__v": 0, "_id": "66532414ff164bf94697251b", "createdAt": "2024-05-26T11:59:16.052Z", "customer": "664d6fb333bcb1bbd6cf9f66", "expectedPrice": 2500, "requestAcceptedChat": "66532414ff164bf94697251d", "requestActive": "completed", "requestCategory": "spare parts", "requestDescription": "bike tyre", "requestImages": ["https://res.cloudinary.com/kumarvivek/image/upload/v1716724746/zznnqcnga7ktx9v4vlto.jpg"], "updatedAt": "2024-05-26T12:00:58.405Z"}, "requestType": "completed", "updatedAt": "2024-05-26T12:00:58.844Z", "users": [{"_id": "66532414ff164bf94697251e", "refId": "664d74f100215ea2aea8a35d", "type": "Retailer"}, {"_id": "66532437ff164bf94697252e", "refId": "66532414ff164bf94697251b", "type": "UserRequest"}]}`)
        //     console.log("res after sending notification ",res);

        //   }
        //   catch(err){
        //     console.log("error sending notification",err);
        //   }
        setQuery("");
      } else {
        console.error("Error updating message:");
      }
    } catch (error) {
      setLoading(false)
      console.log("error sending message", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="relative  flex-grow bg-[#ffe7c8]">
          <View className="z-50 bg-[#ffe7c8] w-full flex flex-row px-[32px] justify-between items-center py-[40px]">
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <FontAwesome name="arrow-left" size={15} color="black" />
            </Pressable>

            <View className="gap-[9px]">
              <View className="flex-row gap-[18px]">
                <View className="flex items-center justify-center rounded-full">
                  {requestInfo?.customerId?.pic ? (
                    <Image
                      source={{ uri: requestInfo?.customerId?.pic }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                      // className="w-[40px] h-[40px] rounded-full"
                    />
                  ) : (
                    <Profile className="" />
                  )}
                </View>
                <View className="w-[70%]">
                  <Text className="text-[14px] text-[#2e2c43] capitalize">
                    {requestInfo?.customerId?.userName}
                  </Text>
                  <Text className="text-[12px] text-[#c4c4c4]">
                    Active 3 hr ago
                  </Text>
                </View>
              </View>
            </View>

            {/* <Pressable onPress={() => { console.log("hii") }}>
                                <ThreeDots />
                            </Pressable> */}
          </View>
          <View className="px-[50px] pb-[20px] flex bg-[#ffe7c8]">
            <View className="flex-row gap-[10px] items-center">
              <Text className="text-[16px] font-bold">Request Id</Text>
              <Text>{requestInfo?.requestId?._id}</Text>
            </View>
            <Text>
            {requestInfo?.requestId?.requestDescription
              ?.split(" ")
              .slice(0, 12)
              .join(" ")}
            ....
          </Text>
          </View>
          <KeyboardAvoidingView>
            <View className="flex gap-[21px] px-[50px] pt-[10px] pb-[100px]">
              <View className="flex-row justify-between">
                <Text className="font-bold">Send a Query</Text>
                {/* <Text>Step 1/3</Text> */}
              </View>
              <Text>Type your response here to the customer</Text>
              <View className="bg-white p-4 rounded-lg">
                <TextInput
                  multiline
                  numberOfLines={5}
                  placeholder="Start typing here"
                  placeholderTextColor="#dbcdbb"
                  classname=" "
                  onChangeText={(text) => setQuery(text)}
                />
              </View>
            </View>
          </KeyboardAvoidingView>

          {/* Spacer View */}
          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>

      
        <TouchableOpacity
           disabled={!query} 
           onPress={sendQuery}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 63,
              width: "100%",
              backgroundColor:
              !query? "#e6e6e6" : "#FB8C00",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
            }}
          >
            {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: !query ? "#888888" : "white",
              }}
            >
              Next
            </Text>)}
          </TouchableOpacity>

    </View>
  );
};

export default BidQueryPage;
