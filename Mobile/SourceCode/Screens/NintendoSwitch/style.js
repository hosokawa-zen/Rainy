//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet,Platform} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:colors.app_dark_white
    },
    headerContainer: {
        flex: 0.1,
    },
    container: {
        flex: 0.9,
    },
    image:{
        height: '85%',
        width: '85%',
        resizeMode:'contain'
    },
    imageView:{
        height: hp(28),
        width:wp(92),
        backgroundColor:colors.white,
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        marginTop: wp(2.5),
        borderRadius:wp(3)

    },
    contentView:{
        // height: hp(59),
        // backgroundColor: 'orange',
        alignItems: 'center',
        // justifyContent: 'center'

    },
    summaryItem:{
        height: hp(9),
        width: wp(92),
        backgroundColor:colors.white,
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:'5%',
        marginTop:wp(2.5),
        paddingVertical:'2%',
        borderRadius:wp(3)
    },
    dealLeftView:{
        height:Platform.OS === 'ios' ?  hp(13) : hp(16),
        width: wp(92),
        backgroundColor:colors.white,
        alignSelf:'center',
        paddingHorizontal:'5%',
        paddingVertical:'2%',
        paddingTop:'4%',
        borderRadius:wp(3),
        marginTop:wp(2.5)
    },
    title:{
        fontSize:wp(4.2),
        fontWeight:'bold',
        color:colors.app_dark_grey
    },
    subTitle:{
        fontSize:wp(3.5),
        fontWeight:'400',
        color:colors.app_dark_grey,
        paddingTop:'0.5%'
    },
    subLittleTitle:{
        fontSize:wp(3),
        fontWeight:'400',
        color:colors.app_dark_grey,
    },
    subTinyTitle:{
        fontSize:wp(2.5),
        fontWeight:'400',
        color:colors.app_dark_grey,
    },
    CodeView:{
        height:Platform.OS=== 'ios' ? hp(15):hp(19),
        width: wp(92),
        backgroundColor:colors.white,
        alignSelf:'center',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal:'5%',
        marginTop:wp(2.5),
        paddingVertical:'2%',
        borderRadius:wp(3)
    },
    dealDescriptionView:{
        height:Platform.OS=== 'ios' ? hp(15):hp(17),
        width: wp(92),
        backgroundColor:colors.white,
        alignSelf:'center',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal:'5%',
        marginTop:wp(2.5),
        paddingVertical:'2%',
        borderRadius:wp(3)
    },
    viewContact:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical:'2.5%'
    },
    dealText:{
        fontSize:wp(3.5),
        fontWeight:'bold',
        color:colors.app_dark_grey,
        paddingTop: '4%'

    },
    infoText:{
        fontSize:wp(3.4),
        fontWeight:'bold',
        color:colors.app_dark_grey,
        paddingLeft:'2%'
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
    img:{
        height: wp(12),
        width: wp(15),
        resizeMode:'contain'
    },
    viewTotal:{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    priceText:{
        fontSize:wp(5.8),
        fontWeight:'bold',
        color:colors.app_red
    },

    toggleItem: {
        width: wp(92),
        flex: 1
    },

    touchItem:{
        height: hp(7),
        width: wp(92),
        backgroundColor:colors.white,
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:'5%',
        marginTop:10,
        borderRadius:wp(2),
    },
    titleTouchItem:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.app_header_color,
    },
    arrowUp:{
        height:14,
        width:14,
        resizeMode: 'contain',
    },
    buttonView:{
        height: Platform.OS === 'ios' ? hp(10) : hp(20),
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:'2%'
    },
    addIcon:{
        height: wp(5),
        width: wp(5),
        resizeMode:'contain'
    },
    addView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:'22%'
    },
    addText:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.black
    },
    quantityTextView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dealQuantityView:{
        height: hp(12),
        width: wp(92),
        backgroundColor:colors.white,
        alignSelf:'center',
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal:'5%',
        marginTop:wp(2.5),
        paddingVertical:'2%',
        borderRadius:wp(3)
    }
    

});

export default Styles;
