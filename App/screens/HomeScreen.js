import { View, Text, Pressable, ScrollView, BackHandler, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from "../assets/ProfileIcon.svg"
import GinieIcon from "../assets/GinieBusinessIcon.svg"
import History from "../assets/HistoryIcon.svg"
import { useFocusEffect, useIsFocused, useNavigation, useNavigationState } from '@react-navigation/native'
import HomeScreenVerified from '../components/HomeScreenVerified'
import CompleteProfile from '../components/CompleteProfile'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUserDetails } from '../redux/reducers/storeDataSlice'

 

const HomeScreen = () => {
    const navigation =useNavigation()
    const dispatch=useDispatch();
    const [verified,setVerified]=useState(true);
    const [completeProfile,setCompleteProfile]=useState(true);
    const [refreshing,setRefreshing]=useState(false);
  const isFocused = useIsFocused();

//   const [userData, setUserData] = useState();

//    const serviceProvider= useSelector(state => state.storeData.serviceProvider);
//   console.log("user: " ,user);
  // const [store,setStore]=useState(false)
 
// const userData= useSelector(state => state.storeData.userDetails)


const navigationState = useNavigationState(state => state);
  const isHomeScreen = navigationState.routes[navigationState.index].name === 'home';
//   console.log("userDta at home",userData);

  useEffect(() => {
    const backAction = () => {
      if (isHomeScreen) {
        BackHandler.exitApp();
        return true; 
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress', 
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [isHomeScreen]);

  
//   const fetchUserData = async () => {
//     try {
//         const userData = JSON.parse(await AsyncStorage.getItem("userData"));
//         dispatch(setUserDetails(userData));

//         console.log('Fetched user data successfully at HomeScreen',userData);
              
      
        
//         const response = await axios.get('https://culturtap.com/api/retailer/', {
//             params: {
//                 storeMobileNo: userData.storeMobileNo
//             }
//         });
//           console.log("res at home",response.data);
        
//         if (response.status === 200) {
            
//             // setLocation(response?.data.longitude);
//             // setStore(response?.data.storeImages);
//             // setServiceProvider(response?.data.serviceProvider);
//             if (response.data.storeApproved) {
//               console.log('Store  approved at Home Screen');
//               setVerified(true);
//               return;
              
//            }
    
//             if (!response.data.storeApproved) {
//                 console.log('Store not approved');
//                 setVerified(false);
                
//             }
    
           
           
           
            
//             if(response.data.location && response.data.serviceProvider==="true"){
//                 setCompleteProfile(true);
//                 return;
//             }
//            else if (response.data.location && response.data.storeImages?.length > 0) {
//                 setCompleteProfile(true);
//                 return;
//             }
//             else{
//                 setCompleteProfile(false);
//             }
//             dispatch(setUserDetails(response.data));
            
//             await AsyncStorage.setItem('userData', JSON.stringify(response.data));
//             console.log('User data fetched successfully from backend',response.data);
//             // Update state with user data
        
//         }
      
//     } catch (error) {
//         console.error('Error fetching user data on home screen:', error);
//     }
// };
  
// useEffect(() => {
//     if (isFocused) {
      
//        handleRefresh();
//       // 
//     }
//   }, [isFocused]);

  

// // Only re-run effect when screen is focused
// const handleRefresh = () => {
//     setRefreshing(true); // Show the refresh indicator
//     // setLoading(true);
//     try {
//       fetchUserData();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//     // setLoading(false);
//      setRefreshing(false); // Hide the refresh indicator
//   };

const fetchUserData = async () => {
  // try {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    if (userData) {
      dispatch(setUserDetails(userData));
      console.log('Fetched user data successfully at HomeScreen', userData);
    }


};



useEffect(()=>{
  // if(isFocused) {
   fetchUserData();
  }, [])



    return (
        <View className="flex-1 bg-white ">
            <ScrollView 
          
          >
            <View className="flex flex-col mt-[40px]  gap-[32px] ">
                <View className="flex flex-row justify-between items-center px-[32px]">
                  
                        <TouchableOpacity onPress={()=>navigation.navigate("menu")} style={{padding:4}}>
                           <View className="bg-[#FB8C00] p-[4px] rounded-full">
                            <Profile />
                            </View>
                        </TouchableOpacity>
                   
                    <GinieIcon/>
                    
                        <TouchableOpacity onPress={()=>navigation.navigate("history")} style={{padding:4}}>
                        <View className="bg-[#FB8C00] p-[4px] rounded-full">
                            <History height={28} width={28}/>
                            </View>
                        </TouchableOpacity>
                   
                    
                </View>
                {
                     <HomeScreenVerified />
                }
               
            


            </View>
            </ScrollView>

        </View>
    )
}

export default HomeScreen