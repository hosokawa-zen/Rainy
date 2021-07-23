//================================ React Native Imported Files ======================================//
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Text, Image, StatusBar, View, FlatList, ScrollView, Modal} from 'react-native';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';

//================================ Local Imported Files ======================================//
import AppHeader from '../../Components/AppHeader/AppHeader';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import BrowseAllComponent from "../../Components/NewAppComponents/BrowseAllComponent/BrowseAllComponent";
import BrowseModel from "../../Components/BrowseModel/BrowseModel";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import RNProgressHud from 'progress-hud';
import { Alert } from 'react-native';


export default class BrowseAllDeals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            listItems: [],
            name: "",
            email: "",
            avatar: "",
            browseTitle: 'Browse All Deals',
            position: {
                lat: 0,
                lng: 0,
            }
        };

        Geolocation.getCurrentPosition(
            position => {
                console.log(position)
                this.setState({position: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }});
                this.getBrowserInfo();
            },
            error => {
                console.log('Error', JSON.stringify(error))
                this.getBrowserInfo();
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    getBrowserInfo = () => {
        this.staticListItems = [];
        RNProgressHud.showWithStatus('Loading...')
        try {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log('user is logged');
                    this.userId = user.uid;
                    this.getUserInfo();
                    database().ref("/promotions").on('value', snapshot => {
                        if (snapshot.exists()) {
                            var promotions = snapshot.val();

                            database().ref("/transactions").on('value', snapshot1 => {
                                var transactions = [];
                                if (snapshot1.exists()) {
                                    transactions = snapshot1.val()
                                }
                                database().ref(`/business`).on('value', snapshot2 => {
                                    var business = {};
                                    if (snapshot2.exists()) {
                                        business = snapshot2.val()
                                    }
                                    var items = [];
                                    Object.keys(promotions).map((key, index) => {
                                        const deal = promotions[key];
                                        var totalLocations = 0;
                                        var remainedLocations = 0;

                                        var distance = 6371
                                        if (deal.branchs) {
                                            console.log(deal.branchs)
                                            Object.keys(deal.branchs).map((branchKey) => {
                                                const branch = deal.branchs[branchKey];
                                                const distance2 = this.getDistanceFromLatLonInKm(branch.lat, branch.lng, this.state.position.lat, this.state.position.lng);
                                                if (distance > distance2) {
                                                    distance = distance2;
                                                }
                                                totalLocations++;
                                                if (!branch.selled) {
                                                    remainedLocations++;
                                                }
                                            })
                                        }

                                        var sellCount = 0;
                                        Object.keys(transactions).map(transKey => {
                                            const transaction = transactions[transKey];
                                            if (transaction.promotio_id == key) {
                                                sellCount = sellCount + transaction.amount;
                                            }
                                        })

                                        var subTitle = "";
                                        if (business[deal.userId]) {
                                            subTitle = business[deal.userId].name
                                        }

                                        var remainedCount =  deal.totalDeals - sellCount
                                        deal.remainDeals = remainedCount;
                                        deal.paidCount = sellCount;

                                        items.push({
                                            dealerId: deal.userId,
                                            key,
                                            id: index,
                                            image: {uri: deal.imageLink},
                                            title: deal.name,
                                            subTitle: subTitle,
                                            price: deal.promotionPrice,
                                            totalLocations,
                                            remainedLocations,
                                            location: `${remainedCount} left ${totalLocations} locations`,
                                            deal,
                                            totalCount: deal.totalDeals,
                                            sellCount,
                                            created: deal.createdAt,
                                            distance,
                                        })
                                    })
                                    this.setState({listItems: items})
                                    this.staticListItems = [...items];
                                    RNProgressHud.dismiss()
                                })
                            })
                        } else {
                            RNProgressHud.dismiss()
                        }
                    })
                }
            })
        } catch (error) {
            alert(JSON.stringify(error))
            RNProgressHud.dismiss()
        }
    }

    getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1);
        var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
      }

      deg2rad = (deg) => {
        return deg * (Math.PI/180)
      }

    getUserInfo = () => {
        try {
            database().ref(`users/${this.userId}/`).once('value').then(snapshot => {
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

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    onReportDeal = (item) => {
        var load = {
            user_id: this.userId,
            reporter_id: item.dealerId
        }

        var promotionListRef = database().ref('reports/');
        var newPromotionRef = promotionListRef.push();
        newPromotionRef.set(load)
        alert("Reported")
    }


    listDealsItems(item) {
        return (
            <BrowseAllComponent
                image={item.image}
                title={item.title}
                subTitle={item.subTitle}
                price={item.price}
                location={item.location}
                onPress={() => {
                    if (this.props && this.props.navigation) {
                        this.props.navigation.navigate('NintendoSwitch',{fromBrowse:true, item})
                    }
                }}
                onReports={() => {
                    this.onReportDeal(item)
                }}
            />
        )
    }

    browserDeals(flag) {
        var items = [...this.staticListItems];
        console.log(items)
        if (flag == 'new') {
            items.sort((a, b) => b.createdAt - a.createdAt);
            this.setState({browseTitle: 'Browse By New'})
        } else if (flag == 'near') {
            items.sort((a, b) => a.distance - b.distance);
            this.setState({browseTitle: 'Browse By Near By'})
        } else if (flag == 'best') {
            items.sort((a, b) => b.sellCount - a.sellCount);
            this.setState({browseTitle: 'Browse By Best Seller'})
        }
        console.log(items)
        this.setState({listItems: items})
        this.setModalVisible(false)
    }

    render() {
        const { modalVisible } = this.state;

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
                        leftIconPath={images.ic_hamburger_menu}
                        title={this.state.browseTitle}
                        onRightIconPress={() => {
                            if (this.props && this.props.navigation) {
                                this.props.navigation.navigate('EditProfile')
                            }
                        } }
                        rightIconOnePath={images.ic_edit}
                        onPressTitleRightLogo={() => this.setModalVisible(true)}
                        titleLogoPathRight={images.ic_sort_down}
                        onLeftIconPress={() => this.props.navigation.openDrawer()}
                    />
                </View>
                <View style={styles.container}>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.listItems}
                        renderItem={({ item }) => this.listDealsItems(item)}
                        keyExtractor={item => item.id}
                    />

                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                    }}>
                    <BrowseModel
                        onPressItem={(flag) => {
                            this.browserDeals(flag);
                        }}
                    />
                </Modal>
            </View>
        );
    }
}

