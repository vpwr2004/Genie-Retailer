import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity
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
import { setBidDetails } from "../../redux/reducers/bidSlice";
import { useDispatch, useSelector } from "react-redux";
import BackArrow from "../../assets/arrow-left.svg"


const BidPageInput = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, messages, setMessages } = route.params;
  const requestInfo = useSelector((state) => state.requestData.requestInfo);
  // const messages=route.params.messages;
  const [bidDetails, setBidDetailsLocal] = useState("");
  // const messages = useSelector(state => state.requestData.messages);
  // console.log("messages of ",messages)

  // useEffect(() => {
  //     if (route.params) {
  //         setUser(route.params.user);
  //         setRequestInfo(route.params.requestInfo);
  //         //         // console.log('images', images);
  //         //         // console.log('route.params.data', route.params.data);
  //     }
  // }, [])

  const handleBidDetails = (bidDetails) => {
    // Update the mobile number state
    setBidDetailsLocal(bidDetails);
    // Log the mobile number value
    console.log(bidDetails);
  };

  const handleNext = () => {
    dispatch(setBidDetails(bidDetails));
    navigation.navigate("bidPageImageUpload", { user, messages, setMessages });
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="relative flex-grow bg-[#ffe7c8]">
          <View className="z-50 bg-[#ffe7c8] w-full flex flex-row px-[32px] justify-between items-center py-[40px]">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding:6}}
            >
                         <BackArrow width={14} height={10} />

            </TouchableOpacity>

            <View className="gap-[9px]">
              <View className="flex-row gap-[18px]">
                <View className="flex items-center justify-center rounded-full bg-white p-[4px]">
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
                  <Text className="text-[12px] text-[#79B649]" style={{ fontFamily: "Poppins-Regular" }}>
                  Online
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
          <KeyboardAvoidingView>
            <View className="flex gap-[21px] px-[50px] pt-[10px] pb-[100px]">
              <View className="flex-row justify-between">
                <Text className="" style={{ fontFamily: "Poppins-Bold" }}>Send an offer</Text>
                <Text className="text-[#FB8C00] text-[14px] " style={{ fontFamily: "Poppins-Medium" }}>Step 1/3</Text>
              </View>
              <Text style={{ fontFamily: "Poppins-Regular" }}>Type your response here to the customer</Text>
              <View className="bg-white p-4 rounded-lg">
                <TextInput
                  multiline
                  numberOfLines={5}
                  placeholder="Start typing here"
                  placeholderTextColor="#dbcdbb"
                  classname=""
                  onChangeText={handleBidDetails}
                  style={{ fontFamily: "Poppins-Regular" }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>

          {/* Spacer View */}
          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>

    
        <TouchableOpacity
           disabled={!bidDetails} 
           onPress={handleNext}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 63,
              width: "100%",
              backgroundColor:
              !bidDetails? "#e6e6e6" : "#FB8C00",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily:"Poppins-Black",
                color: !bidDetails ? "#888888" : "white",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>

    </View>
  );
};

export default BidPageInput;
