import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from '../reducers/quiz'


export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answers = useSelector((state) => state.quiz.answers)
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex)
  const dispatch = useDispatch()

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
        <button
          key={item}
          onClick={() => onAnswerSubmit(question.id, index)}
        >{item} </button>
      ))}
    </div>
  )
 
}
