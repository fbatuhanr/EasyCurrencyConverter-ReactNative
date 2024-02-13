import React from 'react'
import { StyleSheet, ScrollView, FlatList, SafeAreaView, View, Text, Button } from 'react-native';

const HistoryPage = () => {

    const items = [
        { id: 1, text: 'Item 1'},
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
        { id: 4, text: 'Item 4' },
        { id: 5, text: 'Item 5' },
        { id: 6, text: 'Item 6' },
        { id: 7, text: 'Item 7' },
        { id: 8, text: 'Item 8' },
        { id: 9, text: 'Item 9' }
        // Add more items here...
    ];

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{item.text}</Text>
        </View>
    );

    return (
        <SafeAreaView>
            <View className="flex justify-center items-center">
                <View className="basis-1/6 justify-center">
                    <Text>basis 1/6</Text>
                </View>
                <View className="basis-4/6 justify-start">

                    <ScrollView>
                        <FlatList
                            data={items}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            vertical
                        />
                    </ScrollView>
                </View>
                <View className="basis-1/6 justify-center">
                    <Text>basis 1/6</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
  },
});

export default HistoryPage;