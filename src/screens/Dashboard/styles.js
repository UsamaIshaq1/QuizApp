import {StyleSheet} from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText:{
    textAlign:'center',
    color: AppColors.white,
    fontSize:height(2.4),
  },
  answerText:{
    textAlign:'center',
    color: AppColors.white,
    fontSize:height(2.5),
  },
  answerBox:{
    backgroundColor:AppColors.primary,
    justifyContent:'center',
    borderColor:AppColors.white,
    borderTopRightRadius:width(5),
    borderBottomLeftRadius:width(5),
    width:width(70),
    height:height(8),
    margin:width(2.5),
  },
  questionBox:{
    backgroundColor:AppColors.primary,
    justifyContent:'center',
    borderColor:AppColors.white,
    borderTopRightRadius:width(5),
    borderBottomLeftRadius:width(5),
    width:width(85),
    height:height(20),
    margin:width(2.5),
    padding:width(.6)
  }
});
export default styles;
