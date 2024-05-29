import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import StoreName from "../../assets/StoreName.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  setPanCard,
  setUserDetails,
} from "../../redux/reducers/storeDataSlice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PanCardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const mobileNumber = useSelector((state) => state.storeData.mobileNumber);
  const storeName = useSelector((state) => state.storeData.storeName);
  const storeOwnerName = useSelector((state) => state.storeData.storeOwnerName);
  const storeService = useSelector((state) => state.storeData.storeService);
  const storeCategory = useSelector((state) => state.storeData.storeCategory);
  const user = useSelector((state) => state.storeData.userDetails);

  const [panCard, setPanCardLocal] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(
    mobileNumber,
    storeCategory,
    storeName,
    storeOwnerName,
    storeService,
    panCard
  );

  const handlePanCard = (panCard) => {
    dispatch(setPanCard(panCard));
    setPanCardLocal(panCard);
  };

  const handleNext = async () => {
    setLoading(true);

    try {
      // Create user data object

      // Send user data to the server
      console.log("User data sent to");
      const response = await axios.post(
        "https://genie-backend-meg1.onrender.com/retailer/",
        {
          storeOwnerName: storeOwnerName,
          storeName: storeName,
          storeMobileNo: mobileNumber,
          storeCategory: storeCategory,
          homeDelivery: storeService,
          panCard: panCard,
        }
      );
      console.log("res", response);

      // Check if user creation was successful

      if (response.status === 201) {
        
        console.log("User created:", response.data);
        //  dispatch(setUserDetails(response.data));
        console.log("user", user);
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));

        // Navigate to the next screen
        navigation.navigate("home");
      } else {
        // Handle error if user creation failed
        console.error("Error creating user:");
        Alert.alert("Error", "Failed to create user. Please try again later.");
        setLoading(false);
      }
    } catch (error) {
      // Handle error if request fails
      console.error("Error creating user:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                top: 40,
                zIndex: 40,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 32,
              }}
            >
              <Pressable
                onPress={() => navigation.goBack()}
                style={{ padding: 2 }}
              >
                <FontAwesome name="arrow-left" size={15} color="black" />
              </Pressable>
              <Pressable onPress={handleNext}>
                <Text style={{ fontSize: 14, padding: 2 }}>Skip</Text>
              </Pressable>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <StoreName height={350} width={256} />
            </View>
            <View
              style={{
                marginTop: 92.5,
                marginBottom: 84,
                paddingHorizontal: 32,
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#2e2c43", fontWeight: "bold" }}
              >
                Please enter your
              </Text>
              <Text style={{ fontSize: 14, color: "#2e2c43" }}>
                Business Pan
              </Text>
              <View style={{ alignItems: "center", marginBottom: 10 }}>
                <TextInput
                  onChangeText={handlePanCard}
                  placeholder="Ex: Kishor Kumar"
                  style={{
                    width: 310,
                    height: 54,
                    backgroundColor: "#E5E7EB",
                    borderRadius: 30,
                    paddingLeft: 20,
                    marginTop: 15,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleNext}
          style={{
            width: "100%",
            height: 63,
            backgroundColor: "#fb8c00",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            NEXT
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

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
export default PanCardScreen;
