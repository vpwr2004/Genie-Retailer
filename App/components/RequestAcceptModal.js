import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import ModalImg from "../assets/Cancel.svg"
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {  setRequestInfo } from '../redux/reducers/requestDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../screens/utils/socket.io/socket';

const RequestAcceptModal= ({modalVisible,setModalVisible,setAcceptLocal,messages,setMessages}) => {
  // const [modalVisible, setModalVisible] = useState(true);
  const navigation=useNavigation();
  const dispatch=useDispatch();
  // const messages = useSelector(state => state.requestData.messages);
  const requestInfo= useSelector(state => state.requestData.requestInfo);

  // console.log("messages of ",messages)
  const handleModal = async () => {
    try {
      const lastMessage = messages[messages.length - 1];
      console.log("last message",lastMessage);
      if (!lastMessage) {
        console.log("No messages available to update.");
        return;
      }
      
      console.log("Updating card", requestInfo);
  
      if (requestInfo?.requestType === "new") {
        try {
          const res = await axios.patch(
            "https://genie-backend-meg1.onrender.com/chat/modify-spade-retailer",{
              id:requestInfo?._id,
              type:"ongoing"
            }
          );
          console.log("RequestType new response", res.data);
          let tmp={...requestInfo,requestType:"ongoing"};
          dispatch(setRequestInfo(tmp));

          setAcceptLocal(true);
          setModalVisible(false);
        } catch (error) {
          console.error("Error updating requestType 'new':", error);
          return;
        }
      } else {
        try {
          const accept = await axios.patch(
            `https://genie-backend-meg1.onrender.com/chat/accept-bid`,
            {
              messageId: lastMessage?._id,
              userRequestId: requestInfo?.requestId?._id,
            }
          );
          console.log("Accept response", accept.data);
  
          if (accept.status === 200) {
            try {
            
              socket.emit("new message",accept.data)
              let tmp = {
                ...requestInfo?.requestId,
                requestActive: "completed"
              };
          dispatch(setRequestInfo(tmp));
              const updatedMessages = messages.map((message) => {
                if (message?._id === lastMessage?._id) {
                  return { ...message, bidAccepted: "accepted" };
                }
                return message;
              });
              setAcceptLocal(true);
              setMessages(updatedMessages);
              setModalVisible(false);
            } catch (error) {
              console.error("Error updating chat details:", error);
            }
          } else {
            console.error("Error updating message");
          }
        } catch (error) {
          console.error("Error accepting bid:", error);
        }
      }
    } catch (error) {
      console.error("Error handling modal:", error);
    }
  };
  
  return (
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
        className=" flex justify-center items-center  rounded-lg h-full ">
          <View className="flex-1  justify-center items-center">
                  <View className="bg-white w-[90%] p-[30px] justify-center items-center mt-[10px] gap-[24px] shadow-gray-600 shadow-2xl">
                      <ModalImg classname="w-[117px] h-[75px]"/>
                        <View className="">
                             <Text className="text-[15px] font-extrabold text-center">Are you sure? </Text>
                              <Text className="text-[14px] font-normal text-center  pt-[8px]">You are accepting the bid request </Text>
                              
                        </View>
                        
                            <View className="w-full flex flex-row  justify-center">
                              <View className="flex-1 mt-[5px]">
                                  <Pressable onPress={()=>{setModalVisible(false)}} >
                                    <Text className="text-[14.5px] text-[#FB8C00] font-normal text-center">Close</Text>
                          
                                  </Pressable> 
                              </View>
                            <View className="flex-1 mt-[5px]">
                                <Pressable  onPress={handleModal}>
                                  <Text className="text-[14.5px] text-[#FB8C00] font-semibold text-center">Accept</Text>
                       
                                </Pressable> 
                            </View>
                        
                  
                </View>
           </View>
      </View>
      </Modal>
      
      
  );
};

const styles = StyleSheet.create({
  
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  
});

export default RequestAcceptModal;