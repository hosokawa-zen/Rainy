//================================ React Native Imported Files ======================================//
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Text, Image, StatusBar, View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//
import AppHeader from '../../Components/AppHeader/AppHeader';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import PaymentComponent from "../../Components/NewAppComponents/PaymentComponent/PaymentComponent";
import database from '@react-native-firebase/database';

import RNProgressHud from 'progress-hud';
import { Alert } from 'react-native';


export default class UseDeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         }}

    render() {
        const item = this.props.route.params.item;
        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />

                <View style={styles.headerContainer}>
                    <AppHeader
                        leftIconPath={images.headerLeftBack}
                        title={'Use Deal'}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />
                </View>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{flexGrow:1}}>

                    <View style={styles.imageView}>
                        <Image style={styles.image} source={{uri: item.deal.imageLink}} />
                    </View>
                    <View style={styles.contentView}>
                        <View style={styles.summaryItem}>
                            <View style={styles.viewTotal}>
                                <Text style={styles.title}>{item.deal.name}</Text>
                                <Text style={[styles.subTitle]}>{this.props.route.params.deal.subTitle}</Text>
                            </View>
                            <Text style={styles.priceText}>{`$${item.deal.promotionPrice}`}</Text>
                        </View>

                        <View style={styles.CodeView}>
                            <Text style={styles.dealText}>Your Deal Code is</Text>
                            <Text style={styles.codeText}>{item.code}</Text>
                            <Text style={styles.validText}>Present this code to the cashier together with 1 valid ID upon purchase.</Text>
                        </View>
                    </View>
                    {/* <View style={styles.buttonView}>
                        <Button onPress={() => this.onConfirm()} title={'Confirm'}/>
                    </View> */}

                    </ScrollView>

                </View>
            </View>
        );
    }
}

