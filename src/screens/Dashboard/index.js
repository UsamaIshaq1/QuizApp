import React, {useEffect, useState}from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { totalScore } from '../../Redux/Actions/Score';
import BGImage from '../../assets/images/f.jpg';

let point = 0;
let da=0;
export default function Dashboard({navigation}) {
  // defined stats
  const quest = useSelector((state) => state.Questions.questions);
  const ran = useSelector((state) => state.Questions.randomQuestions);

  const [focusQuestion, setFocusQuestion] = useState(null);
  const [count, setCount] = useState(0);
  const [selectedAnswer,setSelectedAnswer]= useState(null);
  const [loading, setLoading]= useState(false);

  const dispatch = useDispatch();

  // const logoutMethod = async () => {
  //   showMessage({
  //     message: 'Logged Out',
  //     description: 'Succfully logged out',
  //     type: 'danger',
  //   });
  //   dispatch(logout());
  // };

  // get data  from firebase



useEffect(async ()  => {
  initialLoad();
  },[])
  const initialLoad=()=>{
      setFocusQuestion(quest[ran[da]]);
    }


// generate random questions

// check for answer
const checkAnswer =() =>{  
  
  if(selectedAnswer===focusQuestion.ans){
    point=point+10;
  }
  setSelectedAnswer(null);
}

    const setQuestion = async () => {
      
      setLoading(true);
      setTimeout(() =>{
      if(!selectedAnswer){Alert.alert("Please select an answer first");
      setLoading(false);}
      else{
        
      if(count>=4){
        checkAnswer();
        dispatch(totalScore(point));
        point=0;
        da=0;
        navigation.navigate('Login');
        setCount(0);
      }else{
        checkAnswer();
        da=da +1;
        setFocusQuestion(quest[ran[da]]);
      }
      setCount(count+1); 
    }
    
    setLoading(false);
    },1000)

    }
  


  return (
    
    <ScreenWrapper  transclucent
     statusBarColor={AppColors.primary}
     backgroundColor={AppColors.white}
     backgroundImage={BGImage}
     barStyle="light-content" >
       
      <View style={styles.mainViewContainer}>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{focusQuestion?.qn}</Text>
        </View>
        <View style={{alignContent:'center', marginBottom:10}}> 
        <TouchableOpacity  style={[styles.answerBox,{backgroundColor:selectedAnswer===focusQuestion?.op1?AppColors.secondry:AppColors.primary}]} onPress={() => {setSelectedAnswer(focusQuestion?.op1)}}>
          <Text style={styles.answerText}>{focusQuestion?.op1}</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.answerBox,{backgroundColor:selectedAnswer===focusQuestion?.op2?AppColors.secondry:AppColors.primary}]}onPress={() => {setSelectedAnswer(focusQuestion?.op2)}}>
          <Text style={styles.answerText}>{focusQuestion?.op2}</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.answerBox,{backgroundColor:selectedAnswer===focusQuestion?.op3?AppColors.secondry:AppColors.primary}]} onPress={() => {setSelectedAnswer(focusQuestion?.op3)}}>
          <Text style={styles.answerText}>{focusQuestion?.op3}</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.answerBox,{backgroundColor:selectedAnswer===focusQuestion?.op4?AppColors.secondry:AppColors.primary}]} onPress={() => {setSelectedAnswer(focusQuestion?.op4)}}>
          <Text style={styles.answerText}>{focusQuestion?.op4}</Text>
        </TouchableOpacity>
        </View>
        <Button 
          title="Next" 
          containerStyle={{width:width(35),
          height:height(6.5)}} 
          isLoading={loading}
          onPress={() => setQuestion()} 
        />
      </View>
      
    </ScreenWrapper>
    
  
  );
}