//================================ React Native Imported Files ======================================//
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Text, Image, StatusBar, View, FlatList, ScrollView, Modal} from 'react-native';
import React from 'react';
// import RNPaypal from 'react-native-paypal-lib';
import { CreditCardInput } from "react-native-credit-card-input";
import stripe from 'react-native-stripe-payments';

//================================ Local Imported Files ======================================//
import AppHeader from '../../Components/AppHeader/AppHeader';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import PaymentComponent from "../../Components/NewAppComponents/PaymentComponent/PaymentComponent";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import RNProgressHud from 'progress-hud';
import { Alert } from 'react-native';

import { cloudUrl, stripeId, freemium } from '../../Global'
 
export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [
                {
                    id: 1,
                    title: 'Credit Card / Stripe',
                },
                {
                    id: 2,
                    title: 'Paypal',
                }
            ],
            selectedId: 0,
            modalVisible: false,
            isCardValid: false,
        };
        // this.props.route.params.price
        this.cardValue = {};
        this.totalPrice = 0;
        this.feePrice = 0;
        this.allPrice = 0;
        this.payBusinessPrice = 0;
        this.payAdminPrice = 0;
        this.businessAccountId = "";
        
        if (this.props.route.params.price !== '') {
            this.totalPrice = parseFloat(this.props.route.params.count) * parseFloat(this.props.route.params.price)
            this.feePrice = parseFloat(this.props.route.params.count) * parseFloat(this.props.route.params.price) * 0.05
            this.allPrice = this.totalPrice + this.feePrice;
        }
        this.paypalId = 'Your PayPal ID';
        stripe.setOptions({ publishingKey: stripeId });

        this.calculateRealPrice();
    }

    componentDidMount() {
        this.setState({selectedId: 1})
    }

    calculateRealPrice() {
        const currentSecond = Math.floor(Date.now() / 1000)
        const business = this.props.route.params.deal.business
        this.businessAccountId = business.accountID
        const timediff = Math.abs(currentSecond - business.created_at)
        if (timediff > freemium) {
            this.payAdminPrice = this.allPrice -  this.totalPrice * 9 / 10;
            this.payBusinessPrice = this.totalPrice * 9 / 10;
            console.log(this.payAdminPrice, this.payBusinessPrice)
        }
    }

    getRandomString = (length) => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    currentDateToFormat = () => {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var hour = dateObj.getHours()
        var min = dateObj.getMinutes()

        var newdate = year + "/" + month + "/" + day + " " + hour + ":" + min;

        return newdate;
    }

    onConfirm = () => {
        var flag = false;
        if (this.state.selectedId == 2) {
            this.paypalPayment();
        } else {
            this.setModalVisible(true)
        }
    }

    onSavePaid () {
        const count = this.props.route.params.count;
        const deal = this.props.route.params.deal;
        const key = this.props.route.params.key;
        const currentUser = auth().currentUser;
        try {

            var newdate = this.currentDateToFormat();

            var load = {
                transaction_id: this.getRandomString(10) + Math.floor(Date.now() / 1000),
                promotio_id: key,
                deal_status: 1,
                allPrice: this.allPrice,
                totalPrice: this.totalPrice,
                feePrice: this.feePrice,
                payAdminPrice: this.payAdminPrice,
                payBusinessPrice: this.payBusinessPrice,
                amount: count,
                user_id: currentUser.uid,
                date_of_purchase: newdate,
                date_used: "",
                reference_code: this.getRandomString(10),
                createdAt: Date.now(),
            }

            var promotionListRef = database().ref('transactions/');
            var newPromotionRef = promotionListRef.push();
            newPromotionRef.set(load)
            if (this.props && this.props.navigation) {
                this.props.navigation.navigate('UserProfile')
            }
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    listDealsItems(item) {
        return (
            <PaymentComponent
                id = {item.id}
                selectedId = {this.state.selectedId}
                checked={(id) => this.onPaymentMethod(id)}
                title={item.title}
            />
        )
    }

    onPaymentMethod(id) {
        this.setState({selectedId: id})
    }

    async onConfirmCard() {
        try {
            if (this.state.isCardValid) {

                // this.payAdminPrice = 0;
                // this.businessAccountId = "";
                const apiUrl = `${cloudUrl}?amount=${this.allPrice}&accountID=${this.businessAccountId}&fee=${this.payAdminPrice}`
                console.log(apiUrl)
                debugger
                const response = await fetch(apiUrl, { method: 'get' })
                console.log(response);
                let res = await response.json();
                console.log(res);
                
                const splited = this.cardValue.expiry.split('/')
                const month = splited[0]
                const year = splited[1]
                
                const cardDetails = {
                    number: this.cardValue.number,
                    expMonth: parseInt(month),
                    expYear: parseInt(year),
                    cvc: this.cardValue.cvc,
                }

                const isCardValid = stripe.isCardValid(cardDetails);
                if (isCardValid) {
                    stripe.confirmPayment(res.client_secret, cardDetails)
                    .then(result => {
                      // result of type PaymentResult
                      this.onSavePaid();
                      this.setModalVisible(false)
                    })
                    .catch(err =>
                      {
                        console.log(err.message)
                        alert(err.message)
                      }
                    )
                } else {
                    alert('card validation failed')
                }
            } else {
                alert('card validation failed')
            }
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
    }

    paypalPayment = async () => {
        this.onSavePaid();
        return
        try {
            // RNPaypal.paymentRequest({
            //     clientId: this.paypalId,
            //     environment: RNPaypal.ENVIRONMENT.NO_NETWORK,
            //     intent: RNPaypal.INTENT.SALE,
            //     price: this.totalPrice + this.feePrice,
            //     currency: 'USD',
            //     description: `Android testing`,
            //     acceptCreditCards: true
            // }).then(response => {
            //     this.onSavePaid();
            //     console.log(response)
            // }).catch(err => {
            //     console.log(err.message)
            // })
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };

    onCardInfoChanges = (form) => {
        console.log(form)
        this.cardValue = form.values;
        this.setState({isCardValid: form.valid})
    }

    render() {
        const {modalVisible, isCardValid} = this.state;
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
                        title={'Payment'}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />
                </View>
                <View style={styles.container}>
                    <View style={styles.selectView}><Text style={styles.textSelect}>Select Payment Method</Text></View>
                    <View style={styles.flatView}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.listItems}
                            renderItem={({ item }) => this.listDealsItems(item)}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.summaryView}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.titlePayment}>Payment Summary</Text>
                            <View style={styles.viewTotal}>
                                <Text style={styles.subTitle}>Sub Total</Text>
                                <Text style={[styles.subTitle]}>{`$${this.totalPrice}`}</Text>
                            </View>
                            <View style={styles.viewTotal}>
                                <Text style={styles.subTitle}>Fee</Text>
                                <Text style={[styles.subTitle,{color:colors.app_header_color}]}>{`$${this.feePrice}`}</Text>
                            </View>

                        </View>
                    </View>
                    <View style={styles.buttonView}>
                        <Button onPress={() => this.onConfirm()} title={'Confirm Purchase'}/>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.cardContainer}>
                        <CreditCardInput onChange={this.onCardInfoChanges} />
                        <View style={styles.cardBtnContainer}>
                            <Button onPress={() => this.onConfirmCard()} title={'Confirm Purchase'}/>
                            <Button onPress={() => this.setModalVisible(!modalVisible)} title={'Back'}/>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

