import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from'styled-components'

import { quiz } from '../reducers/quiz'


const Buttonssection = styled.section `
justify-items: centre;
`
const Choice = styled.div `
  display: inline;
  `
const Choicebutton = styled.button `
  width: 25%;
  margin: 15px;
  padding: 15px;
  `
const Nextbutton = styled.button `
  width: 30%;
  margin: 15px;
  padding: 15px;`

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
      {/*{answers[currentQuestionIndex] ? answers[currentQuestionIndex].isCorrect : 'no answer'}*/}
      <h1>Question: {question.questionText}</h1>
      <Buttonssection>
          {question.options.map((item, index) => (
            <Choice>
              <Choicebutton
                key={item}
                onClick={() => onAnswerSubmit(question.id, index)}
                style={{backgroundColor: !answers ? '#EADCA6': index === question.correctAnswerIndex ? '#17D7A0' : '#B91646'  }}
              >{item} </Choicebutton> 
            </Choice>
          ))}
          <Nextbutton 
          disabled={!answers[currentQuestionIndex]} 
          onClick={() => dispatch(quiz.actions.goToNextQuestion())}> Next Question</Nextbutton>
        
      </Buttonssection>
      
       <div>
        {answers[currentQuestionIndex]  
          ? answers[currentQuestionIndex].isCorrect 
            ? <p>Woohoo! It's Correct</p>
            : <p>Oh no.... It's not correct</p>
          :<p>Waiting for the answer</p>}
        </div>

      
    </div>
  )
 
}
