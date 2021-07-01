//================================ React Native Imported Files ======================================//
import { StyleSheet } from "react-native";
import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.app_background
    },
    image:{
        height:'70%',
        width:'70%',
        resizeMode:'contain'
    }
});
export default Styles;
