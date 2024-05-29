import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setStoreDescription } from "../../redux/reducers/storeDataSlice";

const WriteAboutStoreScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const storeDescription = () => {
    try {
      dispatch(setStoreDescription(query));
      navigation.navigate("addImg");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 32,
              marginTop: 50,
            }}
          >
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <FontAwesome name="arrow-left" size={15} color="black" />
            </Pressable>
            <Text style={{ flex: 1, textAlign: "center", fontSize: 16 }}>
              Tell us about your store{"\n"}category
            </Text>
          </View>

          <View style={{ paddingHorizontal: 32, marginTop: 29 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#2e2c43",
                textAlign: "center",
                marginBottom: 29,
              }}
            >
              We will consider and add your{"\n"}store category in our database
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              height: 127,
              backgroundColor: "#f9f9f9",
              borderRadius: 20,
            }}
          >
            <TextInput
              multiline
              numberOfLines={6}
              onChangeText={(val) => {
                setQuery(val);
              }}
              value={query}
              placeholder="Type here your store category......"
              placeholderTextColor="#DBCDBB"
              style={{
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderWidth: 0.3,
                borderColor: "#2e2c43",
                borderRadius: 20,
              }}
            />
          </View>
        </View>

        <TouchableOpacity>
          <Pressable disabled={!query} onPress={storeDescription}>
            <View
              style={{
                height: 63,
                backgroundColor: "#fb8c00",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                NEXT
              </Text>
            </View>
          </Pressable>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WriteAboutStoreScreen;
