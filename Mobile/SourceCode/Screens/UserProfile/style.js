import {Platform, StyleSheet} from 'react-native';
import colors from "../../Assets/Colors/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles= StyleSheet.create({
    mainContainer:{
        flex:1,
        // alignItems:'center',
        backgroundColor: colors.app_header_color,
    },
    headerView:{
        flex: 0.1,
        // backgroundColor: 'green',
    },
    bottomContainer:{
        flex: 0.9,
        // backgroundColor:colors.app_header_color
    },
    viewImage:{
        flex:0.35,
        // backgroundColor:'blue',
        // flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    img:{
        height: Platform.OS === 'ios' ? wp(35) : wp(32),
        width:Platform.OS === 'ios' ? wp(35) : wp(32),
        resizeMode:'cover',
        borderRadius: Platform.OS === 'ios' ? wp(17.5) : wp(16),
    },
    iconMarker:{
        height: 16,
        width:16,
        resizeMode:'contain'
    },
    infoView:{
      flexDirection: 'row',
      alignItems:'center',
        paddingTop:Platform.OS === 'ios' ?'1%' : 0
    },
    userName:{
        textAlign: 'center',
        fontSize:wp(4.6),
        fontWeight:'bold',
        color:colors.app_button_color,
        paddingVertical:Platform.OS === 'ios' ?'2%' : '0.5%'
    },
    addressText:{
        fontSize:wp(3.7),
        fontWeight:'500',
        color:colors.app_light_blue,
        paddingLeft: '1%',
    },
    viewText:{
        paddingTop: wp(6),
        // paddingLeft:'5%'
    },
    viewInfo:{
        flex:0.65,
        backgroundColor:colors.app_ruby,
        // borderTopLeftRadius:wp(15),
    },
    viewTabs:{
        flex: Platform.OS === 'ios' ? 0.116 : 0.12,
        backgroundColor:colors.white,
    },
    viewContent:{
        flex:Platform.OS === 'ios' ? 0.884 : 0.883,
        backgroundColor:colors.app_dark_white,
    },
    touchItem:{
        height: hp(7),
        width: wp(96),
        backgroundColor:colors.white,
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:'5%',
        marginTop:10,
        borderRadius:wp(2)
    },
    expiredBackground: {
        backgroundColor: colors.white_dark
    },
    expiredDeal:{
        height: hp(7),
        width: wp(60),
        backgroundColor:colors.app_light_blue,
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:wp(10),
        borderRadius:wp(9),
    },
    icon:{
        height:16,
        width:16,
        resizeMode: 'contain',
        tintColor:colors.app_light_blue
    },
    arrowUp:{
        height:16,
        width:16,
        resizeMode: 'contain',
    },
    titleTouchItem:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.app_header_color,
    },
    reviewView:{
        height: hp(7),
        width: wp(90),
        backgroundColor:colors.white,
        alignSelf:'center',
        justifyContent:'center',
        paddingHorizontal:'5%',
        marginTop:14,
        borderTopLeftRadius: wp(2),
        borderTopRightRadius:wp(2),
    },
    titleReview:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.placeholder_color,
    },





});


export default styles;
