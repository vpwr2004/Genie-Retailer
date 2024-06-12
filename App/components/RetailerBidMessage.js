import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import DPIcon from "../assets/DPIcon.svg";

import Tick from "../assets/tick.svg";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { formatDateTime } from "../screens/utils/lib";

const RetailerBidMessage = ({ bidDetails, user }) => {
  const { formattedTime, formattedDate } = formatDateTime(
    bidDetails?.updatedAt
  );
  // console.log("time",formattedTime)

  return (
    <View className="flex gap-[19px]  border-[1px] border-gray-200 rounded-3xl w-[297px]  py-[20px] items-center bg-[#ebebeb]">
      <View className="flex-row gap-[18px]">
        <View>
          <Image
            source={{ uri: user?.storeImages[0] }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </View>
        <View className="w-[60%] ">
          <View className="flex flex-row justify-between">
            <Text className="text-[14px] text-[#2e2c43]" style={{ fontFamily: "Poppins-ExtraBold" }}>You</Text>
            <Text className="text-[12px] text-[#2e2c43] " style={{ fontFamily: "Poppins-Regular" }}>{formattedTime}</Text>
          </View>
          <Text className="text-[14px] text-[#2e2c43]" style={{ fontFamily: "Poppins-Regular" }}>
            {bidDetails?.message}
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
          <Text style={{ fontFamily: "Poppins-Medium" }}>Offered Price: </Text>
          <Text className=" text-[##79B649]" style={{ fontFamily: "Poppins-SemiBold" }}>
            Rs. {bidDetails.bidPrice}
          </Text>
        </View>
        <View className="flex-row gap-[5px]">
          <Text style={{ fontFamily: "Poppins-Medium" }}>Warranty: </Text>
          <Text className="text-[#79B649]" style={{ fontFamily: "Poppins-SemiBold" }}>
            {" "}
            {bidDetails.warranty} months
          </Text>
        </View>

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

export default RetailerBidMessage;

const styles = StyleSheet.create({});
