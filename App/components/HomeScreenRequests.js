import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  BucketImg from "../assets/BucketImg.svg"
import Card from "../assets/requestCard.svg"
import Home2 from "../assets/Home2.svg"
import Home3 from "../assets/Home3.svg"
import Home4 from "../assets/Home4.svg"
import Home5 from "../assets/Home5.svg"
import Home6 from "../assets/Home6.svg"
import Home7 from "../assets/Home7.svg"

import ThumbIcon from "../assets/ThumbIcon.svg"

const HomeScreenRequests = () => {

  const { width } = Dimensions.get("window");

  return (
    <View className="flex items-center gap-[32px] bg-white">
                <View className="flex flex-row gap-[32px] bg-white py-[20px] w-[90%] justify-center items-center rounded-3xl shadow-md px-[20px]"
                 style={{
                  backgroundColor: '#fff', // Ensure the background is white
                  margin: 10, // Add some margin if necessary for better shadow visibility
                  shadowColor: '#bdbdbd',
                  shadowOffset: { width: 8, height: 6 },
                  shadowOpacity: 0.9,
                  shadowRadius: 24,
                  elevation: 20,
                  borderRadius:24
                }}>
                    <View className="w-[16px] h-[16px] bg-[#70B241] rounded-full">
                    </View>
                    <View className="flex-col flex-1">
                    <Text className="text-[16px] " style={{ fontFamily: "Poppins-Bold" }}>You are live now</Text>
                    <Text className="text-[14px]" style={{ fontFamily: "Poppins-Regular" }}>Wait for your first bid request</Text>
                    </View>
                 </View> 
                <Text className="text-[14px]  text-[#2E2C43] mt-[20px] px-[32px]" style={{ fontFamily: "Poppins-Bold" }}>
                    How it works?
                 </Text>
                 <BucketImg/>

                 <View className="flex flex-col  px-[32px]">
                    <Text className="text-[14px] text-center" style={{ fontFamily: "Poppins-Regular" }}>
                    CulturTap Genie is a platform where Genie connects you with customers online. You need to attract customers by offering the best price for your products or services.
                    </Text>
                 </View>
                 <View className="flex flex-col justify-center items-center gap-2 ">
                    <Text className="text-[14px]  text-[#2E2C43] px-[32px] text-center" style={{ fontFamily: "Poppins-SemiBold" }}>
                    You get a notification first, like this.
                    </Text>
                    <View className="flex flex-row  justify-center items-center mx-[20px]" style={{
                  backgroundColor: '#fff', // Ensure the background is white
                  // margin: 10, // Add some margin if necessary for better shadow visibility
                  shadowColor: '#bdbdbd',
                  shadowOffset: { width: 9, height: 9},
                  shadowOpacity: 0.7,
                  shadowRadius: 50,
                  elevation: 80,
                  borderRadius:8
                }}>
                     <Card width={350}  className="object-cover shadow-xl"/>
                    </View>
                 </View>
                 <View className="flex items-center gap-2 mb-[10px] ">
                    <Text className="text-[14px] px-[32px]  text-[#2E2C43]  text-center" style={{ fontFamily: "Poppins-Regular" }}>
                    If you have the right product or service availability, you can accept the customer's request. 
                    </Text>
                    <View style={{
                  backgroundColor: '#fff', // Ensure the background is white
                  // margin: 10, // Add some margin if necessary for better shadow visibility
                  shadowColor: '#bdbdbd',
                  shadowOffset: { width: 9, height: 9},
                  shadowOpacity: 0.7,
                  shadowRadius: 50,
                  elevation: 80,
                  borderRadius:8
                }}>
                    <Home2 width={350} className=""/>


                    </View>
                 </View>
                 <View className="gap-[20px]  items-center">
                    <Text className="text-[14px] px-[32px]  text-[#2E2C43]  text-center" style={{ fontFamily: "Poppins-Regular" }}>
                    If you're okay with the price the customer offered, choose yes. If you're not okay with the price, choose no.
                    </Text>
                    <View style={{
                  backgroundColor: '#fff', // Ensure the background is white
                  // margin: 10, // Add some margin if necessary for better shadow visibility
                  shadowColor: '#bdbdbd',
                  shadowOffset: { width: 9, height: 9},
                  shadowOpacity: 0.7,
                  shadowRadius: 50,
                  elevation: 80,
                  borderRadius:8
                }}>
                    <Home3 width={350}  className=" "/>
                    </View>
                 </View>
                 <View className="gap-[24px]  items-center">
                    <Text className="text-[14px] px-[32px]  text-[#2E2C43]  text-center my-[10px]" style={{ fontFamily: "Poppins-Regular" }}>
                    You can ask a question to a customer or make a new offer.
                    </Text>
                    <View style={{
                  backgroundColor: '#fff', // Ensure the background is white
                  // margin: 10, // Add some margin if necessary for better shadow visibility
                  shadowColor: '#bdbdbd',
                  shadowOffset: { width: 9, height: 9},
                  shadowOpacity: 0.35,
                  shadowRadius: 50,
                  elevation: 80,
                  borderRadius:8
                }}>
                    <Home7 width={350}  className=" "/>
                    </View>
                 </View>
                 <View className="px-[32px] items-center gap-[30px] mt-[10px]">
                     <Text className="text-[14px]  text-[#2E2C43]  text-center" style={{ fontFamily: "Poppins-Bold" }}>
                        How to send bid to the customer?
                     </Text>
                     <View className="gap-[20px] items-center px-[32px]">
                     <View className="flex-row gap-[5px] justify-center items-center">
                        <Text className="text-[14px] bg-[#FB8C00] p-2  text-white  text-center" style={{ fontFamily: "Poppins-Medium" }}>
                           Step1.
                        </Text>
                        <Text className="text-[14px]  text-[#2E2C43]  text-center" style={{ fontFamily: "Poppins-Regular" }}>Type your query </Text>
                     </View>
                    <Home4 width={width} className=" "/>
                     </View>
                     <View className="flex gap-[20px] px-[32px] items-center ">
                        <View className="flex-row gap-[5px] ">
                           <Text className="text-[14px] bg-[#FB8C00] h-[40px] p-2    text-white   text-center " style={{ fontFamily: "Poppins-Medium"}}>
                            Step 2.
                           </Text>
                           <Text className="text-[14px]  text-[#2E2C43]  text-center" style={{ fontFamily: "Poppins-Regular" }}>Step 2. Click the real product image for product match and confirm if it's available.</Text>
                        </View>
                        <Home5 width={width}   className=" "/>
                     </View>
                     <View className="flex gap-[20px] ">
                        <View className="flex-row gap-[5px] justify-center items-center">
                           <Text className="text-[14px] bg-[#FB8C00] p-2  text-white  text-center" style={{ fontFamily: "Poppins-Medium" }}>
                            Step 3.
                           </Text>
                           <Text className="text-[14px]  text-[#2E2C43]  text-center" style={{ fontFamily: "Poppins-Regular" }}>Type your offered price to the customer  </Text>
                        </View>
                        <Home6 width={width}  className=" "/>
                     </View>
                 
                  
                 </View>
                 <View className="gap-[20px] -mt-[10px] items-center">
                    <Text className="text-[14px] px-[32px]  text-[#2E2C43]  text-center" style={{ fontFamily: "Poppins-Regular" }}>
                       Preview & Send your offer
                    </Text>
                    <ThumbIcon  className=" "/>
                 </View>
                 <View className="flex flex-col gap-[32px] px-[32px] my-[40px]">
                    {/* image */}
                  
                 </View>
    </View>
  )
}

export default HomeScreenRequests

const styles = StyleSheet.create({})