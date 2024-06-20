import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setNewRequests,
  setOngoingRequests,
  setRequestInfo,
  setRetailerHistory,
} from "../redux/reducers/requestDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import HomeScreenRequests from "./HomeScreenRequests";
import ProductOrderCard from "./ProductOrderCard";
import { SafeAreaView } from "react-native-safe-area-context";
import messaging from "@react-native-firebase/messaging";
import { notificationListeners } from "../notification/notificationServices";
import RequestLoader from "../screens/utils/RequestLoader";
import { socket } from "../screens/utils/socket.io/socket";
import { formatDateTime } from "../screens/utils/lib";

const HomeScreenVerified = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState("New");
  const [request, setRequest] = useState(true);
  const newRequests = useSelector(
    (state) => state.requestData.newRequests || []
  );
  const ongoingRequests = useSelector(
    (state) => state.requestData.ongoingRequests || []
  );
  const retailerHistory = useSelector(
    (state) => state.requestData.retailerHistory || []
  );
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userData = useSelector((state) => state.storeData.userDetails);
  const isFirstLoad = useRef(true);
  const [socketConnected, setSocketConnected] = useState(false);

  const connectSocket = useCallback(async (id) => {
    // socket.emit("setup", currentSpadeRetailer?.users[1]._id);
    socket.emit("setup", id);
    //  console.log('Request connected with socket with id', spadeId);
    socket.on('connected', () => setSocketConnected(true));
    console.log('Home Screen socekt connect with id', id);
  })


  useEffect(() => {
    connectSocket(userData._id);
  }, []);




  useEffect(() => {
    const handleMessageReceived = (updatedUser) => {
      console.log('Updated user data received at socket', updatedUser._id, updatedUser.latestMessage.message, updatedUser.unreadCount);
      // if (userData._id === updatedUser.requestId._id) {



      // const data = formatDateTime(updatedUser.updatedAt);
      // updatedUser.createdAt = data.formattedDate;
      // updatedUser.updatedAt = data.formattedTime;
      console.log("ongoing requests", ongoingRequests.length)

      const filteredRequests = ongoingRequests.filter(
        (request) => request._id !== updatedUser._id
      );
      console.log("ongoing requests", filteredRequests.length)
      const updatedRequest = [updatedUser, ...filteredRequests];
      dispatch(setOngoingRequests(updatedRequest));

      // dispatch(setCurrentSpadeRetailers((prevUsers) => {
      //     return prevUsers.map((user) =>
      //         user._id === updatedUser._id ? updatedUser : user
      //     );
      // }));
      // if (updatedUser.latestMessage.bidType === "true" && updatedUser.latestMessage.bidAccepted === "accepted") {
      //   const tmp = { ...currentSpade, requestActive: "completed", requestAcceptedChat: updatedUser._id };
      //   dispatch(setCurrentSpade(tmp));
      //   let allSpades = [...spades];
      //   allSpades.map((curr, index) => {
      //     if (curr._id === tmp._id) {
      //       allSpades[index] = tmp;
      //     }
      //   })
      //   dispatch(setSpades(allSpades));
      // }



      // }
    };

    socket.on("updated retailer", handleMessageReceived);

    // Cleanup the effect
    return () => {
      socket.off("updated retailer", handleMessageReceived);
    };
  }, [dispatch,ongoingRequests]);










  useEffect(() => {

    console.log("request refreshing")
    handleRefresh();


  }, [route.params]);

  const fetchNewRequests = (async () => {
    setLoading(true);
    try {
      // const userData = JSON.parse(await AsyncStorage.getItem("userData"));
      const response = await axios.get(
        `http://173.212.193.109:5000/chat/retailer-new-spades?id=${userData?._id}`
      );
      if (response.data) {

        console.log("hiii verified");
        dispatch(setNewRequests(response.data));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      dispatch(setNewRequests([]));
      // console.error('Error fetching new requests:', error);
    }
  });

  const fetchOngoingRequests =useCallback( async () => {
    setIsLoading(true);

    try {
      // const userData = JSON.parse(await AsyncStorage.getItem("userData"));
      const ongoingresponse = await axios.get(
        `http://173.212.193.109:5000/chat/retailer-ongoing-spades?id=${userData?._id}`
      );
      if (ongoingresponse.data) {

        console.log("hiiiuu")
        dispatch(setOngoingRequests(ongoingresponse.data));
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      dispatch(setOngoingRequests([]));
      //console.error('Error fetching ongoing requests:', error);
    }
  });

  const fetchRetailerHistory =useCallback( async () => {
    try {
      // const userData = JSON.parse(await AsyncStorage.getItem("userData"));
      const history = await axios.get(
        `http://173.212.193.109:5000/retailer/history?id=${userData?._id}`
      );
      if (history.data) {

        dispatch(setRetailerHistory(history.data));
      }
      // console.log("history",history.data);
    } catch (error) {
      dispatch(setRetailerHistory([]));
      //console.error('Error fetching ongoing requests:', error);
    }
  });

  const handleRefresh = () => {
    setRefreshing(true); // Show the refresh indicator
    setLoading(true)
    try {
      // Fetch new data from the server
      fetchNewRequests();
      fetchOngoingRequests();
      fetchRetailerHistory();

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
    setRefreshing(false); // Hide the refresh indicator
  };

  // Setting socket for requests
  useEffect(() => {
    const setupNotifications = async () => {
      console.log("notify data", ongoingRequests.length);
      await notificationListeners(
        dispatch,
        newRequests,
        ongoingRequests,
        retailerHistory
      );

      // setRequest(true);
    };
    setupNotifications();
  }, [dispatch,newRequests]);

  useEffect(() => {
    socket.emit("setup", userData?._id);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch(setRequestInfo(item));
        navigation.navigate("requestPage");
      }}
      style={{
        backgroundColor: "#fff",
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 16,
      }}
    >
      <ProductOrderCard product={item} />
    </TouchableOpacity>
  );

  return (
    <View>
      <View
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
      >

        {(newRequests?.length > 0 ||
          ongoingRequests?.length > 0 ||
          retailerHistory?.length > 0) && (
            <View className="flex items-center">
              <View>
                <View className="flex-row justify-between px-[20px]  gap-[5x] mb-[20px]">
                  <TouchableOpacity onPress={() => setTab("New")}>
                    <View className="flex-row  gap-[5px]  items-center p-[4px]">
                      <Text
                        style={{
                          fontFamily:
                            tab === "New" ? "Poppins-Bold" : "Poppins-Regular",
                          borderBottomWidth: tab === "New" ? 3 : 0,
                          borderBottomColor: "#FB8C00",
                        }}
                      >
                        New Requests
                      </Text>
                      <View className="bg-[#E76063] h-[22px] flex justify-center items-center w-[22px]  rounded-full">
                        <Text
                          className="text-white  "
                          style={{ fontFamily: "Poppins-Regular" }}
                        >
                          {newRequests ? newRequests.length : 0}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setTab("Ongoing")}>
                    <View className="flex-row gap-[5px] items-center p-[4px]">
                      <Text
                        style={{
                          fontFamily:
                            tab === "Ongoing"
                              ? "Poppins-Bold"
                              : "Poppins-Regular",

                          borderBottomWidth: tab === "Ongoing" ? 3 : 0,
                          borderBottomColor: "#FB8C00",
                        }}
                      >
                        Ongoing Requests
                      </Text>
                      <View className="bg-[#E76063] h-[22px] flex justify-center items-center w-[22px]  rounded-full">
                        <Text
                          className="text-white  "
                          style={{ fontFamily: "Poppins-Regular" }}
                        >
                          {ongoingRequests ? ongoingRequests.length : 0}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                {tab === "New" && (
                  <FlatList
                    data={newRequests}
                    renderItem={renderItem}
                    keyExtractor={(item) => {
                      if (!item?._id) {
                        // console.error('Item without _id:', item);
                        return Math.random().toString();
                      }
                      return item?._id.toString();
                    }}
                    ListEmptyComponent={
                      <Text
                        className="text-[14px] text-center mb-[20px]"
                        style={{ fontFamily: "Poppins-Regular" }}
                      >
                        No New Requests
                      </Text>
                    }
                  />
                )}
                {tab === "Ongoing" && (
                  <FlatList
                    data={ongoingRequests}
                    renderItem={renderItem}
                    keyExtractor={(item) => {
                      if (!item?._id) {
                        // console.error('Item without _id:', item);
                        return Math.random().toString();
                      }
                      return item?._id.toString();
                    }}
                    ListEmptyComponent={
                      <Text
                        className="text-[14px] text-center mb-[20px]"
                        style={{ fontFamily: "Poppins-Regular" }}
                      >
                        No Ongoing Requests
                      </Text>
                    }
                  />
                )}
              </View>
            </View>
          )}
        {!(
          newRequests?.length > 0 ||
          ongoingRequests?.length > 0 ||
          retailerHistory?.length > 0
        ) && <HomeScreenRequests />
        }
      </View>
    </View>
  );
};

export default HomeScreenVerified;
