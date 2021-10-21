import React, {useState,useEffect} from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Actions/Auth';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import firestore from '@react-native-firebase/firestore';
import AppColors from '../../utills/AppColors';
import BGImage from '../../assets/images/f.jpg'
import { questions, randomQuestions } from '../../Redux/Actions/Question';
export default function Dashboard({navigation}) {
  const scores = useSelector((state) => state.Score.scores);
  const [loading, setLoading]= useState(false);
  const [quest, setQuest] = useState([]);
  const dispatch = useDispatch();
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
  const generate = () =>{
    var numbers = [0,1, 2, 3, 4,5,6,7,8,9,10];
    function shuffle(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    var randoms = shuffle(numbers);
    return randoms;
  }

  useEffect(async ()  => {
    await getQuestions();
    },[])
  const loginMethod = () => {
    setLoading(true);
    setTimeout(() =>{
    dispatch(questions(quest));
    var random = generate();
    dispatch(randomQuestions(random));
    navigation.navigate('Dashboard');
    setLoading(false);
  },1500)
  };
  return (
    <ScreenWrapper statusBarColor={AppColors.primary} backgroundImage={BGImage} 
    backgroundColor={AppColors.white} transclucent 
    barStyle="light-content">
      {!scores?
      <View style={styles.mainViewContainer}>
        <Button title="Start Quiz" isLoading={loading} onPress={loginMethod} />
      </View>
      :
      <View style={styles.mainViewContainer}>
        <View style={styles.questionBox}>
        <Text style={styles.yourScore}>Your Score</Text>
        <Text style={styles.score}>{scores}/50</Text>
        </View>
        <Button title="Start Again" isLoading={loading} onPress={loginMethod} />
      </View>}
    </ScreenWrapper>
  );
}
