import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from '../reducers/quiz'


export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answers = useSelector((state) => state.quiz.answers)
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex)
  const dispatch = useDispatch()
  //const correct = useSelector((state) => state.answers.isCorrect)||false 

  const nextQuestion = useSelector((state) => state.quiz.goToNextQuestion)
  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }
  const onAnswerSubmit = (id, index) => {dispatch(quiz.actions.submitAnswer({questionId:id, answerIndex: index}))}
  
  return (
    <div>
      {answers[currentQuestionIndex] ? answers[currentQuestionIndex].isCorrect : 'no answer'}
      
     <button 
     disabled={!answers[currentQuestionIndex]} 
     onClick={() => dispatch(quiz.actions.goToNextQuestion())}> Next Question</button>
      <h1>Question: {question.questionText}</h1>
      {question.options.map((item, index) => (
        <>
        <button
          key={item}
          onClick={() => onAnswerSubmit(question.id, index)}
          style={{backgroundColor: !answers ? '#EADCA6': index === question.correctAnswerIndex ? '#17D7A0' : '#B91646'  }}
        >{item} </button> 
       
</>
      )
      )}

       <div>
        {answers[currentQuestionIndex]  
          ? answers[currentQuestionIndex].isCorrect 
            ? <p>It's Correct</p>
            : <p>Not correct</p>
          :<p>Waiting for the answer</p>}
        </div>

      
    </div>
  )
 
}
