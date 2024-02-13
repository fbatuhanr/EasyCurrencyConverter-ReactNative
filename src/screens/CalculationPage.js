import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

import { dummyData } from '../dummy/data';

import {CURRENCY_LIST_API_URL, CURRENCY_CONVERT_API_URL, X_RAPID_API_KEY, X_RAPID_API_HOST} from '@env';

const Calculation = () => {

  const [fromPickerOpen, setFromPickerOpen] = useState(false);
  const [toPickerOpen, setToPickerOpen] = useState(false);

  const [fromPickerValue, setFromPickerValue] = useState(null);
  const [toPickerValue, setToPickerValue] = useState(null);

  const [pickerItems, setPickerItems] = useState([]);

  const [convertAmount, setConvertAmount] = useState(null);

  const [result, setResult] = useState(null);
  const [isResultLoading, setIsResultLoading] = useState(false);

  const requestHeaders = {'X-RapidAPI-Key': X_RAPID_API_KEY, 'X-RapidAPI-Host': X_RAPID_API_HOST };

  useEffect(() => {

    const fetchCurrencyOptions = async () => {

      const options = { method: 'GET', url: CURRENCY_LIST_API_URL, headers: requestHeaders };
      try {
        /*
        const response = await axios.request(options);
        const result = response.data.map(i => ({ label: `${i.name} (${i.symbol})`, value: i.symbol }));
        */
       const result = dummyData.map(i => ({ label: `${i.name} (${i.symbol})`, value: i.symbol }));
        setPickerItems(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCurrencyOptions();

  }, [])

  const handleConvertButton = async () => {
    
    console.log(`From Value: ${fromPickerValue}`)
    console.log(`To Value: ${toPickerValue}`)
    console.log(`Convert Amount: ${convertAmount}`)

    setIsResultLoading(true);

    const options = {
      method: 'GET',
      url: CURRENCY_CONVERT_API_URL,
      params: {
        from: fromPickerValue,
        to: toPickerValue,
        amount: convertAmount
      },
      headers: requestHeaders
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setResult(response.data.result.convertedAmount);
      setIsResultLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  const handleClearButton = () => {
    setFromPickerValue(null);
    setToPickerValue(null);
    setConvertAmount(null);
    setResult(null);
  }

  return (
    <View className="flex-1 justify-center items-center">

    <KeyboardAvoidingView behavior={'padding'}>
      <View className="basis-1/5 justify-center items-center">
          <View className="w-80 items-center bg-neutral-200 rounded-t-xl p-6">
            <Text className="text-2xl">Make Your Selection</Text>
          </View>
      </View>

    <View className="basis-4/5 w-full items-center gap-4 pt-4">
      <View className="w-80 z-20">
        <Text>From:</Text>
        <DropDownPicker
          placeholder="Select a currency"
          searchPlaceholder="Search..."
          searchable={true}
          open={fromPickerOpen}
          setOpen={setFromPickerOpen}
          onOpen={() => setToPickerOpen(false)}
          value={fromPickerValue}
          items={pickerItems}
          setValue={setFromPickerValue}
          setItems={setPickerItems}
        />
      </View>
      <View className="w-80 z-10">
        <Text>To:</Text>
        <DropDownPicker
          placeholder="Select a currency"
          searchPlaceholder="Search..."
          searchable={true}
          open={toPickerOpen}
          setOpen={setToPickerOpen}
          onOpen={() => setFromPickerOpen(false)}
          value={toPickerValue}
          items={pickerItems}
          setValue={setToPickerValue}
          setItems={setPickerItems}
        />
      </View>
      <View className="w-80">
        <Text>Amount:</Text>
        <TextInput
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChangeText={setConvertAmount}
          value={convertAmount}
          keyboardType="numeric"
        />
      </View>
      <View className="w-80">
        {
          isResultLoading
          ? <ActivityIndicator size="large" color="#0000ff" className="mt-8"/>
          : <Pressable onPress={handleConvertButton} disabled={!(fromPickerValue && toPickerValue && convertAmount)} className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <Text className="text-white text-center">Convert!</Text>
          </Pressable>
        }
      </View>
      <View className="w-80 bg-neutral-200 rounded-xl">
        {
          !isResultLoading && result &&
          <Text className="text-4xl text-center p-2">
            {parseFloat(result.toFixed(3))}
          </Text>
        }
      </View>
      <View className="w-80">
        {
          !isResultLoading && result &&
          <Pressable onPress={handleClearButton} className="focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <Text className="text-white text-center">Clear!</Text>
          </Pressable>
        }
      </View>
    </View>
    </KeyboardAvoidingView>
  </View>
  )
}

export default Calculation;