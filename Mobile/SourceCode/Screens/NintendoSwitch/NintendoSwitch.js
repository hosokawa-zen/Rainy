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
import CustomAccordion from '../../Components/CustomAccordion/CustomAccordion'
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import RNProgressHud from 'progress-hud';
import { Alert } from 'react-native';

export default class NintendoSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dealDescription:false,
            dealOwner:false,
            dealQuantityView:false,
            totalItemView:false,
            dealsLeft:false,
            terms:true,
            contactInfo:true,
            participatingBranches:true,
            buttonTitle:'',
            onPressButton:null,
            fromLocker:this.props.route.params.fromLocker ? true :false,
            fromBrowse:this.props.route.params.fromBrowse ? true :false,

            description: '',
            imageLink: {uri: ''},
            title: '',
            subTitle: '',
            price: '',
            owner: '',
            dealData: {},
            dealsLeftText: '',
            couponCount: 1,
            couponPlusLimit: false,
            couponMinLimit: true
        };
        this.userId = "";
    }

    componentDidMount(): void {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.userId = user.uid;
                var dealData = this.props.route.params.item.deal;
                try {
                    RNProgressHud.showWithStatus('Loading...')
                    database().ref(`users/${dealData.userId}`).once('value').then(snapshot => {
                        if (snapshot.exists()) {
                            var user = snapshot.val();
                            database().ref(`business/${user.business_id}`).once('value').then(snapshot2 => {

                                if (snapshot2.exists()) {
                                    var business = snapshot2.val();
                                    if (dealData.userId && business) {
                                        dealData.address = business.address
                                        dealData.contact = business.contact
                                        dealData.email = business.email
                                        dealData.user_name = user != undefined ? user.name : ""
                                        dealData.subTitle = business.name
                                    }
                                    if (dealData.branchs) {
                                        this.setState({dealsLeftText: `You have ${dealData.paidCount} out of ${dealData.dealsPerUser} deals left`})
                                    }
                                    this.setState({contactInfo: dealData.companyInfo});
                                    dealData.business = business;
                                    console.log(dealData)
                                    this.setState({dealData: dealData})
                                    if (dealData.dealsPerUser == 1) {
                                        this.setState({couponPlusLimit: true});
                                        this.setState({couponMinLimit: true});
                                    } else {
                                        this.setState({couponPlusLimit: false});
                                            this.setState({couponMinLimit: true});
                                    }
                                    if(this.state.fromLocker){
                                        this.setState({buttonTitle:'Use', onPressButton:() => {
                                            if (this.props && this.props.navigation) {
                                                this.onPressUse(this.props.route.params.item)
                                                this.props.navigation.navigate('UseDeal', {item: this.props.route.params.item, deal: dealData, key: this.props.route.params.item.key})
                                            }
                                        }})
                                    } else if(this.state.fromBrowse){
                                        this.setState({buttonTitle:'Buy Now',dealDescription:true,dealsLeft:false,fromBrowse:false,fromLocker:false})
                                    }
                                }
                            }).catch(error => {
                                alert(error.message)
                            })
                        }
                        RNProgressHud.dismiss()
                    })
                } catch (error) {
                    alert(JSON.stringify(error))
                }
                console.log(this.props.route.params.item.deal)
            } else {
                if (this.props && this.props.navigation) {
                    this.props.navigation.navigate("LoginScreen")
                }
            }
        });
    }

    onPressUse(item) {
        try {
         const key = item.transaction_id;

         var dateObj = new Date();
         var month = dateObj.getUTCMonth() + 1; //months from 1-12
         var day = dateObj.getUTCDate();
         var year = dateObj.getUTCFullYear();
         var hour = dateObj.getHours()
         var min = dateObj.getMinutes()

         var newdate = year + "/" + month + "/" + day + " " + hour + ":" + min;

         var updates = {};
         updates['transactions/'+ key + "/date_used"] = newdate;
         database().ref().update(updates);
        } catch (error) {
            alert(JSON.stringify(error))
        }
     }

    onPressBuyNow = () => {
        if(this.state.buttonTitle === 'Buy Now') {
            console.log('deals', this.state.dealData.dealsPerUser, this.state.dealData.paidCount);
            if (this.state.dealData.dealsPerUser <= this.state.dealData.paidCount) {
                alert("User purchased a limited count of deals")
            } else {
                this.setState({
                    buttonTitle: 'Proceed to Payment',
                    dealsLeft: false,
                    totalItemView: true,
                    dealQuantityView: true,
                    dealOwner: true,
                    contactInfo:false,
                    terms:false,
                    participatingBranches:false
                })
            }
        } else if(this.state.buttonTitle === 'Proceed to Payment') {
            if (this.props && this.props.navigation) {
                this.props.navigation.navigate('TermsAndConditions', {key: this.props.route.params.item.key, terms: this.state.dealData.terms, price: this.state.dealData.promotionPrice, count: this.state.couponCount, deal: this.state.dealData})
            }
        }

    };

    onCouponPlus = () => {
        const dealsPerUser = this.state.dealData.dealsPerUser - this.state.dealData.paidCount;
        const totalDeals = this.state.dealData.remainDeals;
        var count = this.state.couponCount;
        count++;
        this.setState({couponPlusLimit: false});
        this.setState({couponMinLimit: false});
        if (count <= dealsPerUser && count <= totalDeals) {
            this.setState({couponCount: count});
        } else {
            this.setState({couponPlusLimit: true});
        }
        count++;
        if (!(count <= dealsPerUser && count <= totalDeals)) {
            this.setState({couponPlusLimit: true});
        }
        if (dealsPerUser != undefined && dealsPerUser == 1) {
            this.setState({couponPlusLimit: true});
            this.setState({couponMinLimit: true});
        }
    }

    onCouponMinus = () => {
        const dealsPerUser = this.state.dealData.dealsPerUser - this.state.dealData.paidCount;
        var count = this.state.couponCount;
        count--;
        this.setState({couponPlusLimit: false});
        this.setState({couponMinLimit: false});
        if (count > 0) {
            this.setState({couponCount: count});
        } else {
            this.setState({couponMinLimit: true});
        }

        count--;
        if (count > 0) {
            this.setState({couponCount: count});
        }
        if (dealsPerUser == 1) {
            this.setState({couponPlusLimit: true});
            this.setState({couponMinLimit: true});
        }
    }


    render() {
        let buttonTitle = this.state.buttonTitle;
        let onPressButton= this.state.onPressButton;

        const branchElements = this.props.route.params.item.deal ?? this.props.route.params.item.deal.branchs ? this.props.route.params.item.deal.branchs.map(branch => (
            <Text style={styles.subTitle}>{branch.address}</Text>
          )) : <View />;
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
                        title={this.state.dealData.name}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />
                </View>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
                        <View style={styles.imageView}>
                            <Image style={styles.image} source={{uri: this.state.dealData.imageLink}} />
                        </View>
                        <View style={styles.contentView}>
                            <View style={styles.summaryItem}>
                                <View>
                                    <Text style={styles.title}>{this.state.dealData.name}</Text>
                                    <Text style={[styles.subTitle]}>{this.state.dealData.subTitle}</Text>
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.priceText}>{`$${this.state.dealData.promotionPrice ? this.state.dealData.promotionPrice : 0}`}</Text>
                                    <Text style={[styles.subTinyTitle]}>{`Deal expires on ${this.state.dealData.validaty2 ? this.state.dealData.validaty2 : ''}`}</Text>
                                </View>
                            </View>
                            {this.state.dealsLeft &&
                            <View style={styles.dealLeftView}>
                                <Text style={[styles.title]}>{this.state.dealsLeftText}</Text>
                                <View style={styles.viewTotal}>
                                    <Image style={styles.img} source={images.ic_coupon} />
                                    <Image style={[styles.img,{marginLeft:wp(3)}]} source={images.ic_coupon_unselected} />
                                </View>
                            </View> }
                            {this.state.dealDescription &&
                                <CustomAccordion
                                    title={'Deal Descriptions'}
                                    content = {
                                        <Text style={styles.subTitle}>{this.state.dealData.description}</Text>
                                    }
                                />
                            }
                            {this.state.dealOwner &&
                                <View style={[styles.CodeView,{height:hp(9.5)}]}>
                                    <View style={styles.viewContact}>
                                        <Text style={styles.titleTouchItem}>Deal Owner</Text>
                                    </View>
                                    <Text style={styles.subTitle}> {this.state.dealData.user_name} </Text>
                                </View>
                            }
                            {this.state.dealQuantityView &&
                                <View style={styles.dealQuantityView}>
                                    <View style={styles.viewContact}>
                                        <Text style={styles.titleTouchItem}>Deal Quantity</Text>
                                        <View style={styles.addView}>
                                            <TouchableOpacity onPress={() =>  this.onCouponMinus()}><Image style={styles.addIcon} source={this.state.couponMinLimit ? images.ic_minus_disable : images.ic_minus}/></TouchableOpacity>
                                            <Text style={styles.addText}>{this.state.couponCount}</Text>
                                            <TouchableOpacity onPress={() =>  this.onCouponPlus()}><Image style={styles.addIcon} source={this.state.couponPlusLimit ?  images.ic_add_disable : images.ic_add}/></TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.quantityTextView}>
                                        <Text style={styles.subLittleTitle}> {`${this.state.dealData.remainDeals} coupons left` }</Text>
                                        <Text style={styles.subLittleTitle}>{`${this.state.dealData.dealsPerUser - this.state.dealData.paidCount} of ${this.state.dealData.dealsPerUser} coupons allowed` }</Text>
                                    </View>
                                </View>
                            }


                            {this.state.totalItemView &&
                                <TouchableOpacity style={styles.touchItem}>
                                    <Text style={styles.titleTouchItem}>Total</Text>
                                    <Text style={styles.titleTouchItem}>{`$${parseFloat(this.state.dealData.promotionPrice) * parseFloat(this.state.couponCount) }`}</Text>
                                </TouchableOpacity>
                            }



                            {this.state.terms &&
                                <CustomAccordion
                                    title={'Terms and Conditions'}
                                    content = {
                                        <Text style={styles.subTitle}>{this.state.dealData.terms}</Text>
                                    }
                                />
                            }

                            {this.state.participatingBranches &&

                                <CustomAccordion
                                title={'Participating Branches'}
                                content = {
                                    <TouchableOpacity style={styles.toggleItem} onPress={() => {
                                        if (this.props && this.props.navigation) {
                                            this.props.navigation.navigate('ParticipatingBranches', {deal: this.props.route.params.item.deal})
                                        }
                                    }
                                    }>
                                        {
                                            branchElements
                                        }
                                    </TouchableOpacity>
                                    }
                                />
                            }

                            {this.state.contactInfo &&
                                <CustomAccordion
                                    title={'Contact Information'}
                                    content = {
                                        <View>
                                            <View style={styles.viewInfo}>
                                                <Image style={styles.iconInfo} source={images.ic_email} />
                                                <Text style={styles.infoText}>{this.state.dealData.email}</Text>
                                            </View>
                                            <View style={styles.viewInfo}>
                                                <Image style={styles.iconInfo} source={images.ic_phone} />
                                                <Text style={styles.infoText}>{this.state.dealData.contact}</Text>
                                            </View>
                                            <View style={styles.viewInfo}>
                                                <Image style={styles.iconInfo} source={images.ic_website} />
                                                <Text style={styles.infoText}>{this.state.dealData.address}</Text>
                                            </View>
                                        </View>
                                    }
                                />
                            }
                        </View>
                        <View style={styles.buttonView}>
                            <Button title={buttonTitle} onPress={onPressButton || this.onPressBuyNow}/>
                        </View>

                    </ScrollView>

                </View>
            </View>
        );
    }
}

