import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  BucketImg from "../assets/BucketImg.svg"
import Card from "../assets/requestCard.svg"
import Home2 from "../assets/Home2.svg"
import Home3 from "../assets/Home3.svg"
import Home4 from "../assets/Home4.svg"
import Home5 from "../assets/Home5.svg"
import Home6 from "../assets/Home6.svg"
import ThumbIcon from "../assets/ThumbIcon.svg"

const HomeScreenRequests = () => {
  return (
    <View className="flex items-center gap-[30px]">
                <View className="flex flex-row gap-[32px] bg-white py-[20px] w-[90%] justify-center items-center rounded-3xl shadow-md px-[20px]">
                    <View className="w-[16px] h-[16px] bg-[#70B241] rounded-full">
                    </View>
                    <View className="flex-col flex-1">
                    <Text className="text-[16px] font-bold">You are live now</Text>
                    <Text className="text-[14px]">Wait for your first bid</Text>
                    </View>
                 </View> 
                <Text className="text-[16px] font-extrabold text-[#2E2C43] mt-[20px] px-[32px]">
                    How it works?
                 </Text>
                 <BucketImg/>

                 <View className="flex flex-col gap-[32px] px-[32px]">
                    <Text className="text-[14px] text-center">
                    Cultutrtap Genie is the bargaining platform, Genie will connect you with the customers 
                     online, You have to attract customer by pushing
                     perfect price of product or service you offered. 
                    </Text>
                   
                 </View>
                 <View>
                    <Text className="text-[16px] font-extrabold text-[#2E2C43] px-[32px] text-center">
                    You will receive notification first, like this
                    </Text>
                    {/* <Card/> */}
                 </View>
                 <View className="flex items-center">
                    <Text className="text-[14px] px-[32px]  text-[#2E2C43]  text-center">
                    If you get agree with price , which is offered by customer , select yes, if no , select no. 
                    </Text>
                    <Home2 width={320} />
                 </View>
                 <View className="gap-[20px] -mt-[10px] items-center">
                    <Text className="text-[14px] px-[32px]  text-[#2E2C43]  text-center">
                    You can send query to customer or create new bid. 
                    </Text>
                    <Home3 width={320}  className=" "/>
                 </View>
                 <View className="px-[32px] items-center gap-[30px] mt-[10px]">
                     <Text className="text-[16px] font-extrabold text-[#2E2C43]  text-center">
                        How to send bid to the customer?
                     </Text>
                     <View className="gap-[20px] items-center px-[32px]">
                     <View className="flex-row gap-[5px] justify-center items-center">
                        <Text className="text-[14px] bg-[#FB8C00] p-2  text-white  text-center">
                           Step1.
                        </Text>
                        <Text className="text-[14px]  text-[#2E2C43]  text-center">Type your query </Text>
                     </View>
                    <Home4 width={320}  className=" "/>
                     </View>
                     <View className="flex gap-[20px] px-[32px] items-center ">
                        <View className="flex-row gap-[5px] justify-center items-center ">
                           <Text className="text-[14px] bg-[#FB8C00] p-2    text-white  text-center">
                            Step 2.
                           </Text>
                           <Text className="text-[14px]  text-[#2E2C43]  text-center">Click real product image for product match and availability. </Text>
                        </View>
                        <Home5 width={320}   className=" "/>
                     </View>
                     <View className="flex gap-[20px] ">
                        <View className="flex-row gap-[5px] justify-center items-center">
                           <Text className="text-[14px] bg-[#FB8C00] p-2  text-white  text-center">
                            Step 3.
                           </Text>
                           <Text className="text-[14px]  text-[#2E2C43]  text-center">Type your offered price to the customer  </Text>
                        </View>
                        <Home6 width={320}  className=" "/>
                     </View>
                 
                  
                 </View>
                 <View className="gap-[20px] -mt-[10px] items-center">
                    <Text className="text-[14px] px-[32px]  text-[#2E2C43]  text-center">
                       Preview & Send your bid
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