import React, {useEffect, useState}from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import firestore from '@react-native-firebase/firestore';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import { totalScore } from '../../Redux/Actions/Score';
import BGImage from '../../assets/images/f.jpg';
let point = 0;
const generate = () =>{
  var numbers = [0,1, 2, 3, 4,5,6,7,8,9,10];
  function shuffle(o) {
      for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  };
  var randoms = shuffle(numbers);
  return randoms;
}
export default function Dashboard({navigation}) {
  // defined stats
  

  const [quest, setQuest] = useState([]);
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
const getQuestions = async () =>{
  let list =[];
  //const QuerySnap = 
  await firestore().collection('Questions')
        .get().then((QuerySnapshot) =>{
          QuerySnapshot.forEach((doc) => {
            const {
              qID,
              qn,
              op1,
              op2,
              op3,
              op4,
              ans
            } = doc.data();
            list.push({
              id:doc.id,
              qID,
              qn,
              op1,
              op2,
              op3,
              op4,
              ans
            })
        }); 
      });
      setQuest(list);
}  



useEffect(async ()  => {
  await getQuestions();
  dispatch(setLoaderVisible(false));
  },[])
  const initialLoad=async()=>{
    let da= await  genRan();
      setFocusQuestion(quest[da]);
    }
  
  if(!focusQuestion){
    setTimeout(initialLoad,10);
  }


// generate random questions
const genRan = () =>{
  
   var random = generate();
  console.log(random);
  if( random.length >= 0 ) {
    var num= random.pop();
    console.log(num)
    return num
  }
  // let min=0;
  // let max=11;

  // let ran= Math.floor(Math.random() * (max - min + 1) ) + min;
  // return ran;
}

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
        navigation.navigate('Score');
        setCount(0);
      }else{
        checkAnswer();
        let da=   genRan();
        setFocusQuestion(quest[da]);
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