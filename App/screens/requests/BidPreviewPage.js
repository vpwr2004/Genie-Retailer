import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ThreeDots from "../../assets/ThreeDotIcon.svg";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../assets/ProfileIcon2.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { setMessages } from '../../redux/reducers/requestDataSlice';
import { socket } from "../utils/socket.io/socket";
import {
  sendCustomNotificationBid,
  
} from "../../notification/notificationMessages";
import BackArrow from "../../assets/arrow-left.svg"
import { setOngoingRequests } from "../../redux/reducers/requestDataSlice";



const BidPreviewPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [images, setImagesLocal] = useState();
  const [loading,setLoading] =useState(false)
  // const [offeredPrice,setOfferedPrice]=useState("");
  // const [user,setUser]=useState();
  // const [requestInfo,setRequestInfo]=useState()
  // console.log("messages of ",messages)
  const { offeredPrice, user, messages, setMessages } = route.params;
  const requestInfo = useSelector((state) => state.requestData.requestInfo);
  const bidDetails = useSelector((state) => state.bid.bidDetails);
  const bidOfferedPrice = useSelector((state) => state.bid.bidOfferedPrice);
  const bidImages = useSelector((state) => state.bid.bidImages);
  const warranty = useSelector((state) => state.bid.productWarranty);
  const ongoingRequests = useSelector(
    (state) => state.requestData.ongoingRequests || []
  );
  // const messages = useSelector(state => state.requestData.messages);

  // console.log("warranty",warranty);
  // console.log("bidDetails",messages);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         if (route.params) {
  //             const userDataString = await AsyncStorage.getItem("userData");
  //             const userData = JSON.parse(userDataString);
  //             console.log(userData);
  //             setUser(userData);
  //             setRequestInfo(route.params.requestInfo);
  //         }
  //     };

  //     fetchData();
  // }, [route.params]);

  const sendBid = async () => {
    setLoading(true)
    try {
      

      // console.log("requestinfo", requestInfo);
      // console.log("warranty", warranty);

      const response = await axios.post(
        "http://173.212.193.109:5000/chat/send-message",
        {
          sender: {
            type: "Retailer",
            refId: user?._id,
          },
          message: bidDetails,
          bidType: "true",
          bidPrice: bidOfferedPrice,
          bidImages: bidImages,
          chat: requestInfo?._id,
          warranty: warranty,
          userRequest:requestInfo?.requestId?._id
        }
      );
      console.log("res of meassage", response);
      if (response.status === 201) {
        console.log("messages recieved", response.data);
        socket.emit("new message", response.data);
        let mess = [...messages];
        console.log("query send", mess);
        mess.push(response.data);
        console.log("query update", mess);

        setMessages(mess);
        const filteredRequests = ongoingRequests.filter(
          (request) => request._id !==requestInfo._id
        );
        const requests = ongoingRequests.filter(
          (request) => request._id ===requestInfo._id
        );
        console.log("request ongoing",filteredRequests.length,requests.length)
        const data=[...requests,...filteredRequests];
         dispatch(setOngoingRequests(data));
        setLoading(false)

        navigation.navigate("requestPage");
        const token=await axios.get(`http://173.212.193.109:5000/user/unique-token?id=${requestInfo?.customerId._id}`);
        if(token.data.length>0){
        const notification = {
          token:token.data,
           title: user?.storeName,
           body: bidDetails,
           requestInfo: requestInfo,
           tag: user?._id,
           price: bidOfferedPrice,
           image: bidImages[0],
           redirect_to: "bargain",
         };
         sendCustomNotificationBid(notification);
        }

         
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
        <View className="relative flex-grow bg-[#ffe7c8]">
          <View className="z-50 bg-[#ffe7c8] w-full flex flex-row px-[32px] justify-between items-center py-[40px]">
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding:4}}
            >
                         <BackArrow width={14} height={10} />

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
                  <Text className="text-[14px] text-[#2e2c43] capitalize" style={{ fontFamily: "Poppins-Regular" }}>
                    {requestInfo?.customerId?.userName}
                  </Text>
                  <Text className="text-[12px] text-[#c4c4c4]" style={{ fontFamily: "Poppins-Regular" }}>
                    Active 3 hr ago
                  </Text>
                </View>
              </View>
            </View>

            {/* <Pressable onPress={() => { console.log("hii") }}>
                                <ThreeDots />
                            </Pressable> */}
          </View>
          <View className="px-[50px] pb-[20px] flex ">
            <View className="flex-row gap-[10px] items-center">
              <Text className="text-[16px] " style={{ fontFamily: "Poppins-Bold" }}>Request Id</Text>
              <Text style={{ fontFamily: "Poppins-Regular" }}>{requestInfo?.requestId?._id}</Text>
            </View>
            <Text style={{ fontFamily: "Poppins-Regular" }}>
            {requestInfo?.requestId?.requestDescription
              ?.split(" ")
              .slice(0, 12)
              .join(" ")}
            ....
          </Text>
          </View>

          <View className="flex gap-[21px]  pt-[10px] pb-[100px]">
            <View className="flex-row justify-between px-[50px]">
              <Text className="" style={{ fontFamily: "Poppins-Bold" }}>Preview your bid response</Text>
            </View>
            <View className="px-[50px]">
              {/* <Text>{user?.storeOwnerName}</Text> */}
              <Text style={{ fontFamily: "Poppins-Regular" }}>{bidDetails}</Text>
            </View>
            <View className="gap-[10px]">
              <Text className=" text-[14px] px-[50px]" style={{ fontFamily: "Poppins-SemiBold" }}>
                Reference Images
              </Text>
              {bidImages ? (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View className="flex-row gap-[10px] pl-[50px]">
                    {bidImages &&
                      bidImages?.map(
                        (
                          image,
                          index // Start from index 1 to exclude the first image
                        ) => (
                          <View key={index} className="rounded-3xl">
                            <Image
                              source={{ uri: image }}
                              width={100}
                              height={140}
                              className="rounded-3xl border-[1px] border-slate-400 object-contain"
                            />
                          </View>
                        )
                      )}
                  </View>
                </ScrollView>
              ) : (
                <View className="flex-row gap-[10px] px-[50px]">
                  <View className="h-[140px] w-[100px] rounded-3xl bg-white "></View>
                  <View className="h-[140px] w-[100px] rounded-3xl bg-white"></View>
                </View>
              )}
            </View>
            <View className="gap-[0px] px-[50px]">
              <Text className=" text-[14px]" style={{ fontFamily: "Poppins-SemiBold" }}>Offered Price</Text>
              <Text className=" text-[24px] text-[#558B2F]" style={{ fontFamily: "Poppins-Bold" }}>
                Rs {bidOfferedPrice?bidOfferedPrice:"Na"}
              </Text>
            </View>
            <View className="gap-[0px] px-[50px]">
              <Text className=" text-[14px]" style={{ fontFamily: "Poppins-SemiBold" }}>
                Product Warranty
              </Text>
              <Text className=" text-[24px] text-[#558B2F]" style={{ fontFamily: "Poppins-Bold" }}>
                {warranty?warranty:"Na"}
              </Text>
            </View>
          </View>

          {/* Spacer View */}
          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>

      {/* Typing Area */}
      <View className="absolute bottom-0 left-0 right-0">
        <View className="gap-[20px]">
          <TouchableOpacity onPress={sendBid}>
            <View className="w-full h-[63px] flex items-center justify-center  bg-[#FB8C00] ">
            {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
              <Text className="text-[16px] text-white" style={{ fontFamily: "Poppins-Black" }}>Next</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BidPreviewPage;
