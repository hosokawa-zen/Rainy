//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

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
    selectView:{
        flex:0.035,
        backgroundColor:colors.app_header_color,
        alignItems:'center',
    },
    textSelect:{
        color:colors.white
    },
    flatView:{
        flex:0.596,
        // backgroundColor: 'green'
    },
    summaryView:{
        flex:0.25,
        // backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'

    },
    summaryItem:{
        height: hp(17),
        width: wp(96),
        backgroundColor:colors.white,
        alignSelf:'center',
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal:'5%',
        // marginTop:10,
        paddingVertical:'2%',
        borderRadius:wp(3)
    },
    viewTotal:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titlePayment:{
        fontSize:wp(4.2),
        fontWeight:'bold',
        color:colors.app_header_color
    },
    subTitle:{
        fontSize:wp(3.8),
        fontWeight:'bold',
        color:colors.black
    },
    buttonView:{
        flex:0.15,
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardContainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(12),
        paddingHorizontal: wp(5)
    },
    cardBtnContainer: {
        height: hp(30),
    }

});
export default Styles;
