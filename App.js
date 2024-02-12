import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

import { dummyData } from './dummy/data';



export default function App() {

  const [fromPickerOpen, setFromPickerOpen] = useState(false);
  const [toPickerOpen, setToPickerOpen] = useState(false);

  const [fromPickerValue, setFromPickerValue] = useState(null);
  const [toPickerValue, setToPickerValue] = useState(null);

  const [pickerItems, setPickerItems] = useState([]);

  const [convertAmount, setConvertAmount] = useState(null);

  const [result, setResult] = useState(null);

  useEffect(() => {

    const fetchOptions = async () => {

      const options = {
        method: 'GET',
        url: 'https://currency-converter18.p.rapidapi.com/api/v1/supportedCurrencies',
        headers: {
          'X-RapidAPI-Key': '2c3b4556d2mshca925566ecbe76ap13f707jsn4dc6d2c0f27a',
          'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
        }
      };

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

    fetchOptions();

  }, [])

  useEffect(() => {

    console.log(`From Value: ${fromPickerValue}`)
    console.log(`To Value: ${toPickerValue}`)
  }, [fromPickerValue, toPickerValue])

  

  const handleConvertButton = async () => {
    console.log("calc")

    const options = {
      method: 'GET',
      url: 'https://currency-converter18.p.rapidapi.com/api/v1/convert',
      params: {
        from: fromPickerValue,
        to: toPickerValue,
        amount: convertAmount
      },
      headers: {
        'X-RapidAPI-Key': '2c3b4556d2mshca925566ecbe76ap13f707jsn4dc6d2c0f27a',
        'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setResult(response.data.result.convertedAmount)
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

      <View className="basis-1/4 w-full justify-center items-center">
        <View>
          <Text className="text-4xl">Welcome</Text>
        </View>
      </View>

      <View className="basis-3/4 w-full items-center gap-4 pt-4 bg-sky-100">
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
          <Pressable onPress={handleConvertButton} disabled={!(fromPickerValue && toPickerValue && convertAmount)} className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <Text className="text-white text-center">Convert!</Text>
          </Pressable>
        </View>
        <View className="w-80">
          {result && <Text className="text-5xl text-center mt-2 pb-0">{parseFloat(result.toFixed(3))}</Text>}
        </View>
        <View className="w-80">
          {
            result && 
            <Pressable onPress={handleClearButton} className="focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              <Text className="text-white text-center">Clear!</Text>
            </Pressable>
          }
        </View>
      </View>
    </View>
  );
}