import { View, Text, ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import ThreeDots from '../../assets/ThreeDotIcon.svg';
import { FontAwesome } from '@expo/vector-icons';

import Copy from '../../assets/Copy.svg';
import Document from '../../assets/Document.svg';
import Send from '../../assets/Send.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from "../../assets/ProfileIcon.svg";
import ChatMessage from '../../components/ChatMessage';
import ReplyMessage from '../../components/ReplyMessage';

const ChatPage = () => {
    const navigation = useNavigation();
    const route=useRoute();
    const { user,requestInfo } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="relative flex-grow">
                        <View className="z-50 bg-[#ffe7c8] w-full flex flex-row px-[32px] justify-between items-center py-[30px]">
                            <Pressable onPress={() => { navigation.goBack(); }}>
                                <FontAwesome name="arrow-left" size={15} color="black" />
                            </Pressable>

                            <View className="gap-[9px]">
                                <View className="flex-row gap-[18px]">
                                    <View className="bg-[#F9F9F9] p-2 rounded-full">
                                        <Profile className="" />
                                    </View>
                                    <View className="w-[60%]">
                                        <Text className="text-[14px] text-[#2e2c43]">{user?.storeName}</Text>
                                        <Text className="text-[12px] text-[#c4c4c4]">Active 3 hr ago</Text>
                                    </View>
                                </View>
                               
                            </View>

                            <Pressable onPress={() => { console.log("hii") }}>
                                <ThreeDots />
                            </Pressable>
                        </View>
                        <View className="px-[50px] pb-[20px] flex bg-[#ffe7c8]">
                        <View className="flex-row gap-[10px] items-center">
                                    <Text className="text-[16px] font-bold">Request Id</Text>
                                    <Text>{requestInfo?.requestId._id}</Text>
                                </View>
                                <Text className="">{requestInfo?.requestId.requestDescription} ....</Text>
                        </View>
                        <View className="flex gap-[21px] px-[32px] pt-[40px] pb-[100px]">
                        <ChatMessage/>
                        <ReplyMessage/>
                        </View>

                        {/* Spacer View */}
                        <View style={{ flex: 1 }} />
                    </View>
                </ScrollView>

                {/* Typing Area */}
                <View className="absolute bottom-[20px] left-0 right-0 px-[20px]">
                    <View className="w-full h-[58px] px-[15px] rounded-xl bg-[#ebebeb] flex-row items-center justify-between">
                        <TextInput
                            placeholder='Start typing here'
                            placeholderTextColor="#dbcdbb"
                            className="w-4/5"
                        />
                        <View className="flex-row gap-[24px]">
                            <Pressable onPress={() => { console.log("doc press") }}>
                                <Document />
                            </Pressable>
                            <Pressable onPress={() => { console.log("send press") }}>
                                <Send />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default ChatPage;
