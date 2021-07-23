//====> System files <====//
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text,FlatList,TouchableOpacity,Image,ScrollView, Modal} from 'react-native';
import React from 'react';

//====> Local files <====//

import AppHeader from "../../Components/AppHeader/AppHeader";
import images from "../../Assets/Images/images";
import styles from './style';
import TabsComponent from "../../Components/TabsComponent/TabsComponent";
import LockerComponent from "../../Components/NewAppComponents/LockerComponent/LockerComponent";
import CustomAccordion from '../../Components/CustomAccordion/CustomAccordion'
import colors from "../../Assets/Colors/colors";
import TransactionComponent from "../../Components/NewAppComponents/TransactionComponent/TransactionComponent";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import BrowseActionModel from "../../Components/BrowseActionModel/BrowseActionModel";

import RNProgressHud from 'progress-hud';
import { Alert } from 'react-native';

export default class UserProfile extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {
            leftTab: true,
            rightTab: false,
            farmInformationView:true,
            reviewView:false,
            listItems: [],
            listItemsExpired: [],
            listTransactionItems: [],
            modalVisible: false,
            sortTitle: 'Active',
            name: "",
            email: "",
            avatar: "",
            position: "",
        }
        var listItems = [];
        var listItemsExpired = [];
        var listTransactionItems = [];
        this.staticListItems = [];
        try {
            RNProgressHud.showWithStatus('Loading...')
            auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log('user is logged');
                    this.userId = user.uid;
                    this.getUserInfo();
                    const currentDate = this.currentDateToFormat();
                    database().ref("/transactions").on('value', snapshot => {
                        this.setState({farmInformationView: false});
                        if (snapshot.exists()) {
                            const transactions = snapshot.val()
                            database().ref("/promotions").on('value', snapshot2 => {
                                if (snapshot2.exists()) {
                                    listItems = [];
                                    listTransactionItems = [];
                                    listItemsExpired = [];
                                    var promotions = snapshot2.val();
                                    Object.keys(transactions).forEach((key, index) => {
                                        const trans = transactions[key];
                                        if (trans.promotio_id && promotions[trans.promotio_id]) {
                                            if (!promotions[trans.promotio_id].paidCount) {
                                                promotions[trans.promotio_id].paidCount = 0;
                                            }
                                            promotions[trans.promotio_id].paidCount += trans.amount;

                                            const promt = promotions[trans.promotio_id];
                                            const transload = {
                                                id: index,
                                                image: {uri: promt.imageLink},
                                                text: `Purchased ${promt.name} for $${trans.allPrice} with promotion code ${trans.reference_code}. you saved 10% from the actual price!`
                                            }
                                            if (trans && trans.user_id == this.userId) {
                                                listTransactionItems.push(transload)
                                            }
                                            if (trans && promt && trans.user_id == this.userId) {

                                                const load = {
                                                    transaction_id: key,
                                                    code: trans.reference_code,
                                                    status: trans.deal_status,
                                                    hightlight: trans.hightlight,
                                                    hidden: trans.hidden,
                                                    id: index,
                                                    image: {uri: promt.imageLink},
                                                    title: promt.name,
                                                    subTitle: user.position,
                                                    text: promt.description,
                                                    rightIcon: trans.hightlight ? images.ic_tagged : images.ic_tag_2,
                                                    quantity: `${trans.amount}/${promt.paidCount}`,
                                                    price: promt.promotionPrice,
                                                    lockText:`Locked ${trans.date_of_purchase}`,
                                                    valid: `Valid ${promt.validaty2}`,
                                                    deal: promt,
                                                }
                                                if (promt.validaty2 >= currentDate) {
                                                    listItems.push(load);
                                                } else {
                                                    if (!load.hidden) {
                                                        listItemsExpired.push(load);
                                                    }
                                                }
                                            }
                                        }
                                    })
                                }

                                var taggedItems = [];
                                var unTaggedItems = [];
                                listItems.forEach((value) => {
                                    if (value.hightlight) {
                                        taggedItems.push(value)
                                    } else {
                                        unTaggedItems.push(value)
                                    }
                                })

                                listItems = [];
                                taggedItems.forEach((value) => {
                                    listItems.push(value)
                                })
                                unTaggedItems.forEach((value) => {
                                    listItems.push(value)
                                })

                                taggedItems = [];
                                unTaggedItems = [];
                                listItemsExpired.forEach((value) => {
                                    if (value.hightlight) {
                                        taggedItems.push(value)
                                    } else {
                                        unTaggedItems.push(value)
                                    }
                                })

                                listItemsExpired = [];
                                taggedItems.forEach((value) => {
                                    listItemsExpired.push(value)
                                })
                                unTaggedItems.forEach((value) => {
                                    listItemsExpired.push(value)
                                })

                                this.setState({listTransactionItems: listTransactionItems})
                                this.setState({listItemsExpired: listItemsExpired})
                                this.staticListItems = [...listItems]
                                this.refreshListItems()
                                RNProgressHud.dismiss()
                                this.setState({farmInformationView: true});
                            })
                        } else {
                            RNProgressHud.dismiss()
                        }
                    })
                } else {
                    RNProgressHud.dismiss()
                    this.props.navigation.navigate("SocialLoginScreen")
                }
            });
        } catch (error) {
            alert(JSON.stringify(error))
            RNProgressHud.dismiss()
        }
    }

    currentDateToFormat = () => {
        var now = new Date();

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

        return today;
    }

    clearExpiredDeals = () => {
        RNProgressHud.showWithStatus('Loading...')
        setTimeout(() => {
            var updates = {};
            this.state.listItemsExpired.forEach((item) => {
                const transaction_id = item.transaction_id;
                updates[`transactions/${transaction_id}/hidden`] = true;
            })
            database().ref().update(updates);
        }, 500);
    }

    updateRightFlag = (item) => {
        RNProgressHud.showWithStatus('Loading...')
        setTimeout(() => {
            const transaction_id = item.transaction_id;
            var flag = true;
            if (item.hightlight) {
                flag = false;
            }
            var updates = {};
            updates[`transactions/${transaction_id}/hightlight`] = flag;
            database().ref().update(updates);
        }, 500);
    }

//====> Images Method <====//

    lockerComponent(item){
        return(
            <LockerComponent
                navigation={this.props.navigation}
                image={item.image}
                title={item.title}
                subTitle={item.subTitle}
                text={item.text}
                rightIcon={item.rightIcon}
                quantity={item.quantity}
                price={item.price}
                lockText={item.lockText}
                valid={item.valid}
                tintColorRightIcon={item.tintColorRightIcon}
                onPress={() => this.props.navigation.navigate('NintendoSwitch',{fromLocker:true, item: item})}
                onRightClick={() => {this.updateRightFlag(item)}}
            />
        )
    }

    transactionComponent(item){
        return(
            <TransactionComponent
                image={item.image}
                text={item.text}
                // onPress={() => this.props.navigation.navigate('')}
            />
        )
    }

    getUserInfo = () => {
        try {
            database().ref(`users/${this.userId}/`).once('value').then(snapshot=> {
                if (snapshot.exists()) {
                    const user = snapshot.val()
                    const avater = user.avatar ? user.avatar : "";
                    const name = user.name ? user.name : "";
                    const email = user.email ? user.email : "";
                    const position = user.position ? user.position : "";
                    this.setState({ avater: avater })
                    this.setState({ name: name })
                    this.setState({ position: position })
                    this.setState({ email: email })
                } else {
                  alert("Can't get user info")
                }
              })
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    refreshListItems = () => {
        const items = [];
        this.staticListItems.forEach((item) => {
            items.push(item)
        })
        this.setState({listItems: items})
    }

    sortByStatus = (flag) => {
        this.setModalVisible(false);
        if (flag == 0) {
            this.setState({sortTitle: "Active"})
        } else {
            this.setState({sortTitle: "Available"})
        }
        this.refreshListItems();
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    render() {
        const { modalVisible } = this.state;
        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader title={'User Profile'}
                               leftIconPath={images.ic_hamburger_menu}
                               onLeftIconPress={()=> this.props.navigation.openDrawer()}
                               rightIconOnePath={images.ic_edit}
                               rightIconSize={28}
                               onRightIconPress={()=> this.props.navigation.navigate('EditProfile')}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>
                    <View style={styles.viewImage}>
                        <TouchableOpacity>
                            <Image style={styles.img} source={this.state.avater != "" ? {uri: this.state.avater} : images.no_user_image}/>
                        </TouchableOpacity>
                        <View style={styles.viewText}>
                            <Text style={styles.userName}>{this.state.name}</Text>
                            {/* <View style={styles.infoView}>
                                <Text style={styles.addressText}>{this.state.position}</Text>
                            </View> */}
                            {/* <View style={styles.infoView}>
                                <Image style={styles.icon} source={images.ic_phone}/>
                                <Text style={styles.addressText}>3754 Venture Drive NY</Text>
                            </View> */}
                        </View>
                    </View>

                    <View style={styles.viewInfo}>
                        <View style={styles.viewTabs}>
                            <TabsComponent
                                leftText={'My Locker'}
                                rightText={'My Transactions'}
                                onLeftPress={() => this.setState({ leftTab: true, rightTab: false ,farmInformationView:true, reviewView:false})}
                                onRightPress={() => this.setState({ rightTab: true, leftTab: false,farmInformationView:false, reviewView:true })}
                            />
                        </View>

                        <View style={styles.viewContent}>

                            {this.state.reviewView &&
                            <View>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.listTransactionItems}
                                    renderItem={({ item }) => this.transactionComponent(item)}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                            }

                            {this.state.farmInformationView &&

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,paddingBottom:hp(5)}}>
                                <CustomAccordion
                                    title={'Active'}
                                    noPadding = {true}
                                    content = {
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={this.state.listItems}
                                            renderItem={({ item }) => this.lockerComponent(item)}
                                            keyExtractor={item => item.id}
                                        />
                                    }
                                />
                                <CustomAccordion
                                    title={'Expired'}
                                    noPadding = {true}
                                    content = {
                                        <View style={styles.expiredBackground}>
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                data={this.state.listItemsExpired}
                                                renderItem={({ item }) => this.lockerComponent(item)}
                                                keyExtractor={item => item.id}
                                            />
                                             <TouchableOpacity onPress = {() => {this.clearExpiredDeals()}} style={styles.expiredDeal}>
                                                <Text style={[styles.titleTouchItem,{color:colors.white}]}>Clear Expired Deals</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />
                            </ScrollView>
                            }

                        </View>

                    </View>

                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                    }}>
                    <BrowseActionModel
                        onPressItem={(flag) => {
                            this.sortByStatus(flag)
                        }}
                    />
                </Modal>

            </View>

        );
    }
}



