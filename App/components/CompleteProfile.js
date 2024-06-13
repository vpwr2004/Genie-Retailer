import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Location from "../assets/location.svg";
import Store from "../assets/store.svg";
import Arrow from "../assets/rightarrow.svg";
import Tick from "../assets/tick.svg";
import Line from "../assets/line.svg";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import HomeScreenUnverified from "./HomeScreenUnverified";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CompleteProfile = ({ completeProfile }) => {
  const navigation = useNavigation();
  // const serviceProvider = useSelector(
  //   (state) => state.storeData.serviceProvider
  // );
const user= useSelector(state => state.storeData.userDetails)

  console.log("services", user.serviceProvider);


  const handleLocation = () => {
    if (!user.lattitude) {
      navigation.navigate("locationScreen", { data: "notservice" });
    }
  };
  const handleServiceLocation = () => {
    if (!user.lattitude && user.storeImages?.length === 0) {
      navigation.navigate("locationScreen", { data: "service" });
    }
  };
  const handleStore = () => {
    if (user.storeImages?.length === 0 && user.serviceProvider !== "true") {
      navigation.navigate("writeAboutStore");
    }
  };
  return (
    <View className="gap-[17px] mb-[20px] bg-white">
      {!completeProfile ? (
        <Text className="text-[14px] text-center" style={{ fontFamily: "Poppins-Bold" }}>
          Please complete your store profile {"\n"} before starting
        </Text>
      ) : (
        <View className="flex-row gap-[5px] items-center justify-center">
          <View className="w-[16px] h-[16px] bg-[#E76063] rounded-full"></View>
          <Text className="text-[14px] " style={{ fontFamily: "Poppins-Bold" }}>
            {" "}
            Wait for request approval
          </Text>
        </View>
      )}

      {user.serviceProvider !== "true" && (
        <View className="flex items-center gap-[10px]">
          <TouchableOpacity
            disabled={user.serviceProvider === "true"}
            onPress={handleLocation}
            style={{
              backgroundColor: '#fff', // Ensure the background is white
              // Add some margin if necessary for better shadow visibility
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
              borderRadius:10
            }}
          >
            <View className="w-[90%] flex-row items-center bg-white gap-[15px] h-[127px] rounded-3xl shadow-3xl px-[18px]">
              <View className="w-full flex-row justify-between">
                <View>
                  <Location />
                </View>

                <View className="flex ">
                  <Text className="text-[14px] " style={{ fontFamily: "Poppins-Bold" }}>
                    {" "}
                    Set Store Location{" "}
                  </Text>
                  <Text className="text-[12px]" style={{ fontFamily: "Poppins-Regular" }}>
                    We are fetching your location for the {"\n"}
                    purchase reference of our customers
                  </Text>
                </View>
                <View className="flex-row gap-[8px]">
                  {user.lattitude && user.serviceProvider === "false" ? (
                    <Tick />
                  ) : (
                    <Arrow />
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={user.serviceProvider === "true"}
            onPress={handleStore}
            style={{
              backgroundColor: '#fff', // Ensure the background is white
              // Add some margin if necessary for better shadow visibility
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
              borderRadius:10
            }}
          >
            <View className="w-[90%] flex-row items-center bg-white gap-[15px] h-[127px] rounded-3xl shadow-3xl px-[18px]">
              <View className="w-full flex-row justify-between">
                <View>
                  <Store />
                </View>

                <View className="flex ">
                  <Text className="text-[14px]" style={{ fontFamily: "Poppins-Bold" }}>
                    {" "}
                    Complete store profile{" "}
                  </Text>
                  <Text className="text-[12px]" style={{ fontFamily: "Poppins-Regular" }}>
                    We are fetching your location for the {"\n"}
                    purchase reference of our customers
                  </Text>
                </View>
                <View className="flex-row gap-[8px]">
                  {user.storeImages.length === 0 ? <Arrow /> : <Tick />}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View className="mt-[10px]flex items-center justify-center gap-[20px]">
      {((user.serviceProvider !== "true" && user.serviceProvider!=="false" && user.storeImages?.length === 0)) && ( 
      <View className="gap-[30px]">
         
            <View className="flex-row items-center justify-between gap-[20px]">
              <Line />
              <Text style={{ fontFamily: "Poppins-SemiBold" }}>OR</Text>
              <Line />
            </View>
          

          <View>
            <Text className="text-[14px]  text-center" style={{ fontFamily: "Poppins-Bold" }}>
              Are you a maintenance service providers ?{" "}
            </Text>
            <Text className="text-[14px]  text-center" style={{ fontFamily: "Poppins-Light" }}>
              (Don’t have store / shop)
            </Text>
          </View>
        </View>
      )}
      {
        user.serviceProvider  !== "false" && user.storeImages?.length === 0 && 
        <TouchableOpacity
          
          onPress={handleServiceLocation}
          style={{
            backgroundColor: '#fff', // Ensure the background is white
                        
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            borderRadius:10
          }}
        >
          <View className="w-[90%] flex-row items-center bg-white gap-[15px] h-[127px] rounded-3xl shadow-3xl px-[18px]">
            <View className="w-full flex-row justify-between">
              <View>
                <Location />
              </View>

              <View className="flex ">
                <Text className="text-[14px] " style={{ fontFamily: "Poppins-Bold" }}>
                  {" "}
                  Set Store Location{" "}
                </Text>
                <Text className="text-[12px]" style={{ fontFamily: "Poppins-Regular" }}>
                  We are fetching your location for the {"\n"}
                  purchase reference of our customers
                </Text>
              </View>
              <View className="flex-row gap-[8px]">
                {user.lattitude  && user.serviceProvider  === "true" ? <Tick /> : <Arrow />}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      }
        
      </View>
      {completeProfile && <HomeScreenUnverified />}
    </View>
  );
};

export default CompleteProfile;

// const styles = StyleSheet.create({})
