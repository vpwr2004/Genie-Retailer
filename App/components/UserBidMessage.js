import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import DPIcon from "../assets/DPIcon.svg";
import { Entypo } from "@expo/vector-icons";
import Tick from "../assets/tick.svg";

import { useSelector } from "react-redux";
import { formatDateTime } from "../screens/utils/lib";

const UserBidMessage = ({ bidDetails }) => {
  const { formattedTime, formattedDate } = formatDateTime(
    bidDetails?.updatedAt
  );

  // console.log("bidDetails", bidDetails);
  // const userDetails = useSelector(store => store.user.userDetails);
  const requestInfo = useSelector(
    (state) => state.requestData.requestInfo || {}
  );

  // console.log('userDetails', userDetails);
  return (
    <View className="flex gap-[19px]   rounded-3xl w-[297px]  py-[20px] items-center bg-[#fafafa]">
      <View className="flex-row gap-[18px]">
        <View>
          {requestInfo?.customerId?.pic ? (
            <Image
              source={{ uri: requestInfo?.customerId?.pic }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
              // className="w-[40px] h-[40px] rounded-full"
            />
          ) : (
            <Image
              source={{
                uri: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
              }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
              // className="w-[40px] h-[40px] rounded-full"
            />
          )}

          {/* <DPIcon size={20} className="object-contain" /> */}
        </View>
        <View className="w-[60%]">
          <View className="flex flex-row justify-between">
            <Text className="text-[14px] text-[#2e2c43]  capitalize" style={{ fontFamily: "Poppins-ExtraBold" }}>
              {requestInfo?.customerId?.userName}
            </Text>

            <Text className="text-[12px] text-[#2e2c43] " style={{ fontFamily: "Poppins-Regular" }}>{formattedTime}</Text>
          </View>
          <Text className="text-[14px] text-[#2e2c43]" style={{ fontFamily: "Poppins-Regular" }}>
            {bidDetails.message}
          </Text>
        </View>
      </View>
      <View className="flex-row gap-[4px]">
        <ScrollView horizontal={true}>
          <View className="justify-center pl-[30px]">
            <View className="flex-row gap-2 items-center">
              {bidDetails?.bidImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  className="h-[132px] w-[96px] rounded-3xl"
                />
              ))}
            </View>
          </View>
        </ScrollView>
        {/* {
                    bidDetails.bidImages?.map((image, index) => (
                        <View key={index}>
                            <Image source={{ uri: image }} className="h-[132px] w-[96px] rounded-3xl bg-[#EBEBEB]" />
                        </View>
                    ))
                } */}
      </View>
      <View className="gap-[4px]">
        <View className="flex-row gap-[5px]">
          <Text style={{ fontFamily: "Poppins-Medium" }}>Expected Price: </Text>
          <Text className=" text-[##79B649]" style={{ fontFamily: "Poppins-SemiBold" }}>
            Rs. {bidDetails.bidPrice}
          </Text>
        </View>
        {/* <View className="flex-row gap-[5px]">
          <Text>Warranty: </Text>
          <Text className="font-bold text-[#79B649]">
            {bidDetails.warranty} months
          </Text>
        </View> */}

        {bidDetails?.bidAccepted === "rejected" && (
          <View className="flex-row items-center gap-1">
            <Entypo name="circle-with-cross" size={20} color="#E76063" />
            <Text className="text-[14px] text-[#E76063]" style={{ fontFamily: "Poppins-Regular" }}>Bid Rejected</Text>
          </View>
        )}
        {bidDetails?.bidAccepted === "accepted" && (
          <View className="flex-row items-center gap-1">
            <Tick width={18} height={18} />
            <Text className="text-[14px] text-[#79B649]" style={{ fontFamily: "Poppins-Regular" }}>Bid Accepted</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default UserBidMessage;

const styles = StyleSheet.create({});
