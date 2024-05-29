import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import LocationImg from "../../assets/LocationImg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ModalScreen from "../../components/ModalScreen";
import ModalScreenConfirm from "../../components/ModalScreenConfirm";
import { useDispatch } from "react-redux";
import { setStoreLocation } from "../../redux/reducers/storeDataSlice";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LocationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [storeLocation, setStoreLocationLocal] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [loc, setLoc] = useState();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      console.log(location);
      const { latitude, longitude } = location.coords;
      setLatitude(Number(latitude)); // Ensure values are stored as numbers
      setLongitude(Number(longitude));

      setStoreLocationLocal(latitude + "," + longitude);

      setLoc({ latitude, longitude });
      console.log(latitude, longitude);
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResponse.length > 0) {
        console.log(addressResponse[0]);
        const { city, postalCode, region, street } = addressResponse[0];
        setAddress(`${street}, ${city}, ${region}, ${postalCode}`);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshLocation = () => {
    fetchLocation();
  };

  const handleLocation = (storeLocation) => {
    // Update the mobile number state
    setStoreLocationLocal(storeLocation);
    // Log the mobile number value
    console.log(storeLocation);
  };
  const handleLocationChange = (location) => {
    // Update the mobile number state
    setLocation(location);
    // Log the mobile number value
    console.log(location);
  };

  const handleLocationFetching = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    const userId = userData._id;

    try {
      console.log("Location:", storeLocation, "user", userId);

      // Update location in Redux store
      dispatch(setStoreLocation(location));

      // Update location on server
      const response = await axios.patch(
        `https://genie-backend-meg1.onrender.com/retailer/editretailer`,
        {
          _id: userId,
          location: location,
          lattitude: latitude,
          longitude: longitude,
        }
      );

      console.log("Location updated successfully:", response.data);

      // Update user data in AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(response.data));

      // Navigate to home only after successfully updating the location
      navigation.navigate("home");
    } catch (error) {
      console.error("Failed to update location:", error);
      // Optionally handle error differently here
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="bg-white flex-col justify-center">
          <View className="w-full fixed z-40 px-[32px]  top-16 flex flex-row justify-between items-center">
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              className="flex flex-row p-2 items-center  gap-2"
            >
              <FontAwesome name="arrow-left" size={15} color="black" />
            </Pressable>
          </View>
          <View className="flex flex-col justify-center items-center px-[32px] ">
            <LocationImg height={322} width={291} />
          </View>
          {/* <View className="flex flex-row gap-[7px] mt-[46.5px]">
                    <View className="w-[24px] h-[7px] bg-[#fb8c00] rounded-lg"></View>
                    <View className="w-[24px] h-[7px] bg-[#fb8c00] rounded-lg"></View>
                    <View className="w-[24px] h-[7px] bg-[#fb8c00] rounded-lg"></View>
                    <View className="w-[24px] h-[7px] bg-[#fb8c00] rounded-lg"></View>
                </View> */}

          <View className="mt-[40px] mb-[45px] flex flex-col gap-[33px] px-[32px]">
            <View>
              <Text className="text-[18px] text-[#001B33]  font-extrabold">
                Please confirm your {"\n"}store location
              </Text>
              <Text className="text-[14px] text-[#2e2c43] mt-[36px]">
                Fetched Location
              </Text>
              <KeyboardAvoidingView>
                <View className="flex  items-center">
                  <TextInput
                    placeholder="189/2,  Out Side Datia Gate ,Jhansi, 28402"
                    placeholderTextColor={"#dbcdbb"}
                    value={address}
                    onChangeText={handleLocation}
                    readOnly
                    className="w-[330px] overflow-x-scroll  text-[14px]  px-[20px] py-[15px] bg-[#F9F9F9] font-semibold text-black rounded-[16px]"
                  />
                </View>
              </KeyboardAvoidingView>
              <Text className="text-[14px] text-[#2e2c43] mt-[10px]">
                Enter your Location
              </Text>
              <KeyboardAvoidingView>
                <View className="flex  items-center">
                  <TextInput
                    placeholder="189/2,  Out Side Datia Gate ,Jhansi, 28402"
                    placeholderTextColor={"#dbcdbb"}
                    value={location}
                    onChangeText={handleLocationChange}
                    className="w-[330px] overflow-x-scroll  text-[14px]  px-[20px] py-[15px] bg-[#F9F9F9] font-semibold text-black rounded-[16px]"
                  />
                </View>
              </KeyboardAvoidingView>
              <View className="flex items-start mt-[20px]">
                <Pressable onPress={handleRefreshLocation} className="w-max">
                  <Text className="text-[#E76063] text-[14px] font-extrabold">
                    Refresh
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <Pressable disabled={!location} onPress={handleLocationFetching}>
              <View className="w-full h-[63px] bg-[#fb8c00] absolute bottom-0 right-0 left-0  flex items-center justify-center ">
                <Text className="text-white text-[18px] font-extrabold">
                  Continue
                </Text>
              </View>
            </Pressable>
          </TouchableOpacity>
        </View>
        <View className="absolute flex justify-center items-center">
          <ModalScreen
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setModalConfirmVisible={setModalConfirmVisible}
          />
          <ModalScreenConfirm
            modalConfirmVisible={modalConfirmVisible}
            setModalConfirmVisible={setModalConfirmVisible}
          />
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fb8c00" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default LocationScreen;
