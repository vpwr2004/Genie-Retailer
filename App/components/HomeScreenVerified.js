import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setNewRequests, setOngoingRequests, setRequestInfo } from '../redux/reducers/requestDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import NewRequests from './NewRequests';
import OngoingRequests from './OngoingRequests';
import HomeScreenRequests from './HomeScreenRequests';
import ProductOrderCard from './ProductOrderCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { notificationListeners } from '../notificationServices';


const HomeScreenVerified = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState("New");
  const [request,setRequest]=useState(true)


  
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // useEffect(()=>{


  //   if(requestUserPermission()){
  //       messaging().getToken().then(token=>{
  //         console.log(token)
  //       })
  //   }
  //   else{
  //     console.log("permission not granted",authStatus);
  //   }
  //   // createNotificationChannels();
  //   notificationListeners();
    

  // },[]);

  useEffect(() => {
    if (isFocused) {
      handleRefresh();
    }
  }, [isFocused]);

  const fetchNewRequests = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      const response = await axios.get(`https://genie-backend-meg1.onrender.com/chat/retailer-new-spades?id=${userData?._id}`);
      setRequest(true);
      dispatch(setNewRequests(response.data));
    } catch (error) {
      dispatch(setNewRequests());
      // console.error('Error fetching new requests:', error);
    }
  };

  const fetchOngoingRequests = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      const ongoingresponse = await axios.get(`https://genie-backend-meg1.onrender.com/chat/retailer-ongoing-spades?id=${userData?._id}`);
      setRequest(true);
      dispatch(setOngoingRequests(ongoingresponse.data));
    } catch (error) {
      dispatch(setOngoingRequests());
      //console.error('Error fetching ongoing requests:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true); // Show the refresh indicator
  
    try {
      // Fetch new data from the server
      await fetchNewRequests();
      await fetchOngoingRequests();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
    setRefreshing(false); // Hide the refresh indicator
  };

  const newRequests = useSelector(state => state.requestData.newRequests);
  const ongoingRequests = useSelector(state => state.requestData.ongoingRequests);

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }
      >
        {request && 
        <View className="flex items-center">
          <View>
            <View className="flex-row justify-between px-[20px] py-[10px] gap-[5x]">
              <Pressable onPress={() => setTab('New')}>
                <View className="flex-row  gap-[5px]  items-center p-[4px]">
                  <Text style={{ fontWeight: tab === 'New' ? 'bold' : 'normal', borderBottomWidth: tab === 'New' ? 3 : 0, borderBottomColor: "#FB8C00" }}>
                    New Requests
                  </Text>
                  <View className="bg-[#E76063] h-[22px] flex justify-center items-center w-[22px]  rounded-full">
                    <Text className="text-white  ">{newRequests ? newRequests.length : 0}</Text>
                  </View>
                </View>
              </Pressable>
              <Pressable onPress={() => setTab('Ongoing')}>
                <View className="flex-row gap-[5px] items-center p-[4px]">
                  <Text style={{ fontWeight: tab === 'Ongoing' ? 'bold' : 'normal', borderBottomWidth: tab === 'Ongoing' ? 3 : 0, borderBottomColor: "#FB8C00" }}>
                    Ongoing Requests
                  </Text>
                  <View className="bg-[#E76063] h-[22px] flex justify-center items-center w-[22px]  rounded-full">
                    <Text className="text-white  ">{ongoingRequests ? ongoingRequests.length : 0}</Text>
                  </View>
                </View>
              </Pressable>
            </View>
            {tab === 'New' && 
            <SafeAreaView className="flex-1">
      {/* <Text className="text-[14px] text-center mb-[20px]">Your ongoing requests</Text> */}
      <View className=" flex flex-col gap-[22px] mb-[20px] items-center justify-center">
        {newRequests && newRequests.length > 0 ? (
          newRequests.map((product) => (
            <Pressable
              key={product._id}
              onPress={() => {
                dispatch(setRequestInfo(product));
                navigation.navigate("requestPage");
              }}
            >
              <ProductOrderCard key={product._id} product={product} />
            </Pressable>
          ))
        ) : (
          <Text className="text-[14px] text-center mb-[20px]">
            No New Requests
          </Text>
        )}
      </View>
    </SafeAreaView>}
            {tab === 'Ongoing' && <SafeAreaView className="flex-1">
        
        {/* <Text className="text-[14px] text-center mb-[20px]">Your ongoing requests</Text> */}
            <View className=" flex flex-col gap-[22px] mb-[20px] items-center justify-center">

            {
                  ongoingRequests && ongoingRequests.length>0 ?(
                ongoingRequests?.map((product)=>(
                  
                  <Pressable key={product._id} onPress={()=>{dispatch(setRequestInfo(product)); console.log("requestInfo at homeScreen",product);navigation.navigate("requestPage")}}>
                  
                     <ProductOrderCard key={product._id} product={product}/>
                  </Pressable>
                ))
              ):(
                <Text className="text-[14px] text-center mb-[20px]">No Ongoing Requests</Text>
              )
              }
            </View>


        </SafeAreaView> 
}
          </View>
        </View>}
        {
          !request && <HomeScreenRequests/>
        }
      </ScrollView>
    </View>
  );
};

export default HomeScreenVerified;
