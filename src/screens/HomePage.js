import React from 'react'
import {View, Text, Pressable} from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center gap-4">
        <View>
          <Text className="text-4xl text-center">Easy Currency Converter</Text>
        </View>
        <View>
            <Pressable onPress={() => navigation.navigate('Calculation')} className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <Text className="text-white text-center text-xl">START</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default HomePage