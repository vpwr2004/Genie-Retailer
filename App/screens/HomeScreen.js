import { View, Text, Pressable, ScrollView, BackHandler, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from "../assets/ProfileIcon.svg"
import GinieIcon from "../assets/GinieBusinessIcon.svg"
import History from "../assets/HistoryIcon.svg"
import { useIsFocused, useNavigation, useNavigationState } from '@react-navigation/native'
import HomeScreenUnverified from '../components/HomeScreenUnverified'
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
    const [completeProfile,setCompleteProfile]=useState(false);
const [userData, setUserData] = useState();

//   const user= useSelector(state => state.storeData.userDetails);
//   console.log("user: " ,user);
  const isFocused = useIsFocused();
  // const [store,setStore]=useState(false)
  
  const [location, setLocation] = useState("");
  const [store,setStore]=useState("");
//   const userDetails=useSelector(state=>state.storData.userDetails);

const navigationState = useNavigationState(state => state);
  const isHomeScreen = navigationState.routes[navigationState.index].name === 'home';

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

  

  

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (!userDataString) {
                console.log('User data not found in AsyncStorage');
                return;
            }
            const userData = JSON.parse(userDataString);
            console.log('Fetched user data successfully at HomeScreen', );
                  
            if (!userData.storeApproved) {
                console.log('Store not approved');
                setVerified(false);
                
            }
            if (userData.storeApproved) {
                console.log('Store  approved at Home Screen');
                setVerified(true);
                
            }
            
            const response = await axios.get('https://genie-backend-meg1.onrender.com/retailer/', {
                params: {
                    storeMobileNo: userData.storeMobileNo
                }
            });
            
            if (response.status === 200) {
                console.log('User data fetched successfully from backend',response.data);

                setLocation(response?.data.longitude);
                setStore(response?.data.storeImages);
                await AsyncStorage.setItem('userData', JSON.stringify(response.data));
                dispatch(setUserDetails(userData));
                // Update state with user data
            
            }
            
            
            if (userData.location && userData.storeImages?.length > 0) {
                setCompleteProfile(true);
            }
            else{
                setCompleteProfile(false);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    fetchUserData();
}, [isFocused]); // Only re-run effect when screen is focused




    return (
        <SafeAreaView className="flex-1">
            <ScrollView>

            <View className="flex flex-col  gap-[32px]">
                <View className="flex flex-row justify-between items-center px-[32px]">
                    <View>
                        <TouchableOpacity onPress={()=>navigation.navigate("menu")}>
                            <Profile />
                        </TouchableOpacity>
                    </View>
                    <GinieIcon/>
                    <View>
                        <TouchableOpacity onPress={()=>navigation.navigate("history")}>
                            <History />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                {
                    verified && <HomeScreenVerified/>
                }
                {
                    !verified && <CompleteProfile completeProfile={completeProfile}  verified={verified} location={location} store={store}/>
                }
                
            


            </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen