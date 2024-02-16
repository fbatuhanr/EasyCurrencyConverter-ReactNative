import React from 'react'
import { StyleSheet, FlatList, SafeAreaView, View, Text, Pressable, Button } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { clearHistory, removeFromHistory } from '../redux/features/historySlice'

const HistoryPage = ({ navigation }) => {

    const { history } = useSelector((state) => state.history)
    const dispatch = useDispatch()

    const renderItem = ({ item, index }) => {

        const isLastItem = index === history.length - 1
        return (
            <View className={`flex flex-row justify-center items-center space-x-0.5 py-2 my-0.5 border-b-0.5 ${isLastItem && "border-b-0"}`}>
                <View className="basis-1/12">
                    <Text className="text-xl text-right font-semibold">{index + 1}&#41;</Text>
                </View>
                <View className="basis-5/12 flex flex-row justify-end items-end">
                    <Text className="text-base font-semibold">{item.convertAmount}</Text>
                    <Text className="text-sm tracking-tight"> {item.from} to {item.to}:</Text>
                </View>
                <View className="basis-4/12">
                    <Text className="text-xl font-bold"> {parseFloat(item.convertedAmount.toFixed(2))}</Text>
                </View>
                <View className="basis-1/12">
                    <Pressable onPress={() => dispatch(removeFromHistory(index))} className="bg-red-700 rounded-lg">
                        <Text className="text-white text-center text-xl">-</Text>
                    </Pressable>
                </View>
            </View>
        )
    };

    return (
        <SafeAreaView className="flex justify-center items-center">
            <View className="basis-1/6 w-full justify-center items-center">
                <Text className="text-4xl mt-5">Conversion History</Text>
            </View>
            <View className="basis-4/6 w-full justify-start">
                {
                    history && history.length ?
                        <FlatList
                            data={history}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index}
                            vertical
                        />
                        :
                        <Text className="text-center text-xl text-gray-950 italic mt-10">
                            No conversion history found!
                        </Text>
                }
            </View>
            <View className="basis-1/6 w-full justify-start items-center">
                {
                    history && history.length ?
                        <Pressable onPress={() => dispatch(clearHistory())} className="w-80 mt-4 bg-red-700 rounded-lg px-5 py-2.5 me-2 mb-2">
                            <Text className="text-white text-center text-xl font-semibold">Clear History!</Text>
                        </Pressable>
                        :
                        <Pressable onPress={() => navigation.navigate('Calculation')} className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <Text className="text-white text-center text-xl font-semibold">Make a Calculation!</Text>
                        </Pressable>
                }
            </View>
        </SafeAreaView>
    )
}

export default HistoryPage;