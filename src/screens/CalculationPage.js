import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

import { dummyData } from '../dummy/data';

import { CURRENCY_LIST_API_URL, CURRENCY_CONVERT_API_URL, X_RAPID_API_KEY, X_RAPID_API_HOST } from '@env';

import { useDispatch } from 'react-redux'
import { addHistory } from '../redux/features/historySlice'

const CalculationPage = () => {

  const dispatch = useDispatch()

  const [fromPickerOpen, setFromPickerOpen] = useState(false);
  const [toPickerOpen, setToPickerOpen] = useState(false);

  const [fromPickerValue, setFromPickerValue] = useState(null);
  const [toPickerValue, setToPickerValue] = useState(null);

  const [pickerItems, setPickerItems] = useState([]);

  const [convertAmount, setConvertAmount] = useState(null);

  const [result, setResult] = useState(null);
  const [isResultLoading, setIsResultLoading] = useState(false);

  const requestHeaders = { 'X-RapidAPI-Key': X_RAPID_API_KEY, 'X-RapidAPI-Host': X_RAPID_API_HOST };

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


  const isCalculateDisabled = () => !(fromPickerValue && toPickerValue && convertAmount);

  const handleConvertButton = async () => {

    if(isCalculateDisabled()) return;

    /*
    console.log(`From Value: ${fromPickerValue}`)
    console.log(`To Value: ${toPickerValue}`)
    console.log(`Convert Amount: ${convertAmount}`)
    */

    DismissKeyboardPickers();
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

      const { convertedAmount } = response.data.result;
      const historyData = {
        from: fromPickerValue,
        to: toPickerValue,
        convertAmount,
        convertedAmount
      }

      setResult(convertedAmount);
      dispatch(addHistory(historyData))

      setIsResultLoading(false);
    }
    catch (error) {
      console.error(error);
    }
  }
  const handleClearButton = () => {
    setFromPickerValue(null);
    setToPickerValue(null);
    setConvertAmount(null);
    setResult(null);
  }

  const DismissKeyboardPickers = () => {

    Keyboard.dismiss(); 
    setFromPickerOpen(false); 
    setToPickerOpen(false) 
  }

  return (
    <SafeAreaView className="flex justify-center items-center">
        <TouchableWithoutFeedback onPress={DismissKeyboardPickers}>
          <View className="items-center">
            <View className="basis-1/6 w-full justify-center items-center">
                <Text className="text-4xl mt-5">Make Your Selection</Text>
            </View>
            <View className="basis-3/6 w-full justify-center items-center space-y-2 pt-2">
              <View className="w-80 z-20">
                <Text className="italic text-base">From:</Text>
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
                  textStyle={{fontSize: 18}}
                />
              </View>
              <View className="w-80 z-10">
                <Text className="italic text-base">To:</Text>
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
                  textStyle={{fontSize: 18}}
                />
              </View>
              <View className="w-80">
                <Text className="italic text-base">Amount:</Text>
                <TextInput
                  className="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChangeText={setConvertAmount}
                  value={convertAmount}
                  keyboardType="numeric"
                />
              </View>
              <View className="w-80">
                {
                  !isResultLoading &&
                  <Pressable onPress={handleConvertButton} disabled={isCalculateDisabled()} className={`${isCalculateDisabled() ? "bg-blue-400" : "bg-blue-700"} mt-2 py-2.5 rounded-lg`}>
                    <Text className="text-white text-center text-xl font-semibold">Convert!</Text>
                  </Pressable>
                }
              </View>
            </View>
            <View className="basis-2/6 w-full justify-center items-center space-y-4">
              {
                isResultLoading
                  ?
                    <View><ActivityIndicator size="large" color="black" className="mb-14"/></View>
                  :
                    result &&
                    <>
                      <View className="w-80 flex flex-row justify-center items-end">
                        <Text className="text-5xl">{parseFloat(result.toFixed(2))}</Text>
                        <Text className="text-sm ml-1 mb-2">{toPickerValue}</Text>
                      </View>
                      <View className="w-80">
                        <Pressable onPress={handleClearButton} className="focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                          <Text className="text-white text-center text-xl font-semibold">Clear!</Text>
                        </Pressable>
                      </View>
                    </>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
  )
}

export default CalculationPage;