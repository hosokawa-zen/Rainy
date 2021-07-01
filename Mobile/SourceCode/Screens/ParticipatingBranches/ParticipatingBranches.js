//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
import { StatusBar, View, Text,Image , TouchableHighlight} from 'react-native';

//================================ Local Imported Files ======================================//

import CommanFlatList from '../../Components/CommanFlatList/View';
import AppHeader from '../../Components/AppHeader/AppHeader';
import images from '../../Assets/Images/images';
import MapView,{Marker} from 'react-native-maps';
import styles from './style';
import colors from '../../Assets/Colors/colors';
import Geolocation from '@react-native-community/geolocation';

export default class ParticipatingBranches extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            position: {
                lat: 0,
                lng: 0,
            },
            location: ''
        }
        
        Geolocation.getCurrentPosition(
            position => {
                console.log(position)
                this.setState({position: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }});
                this.fitMarkers();
            },
            error => {
                console.log('Error', JSON.stringify(error))
                this.fitMarkers();
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    fitMarkers = () => {
        var tempMarkers = [];
        console.log(this.props.route.params.deal)
        this.props.route.params.deal.branchs.forEach(marker => {
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

        const DEFAULT_PADDING = { top: 60, right: 60, bottom: 60, left: 60 };
        this.map.fitToCoordinates(tempMarkers, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
    }

    markerClick = (branch) => {
        console.log(branch)
        this.setState({location: `latitude: ${branch.lat.toFixed(5)}, longitude: ${branch.lng.toFixed(5)}`})
        console.log(this.state.location)
    }

    render() {
        const branchElements = this.props.route.params.deal.branchs ? this.props.route.params.deal.branchs.map((branch, index) => (
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
        
        const infowindow = this.state.location != '' ? <View style={styles.bottomtext}>
                <Text style={styles.titleTouchItem}>{this.props.route.params.deal.subTitle}</Text>
                <View style={styles.viewInfo}>
                    <Image style={[styles.iconInfo,]} source={images.ic_marker_map} />
                    <Text style={styles.infoText}>{this.props.route.params.deal.address}</Text>
                </View>
                <View style={styles.viewInfo}>
                    <Image style={[styles.iconInfo,{height:wp(3),width:wp(4)}]} source={images.ic_time} />
                    <Text style={styles.infoText}>{this.state.location}</Text>
                </View>
            </View> : <View />
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
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        leftIconPath={images.headerLeftBack}
                        title={'Participating Branches'}
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
                            branchElements
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
                    {/* <View  style={styles.viewMarker}>
                        <Image style={styles.iconMarker} source={images.ic_location_map}/>
                    </View> */}
                    
                </View>
                {
                    infowindow
                }
            </View>
        );
    }
}
