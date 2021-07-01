
//================================ React Native Imported Files ======================================//
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {Platform, StyleSheet} from "react-native";
import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainCotainer:
        {
            flex: 1,

        },
    headerCotainer: {
        flex: 0.1,
    },
    BottomCotainer: {
        flex: 0.9,
    },
    mapView: {
        flex: 0.9,

    },
    mapStyles:
        {

            height: '100%',
            width: '100%',
        },
    bottomtext:
        {
            height: Platform.OS === 'ios' ? hp(10.5) : hp(12),
            width: '95%',
            alignSelf: "center",
            marginHorizontal: '5%',
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? wp(5) : wp(8),
            elevation: 1,
            borderRadius: wp(2),
            backgroundColor: colors.white,
            justifyContent: "center",
            // alignItems: "center"
            paddingLeft:Platform.OS === 'ios' ? '5%' : '2%'

        },

    titleTouchItem:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.app_header_color,
        paddingBottom:'1%'
    },
    infoText:{
        fontSize:wp(3.4),
        fontWeight:'bold',
        color:colors.app_dark_grey,
        paddingLeft:'2%',
        paddingRight:"2%"
    },
    iconInfo:{
        height: wp(4),
        width: wp(4),
        resizeMode:'contain'
    },
    viewInfo:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:'1.5%'
    },

    summaryItem:{
        height: hp(7.5),
        width: wp(94),
        backgroundColor:colors.white,
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:'5%',
        // marginTop:10,
        paddingVertical:'2%',
        borderRadius:wp(2),
        position: 'absolute',
        bottom: wp(30),
        elevation: 1,
    },
    title:{
        fontSize:wp(4.2),
        fontWeight:'bold',
        color:colors.app_dark_grey
    },
    subTitle:{
        fontSize:wp(3.7),
        fontWeight:'400',
        color:colors.app_dark_grey,
        paddingTop:'0.5%'
    },
    priceText:{
        fontSize:wp(5),
        fontWeight:'bold',
        color:colors.app_red
    },
    viewMarker:{
        height:wp(70),
        width:wp(70),
        alignItems:'center',
        justifyContent:'center',
        left: wp(15.5),
        position: 'absolute',
        borderRadius:wp(70),
        top:Platform.OS === 'ios' ? hp(20) : hp(10),
        backgroundColor:'rgba(129,207,224,0.4)'
    },
    iconMarker:{
        height:30,
        width:30,
        resizeMode:'contain',
        marginTop:7,
    },
});
export default Styles;
