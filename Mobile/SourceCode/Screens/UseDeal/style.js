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
      resizeMode:'cover'
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
        height: hp(32),
        // backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'

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
        marginTop:Platform.OS === 'ios' ? 0 : wp(8),
        paddingVertical:'2%',
        borderRadius:wp(3)
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
    CodeView:{
        height: Platform.OS === 'ios' ? hp(19) :hp(23),
        width: wp(92),
        backgroundColor:colors.white,
        alignSelf:'center',
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal:'5%',
        marginTop:wp(2.5),
        paddingVertical:'2%',
        borderRadius:wp(3)
    },
    dealText:{
        fontSize:wp(3.5),
        fontWeight:'bold',
        color:colors.app_dark_grey,
        paddingTop: '4%'

    },
    codeText:{
        fontSize:wp(6),
        fontWeight:'bold',
        color:colors.app_header_color,
        paddingTop: '3%'

    },
    validText:{
        fontSize:wp(3.4),
        fontWeight:'bold',
        color:colors.app_dark_grey,
        textAlign:'center',
        width:'90%',
        paddingTop: '7%'
    },
    viewTotal:{
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
    },
    priceText:{
        fontSize:wp(5),
        fontWeight:'bold',
        color:colors.app_red
    },
    buttonView:{
        height: hp(29),
        // backgroundColor: 'blue',
        alignItems: 'center',
        // justifyContent: 'center'
        paddingTop:'10%'
    }


});
export default Styles;
