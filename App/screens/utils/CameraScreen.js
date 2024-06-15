import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Send from "../../assets/SendMessage.svg";
import axios from "axios";
import { manipulateAsync } from "expo-image-manipulator";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { launchCamera } from "react-native-image-picker";
import { sendCustomNotificationAttachment } from "../../notification/notificationMessages";

// import { setMessages } from '../../redux/reducers/requestDataSlice';

const CameraScreen = () => {
  const [imageUri, setImageUri] = useState("");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const openCamera = route.params.data.openCamera;

  const [camScreen, setCamScreen] = useState(true);
  const dispatch = useDispatch();
  const { user, messages, setMessages } = route.params;
  const requestInfo = useSelector((state) => state.requestData.requestInfo);
  console.log("store", openCamera);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const sendAttachment = async () => {
    // console.log('res', query, imageUri);
    await axios
      .post("https://culturtap.com/api/chat/send-message", {
        sender: {
          type: "Retailer",
          refId: user?._id,
        },
        message: query,
        bidType: "false",
        bidImages: [imageUri],
        bidAccepted: "new",
        chat: requestInfo?._id,
      })
      .then(async (res) => {
        console.log(res.data);
        let mess = [...messages];
        console.log("query send", mess);
        mess.push(res.data);
        //  console.log("query update",mess);

        setMessages(mess);
        // setAttachmentScreen(false);

        // console.log("notification send", notification);
        navigation.navigate("requestPage", { data: requestInfo });
        const token = await axios.get(
          `https://culturtap.com/user/unique-token?id=${requestInfo?.customerId._id}`
        );
        if (token.data.length > 0) {
          const notification = {
            token: token.data,
            title: user?.storeName,
            body: query,
            requestInfo: requestInfo,
            tag: user?._id,
            redirect_to: "bargain",
            image: imageUri,
          };

          sendCustomNotificationAttachment(notification);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getImageUrl = async (image) => {
    setLoading(true);
    setCamScreen(false);
    let CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/kumarvivek/image/upload";

    let base64Img = `data:image/jpg;base64,${image.base64}`;

    let data = {
      file: base64Img,
      upload_preset: "CulturTap",
    };

    // console.log('base64', data);
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();

        // setPhoto(data.url);
        const imgUri = data.secure_url;
        if (imgUri) {
          setImageUri(imgUri);
          setLoading(false);
        }
        console.log("dataImg", data.secure_url);
        // return data.secure_url;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, [camScreen]);

  // const takePicture = async () => {
  //     if (camera) {
  //         const photo = await camera.takePictureAsync({
  //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //             allowsEditing: true,
  //             aspect: [4, 3],
  //             base64: true,
  //             quality: 0.5,
  //         });

  //         console.log('photo click ph', "photo");
  //         const compressedImage = await manipulateAsync(
  //             photo.uri,
  //             [{ resize: { width: 800, height: 800 } }],
  //             { compress: 0.5, format: "jpeg", base64: true }
  //           );

  //         await getImageUrl(compressedImage);

  //     }
  // };

  const takePicture = async () => {
    const options = {
      mediaType: "photo",
      saveToPhotos: true,
    };

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        try {
          const newImageUri = response.assets[0].uri;
          const compressedImage = await manipulateAsync(
            newImageUri,
            [{ resize: { width: 800, height: 800 } }],
            { compress: 0.5, format: "jpeg", base64: true }
          );
          await getImageUrl(compressedImage);
        } catch (error) {
          console.error("Error processing image: ", error);
        }
      }
    });
  };

  const pickImage = async () => {
    console.log("object", "hii");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    console.log("pickImage", "result");
    if (!result.cancelled) {
      getImageUrl(result.assets[0]);
    }
  };

  useEffect(() => {
    console.log("hello opening camera", openCamera);
    if (openCamera === false) {
      pickImage();
    } else {
      takePicture();
    }
  }, [openCamera]);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {imageUri && (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: imageUri }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <KeyboardAvoidingView
            behavior={"height"}
            style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}
          >
            <TextInput
              placeholder="Add response..."
              placeholderTextColor="white"
              style={{
                height: 64,
                backgroundColor: "#001b33",
                marginBottom: 0,
                marginHorizontal: 15,
                borderWidth: 2,
                borderColor: "#fb8c00",
                borderRadius: 30,
                fontWeight: "bold",
                paddingHorizontal: 30,
                color: "white",
              }}
              onChangeText={(val) => {
                setQuery(val);
              }}
              value={query}
            />
          </KeyboardAvoidingView>
          <View className=" flex-row justify-between items-center mx-[25px] pb-[10px]">
            <Text className="text-white  pl-[40px] capitalize" style={{ fontFamily: "Poppins-SemiBold" }}>
              {requestInfo?.customerId?.userName}
            </Text>
            <TouchableOpacity
              onPress={() => {
                sendAttachment();
              }}
            >
              <Send />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fb8c00" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 30,
    gap: 5,
    marginTop: 10,
  },
  imageWrapper: {
    margin: 5,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "gray",
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  // deleteIc: {
  //   position: 'absolute',
  //   top: 5,
  //   right: 5,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImage: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 2,
  },
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent greyish background
  },
  bottomBar: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  captureButton: {
    alignSelf: "center",
    backgroundColor: "#FB8C00",
    padding: 10,
    borderRadius: 100,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default CameraScreen;
