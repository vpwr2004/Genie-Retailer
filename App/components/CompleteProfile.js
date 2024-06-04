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

const CompleteProfile = ({ completeProfile, location, verified, store,serviceProvider }) => {
  const navigation = useNavigation();
  // const serviceProvider = useSelector(
  //   (state) => state.storeData.serviceProvider
  // );
  console.log("services", serviceProvider);


  const handleLocation = () => {
    if (!location) {
      navigation.navigate("locationScreen", { data: "notservice" });
    }
  };
  const handleServiceLocation = () => {
    if (!location) {
      navigation.navigate("locationScreen", { data: "service" });
    }
  };
  const handleStore = () => {
    if (store?.length === 0 && serviceProvider !== "true") {
      navigation.navigate("writeAboutStore");
    }
  };
  return (
    <View className="gap-[17px] mb-[20px]">
      {!completeProfile ? (
        <Text className="text-[14px] font-bold text-center">
          Please complete your store profile {"\n"} before starting
        </Text>
      ) : (
        <View className="flex-row gap-[5px] items-center justify-center">
          <View className="w-[16px] h-[16px] bg-[#E76063] rounded-full"></View>
          <Text className="text-[14px] font-bold">
            {" "}
            Wait for request approval
          </Text>
        </View>
      )}

      {serviceProvider !== "true" && (
        <View className="flex items-center gap-[10px]">
          <TouchableOpacity
            disabled={serviceProvider === "true"}
            onPress={handleLocation}
          >
            <View className="w-[90%] flex-row items-center bg-white gap-[15px] h-[127px] rounded-3xl shadow-3xl px-[18px]">
              <View className="w-full flex-row justify-between">
                <View>
                  <Location />
                </View>

                <View className="flex ">
                  <Text className="text-[14px] font-bold">
                    {" "}
                    Set Store Location{" "}
                  </Text>
                  <Text className="text-[12px]">
                    We are fetching your location for the {"\n"}
                    purchase reference of our customers
                  </Text>
                </View>
                <View className="flex-row gap-[8px]">
                  {location && serviceProvider === "false" ? (
                    <Tick />
                  ) : (
                    <Arrow />
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={serviceProvider === "true"}
            onPress={handleStore}
          >
            <View className="w-[90%] flex-row items-center bg-white gap-[15px] h-[127px] rounded-3xl shadow-3xl px-[18px]">
              <View className="w-full flex-row justify-between">
                <View>
                  <Store />
                </View>

                <View className="flex ">
                  <Text className="text-[14px] font-bold">
                    {" "}
                    Complete store profile{" "}
                  </Text>
                  <Text className="text-[12px]">
                    We are fetching your location for the {"\n"}
                    purchase reference of our customers
                  </Text>
                </View>
                <View className="flex-row gap-[8px]">
                  {store.length === 0 ? <Arrow /> : <Tick />}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View className="mt-[10px]flex items-center justify-center gap-[20px]">
      {(serviceProvider !== "true" && serviceProvider!=="false") && ( 
      <View className="gap-[30px]">
         
            <View className="flex-row items-center justify-between gap-[20px]">
              <Line />
              <Text>OR</Text>
              <Line />
            </View>
          

          <View>
            <Text className="text-[14px] font-bold text-center">
              Are you a maintenance service providers ?{" "}
            </Text>
            <Text className="text-[14px]  text-center">
              (Don’t have store / shop)
            </Text>
          </View>
        </View>
      )}
      {
        serviceProvider !== "false" && 
        <TouchableOpacity
          
          onPress={handleServiceLocation}
        >
          <View className="w-[90%] flex-row items-center bg-white gap-[15px] h-[127px] rounded-3xl shadow-3xl px-[18px]">
            <View className="w-full flex-row justify-between">
              <View>
                <Location />
              </View>

              <View className="flex ">
                <Text className="text-[14px] font-bold">
                  {" "}
                  Set Store Location{" "}
                </Text>
                <Text className="text-[12px]">
                  We are fetching your location for the {"\n"}
                  purchase reference of our customers
                </Text>
              </View>
              <View className="flex-row gap-[8px]">
                {location && serviceProvider === "true" ? <Tick /> : <Arrow />}
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
