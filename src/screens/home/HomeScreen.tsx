import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
    ActivityIndicator
} from 'react-native';
import { homeContainer } from "@theme/view"
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import ShopNow from '@components/shopNow/ShopNow'
import BestSellingProducts from '@components/bestSellingProducts/BestSellingProducts'
import NewArrivals from '@components/newArrivals/NewArrivals'

const HomeScreen = ({ navigation }) => {

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle} >
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                style={[backgroundStyle]}>

                <View style={homeContainer}>
                    {/* Shop Now */}
                    <ShopNow />

                    {/* Best selling products */}
                    <BestSellingProducts navigation={navigation} />

                     {/*New Arrivals */}
                     <NewArrivals navigation={navigation}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;