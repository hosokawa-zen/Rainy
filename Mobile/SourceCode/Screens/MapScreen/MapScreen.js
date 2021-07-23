//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
import {StatusBar, View, Text, Image, TouchableOpacity} from 'react-native';

//================================ Local Imported Files ======================================//

import CommanFlatList from '../../Components/CommanFlatList/View';
import AppHeader from '../../Components/AppHeader/AppHeader';
import images from '../../Assets/Images/images';
import MapView,{Marker} from 'react-native-maps';
import styles from './style';
import colors from '../../Assets/Colors/colors';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';

import RNProgressHud from 'progress-hud';
import { Alert } from 'react-native';

export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            PriceView:false,
            markers: [],
            price: "",
            name: "",
            brand: "",
            address: "",
            position: {
                lat: 0,
                lng: 0,
            },
            deal: {},
            location: ''
        }
        RNProgressHud.showWithStatus('Loading...')

        Geolocation.getCurrentPosition(
            position => {
                console.log(position)
                this.setState({position: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }});
                this.getPromotion();
            },
            error => {
                console.log('Error', JSON.stringify(error))
                this.getPromotion();
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );

        this.promotions = [];

    }

    getPromotion = () => {
        try {
            database().ref(`promotions/`).once('value').then(snapshot => {
                if (snapshot.exists()) {
                    const markers = [];
                    this.promotions = snapshot.val();

                    database().ref("/transactions").on('value', snapshot1 => {
                        var transactions = [];
                        if (snapshot1.exists()) {
                            transactions = snapshot1.val()
                        }

                        database().ref(`business/`).once('value').then(snapshot2 => {
                            var business = [];
                            if (snapshot2.exists()) {
                                business = snapshot2.val();
                            }
                            Object.keys(this.promotions).map((key) => {
                                let deal = this.promotions[key];
                                var sellCount = 0;
                                Object.keys(transactions).map(transKey => {
                                    const transaction = transactions[transKey];
                                    if (transaction.promotio_id == key) {
                                        sellCount = sellCount + transaction.amount;
                                    }
                                })

                                deal.paidCount = sellCount;

                                if (deal.branchs) {
                                    var subTitle = "";
                                    if (business && business[deal.userBusinessId]) {
                                        subTitle = business[deal.userBusinessId].name
                                        console.log(subTitle)
                                        deal.subTitle = subTitle;
                                    }


                                    Object.keys(deal.branchs).map((branchKey) => {
                                        const branch = deal.branchs[branchKey];
                                        markers.push({
                                            lat: branch.lat,
                                            lng: branch.lng,
                                            address: branch.address,
                                            deal,
                                        })
                                    })
                                }
                            })
                            this.setState({markers: markers})

                            var tempMarkers = [];
                            this.state.markers.forEach(marker => {
                                tempMarkers.push({
                                    latitude: marker.lat,
                                    longitude: marker.lng,
                                })
                            })

                            if (this.state.position.lat != 0 && this.state.position.lng != 0) {
                                tempMarkers.push({
                                    latitude: this.state.position.lat,
                                    longitude: this.state.position.lng,
                                })
                            }

                            console.log(tempMarkers);

                            const DEFAULT_PADDING = {top: 60, right: 60, bottom: 60, left: 60};
                            this.map.fitToCoordinates(tempMarkers, {
                                edgePadding: DEFAULT_PADDING,
                                animated: true,
                            });
                            RNProgressHud.dismiss()
                        })
                    });
                }
            })
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    markerClick = (marker) => {
        const deal = marker.deal;
        this.setState({price: deal.promotionPrice})
        this.setState({name: deal.name})
        this.setState({brand: deal.subTitle})
        this.setState({address: marker.address})
        this.setState({PriceView: true})
        this.setState({deal: deal})
        this.setState({location: `latitude: ${marker.lat.toFixed(5)}, longitude: ${marker.lng.toFixed(5)}`})
    }

    render() {
        const markerElements = this.state.markers? this.state.markers.map((branch, index) => (
            <Marker
                coordinate={{
                    latitude: branch.lat,
                    longitude: branch.lng,
                }}
                key = {index}
                onPress={() => {this.markerClick(branch);}}
                onSelect={() => {
                    this.markerClick(branch);
                }}
            >

                <Image source={images.ic_map_icon} style={{ height: wp(20), width: wp(20), resizeMode: 'contain' }} />
            </Marker>
          )) : <View />;
        return (
            <View style={styles.mainCotainer}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    // backgroundColor={colors.AppRedColor}
                    translucent={false}
                />

                <View style={styles.headerCotainer}>
                    <AppHeader
                        onLeftIconPress={() => this.props.navigation.openDrawer()}
                        leftIconPath={images.ic_hamburger_menu}
                        title={'Map'}
                    />
                </View>
                <View style={styles.mapView}>
                    <MapView
                        ref={ref => {
                            this.map = ref;
                        }}
                        style={styles.mapStyles}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {
                            markerElements
                        }
                         <Marker
                            coordinate={{
                                latitude: this.state.position.lat,
                                longitude: this.state.position.lng,
                            }}
                        >
                            <Image source={images.ic_location_map} style={{ height: wp(8), width: wp(8), resizeMode: 'contain' }} />
                        </Marker>
                    </MapView>
                    {/* <TouchableOpacity  style={styles.viewMarker} onPress={() => this.setState({PriceView:true})}>
                        <Image style={styles.iconMarker} source={images.ic_location_map}/>
                    </TouchableOpacity> */}
                </View>
                {this.state.PriceView &&
                <TouchableOpacity style={[styles.summaryItem]} onPress={() => {
                    if (this.props && this.props.navigation) {
                        this.props.navigation.navigate('NintendoSwitch',{fromBrowse:true, item: {
                            deal: this.state.deal
                        }})
                    }
                } }>
                    <View style={styles.viewTotal}>
                        <Text style={styles.title}>{this.state.name}</Text>
                        {/* <Text style={[styles.subTitle]}>{this.state.brand}</Text> */}
                    </View>
                    <Text style={styles.priceText}>{`$${this.state.price}`}</Text>
                </TouchableOpacity> }
                {this.state.PriceView &&
                    <View style={[styles.bottomtext]}>
                        <Text style={styles.titleTouchItem}>{this.state.brand}</Text>
                        <View style={styles.viewInfo}>
                            <Image style={[styles.iconInfo,]} source={images.ic_marker_map} />
                            <Text style={styles.infoText}>{this.state.address}</Text>
                        </View>
                        <View style={styles.viewInfo}>
                            <Image style={[styles.iconInfo,{height:wp(3),width:wp(4)}]} source={images.ic_time} />
                            <Text style={styles.infoText}>{this.state.location}</Text>
                        </View>
                    </View>
                }

            </View>
        );
    }
}
