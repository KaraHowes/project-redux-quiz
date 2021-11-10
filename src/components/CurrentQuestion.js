import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from'styled-components'

import { quiz } from '../reducers/quiz'

const Main = styled.div `
  width: 90%;
  margin: 0 auto;  
`// This will style everything in this component
const Questiontext = styled.h1 `
  font-family:'Euphoria Script', cursive; 
  font-size: 50px;
  text-align: centre;` //This styles the H1 question
const Buttonssection = styled.section `
justify-items: centre;
` // Styles the button container
const Choice = styled.div `
  //display: inline;
  ` // styles the choice buttons
const Choicebutton = styled.button `
  width: 75%;
  margin: 15px;
  padding: 15px;
  border-radius: 20px;
  `// The actual answer buttons
const Nextbutton = styled.button `
  width: 30%;
  margin: 15px;
  padding: 15px;` // Styles the next button

const Chosenanswer = styled.span `
  color: white;
  font-size: 25px; 
  font-family: 'Redressed', cursive;
`// Styles the text on choice button

export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answers = useSelector((state) => state.quiz.answers)
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex)
  const dispatch = useDispatch()
  //const nextQuestion = useSelector((state) => state.quiz.goToNextQuestion)

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }
  const onAnswerSubmit = (id, index) => {dispatch(quiz.actions.submitAnswer({questionId:id, answerIndex: index}))}
  
  return (
    <Main>
      {/*{answers[currentQuestionIndex] ? answers[currentQuestionIndex].isCorrect : 'no answer'}*/}
      <Questiontext>Question: {question.questionText}</Questiontext>
      <Buttonssection>
          {question.options.map((item, index) => (
            <Choice>
              <Choicebutton
                key={item}
                onClick={() => onAnswerSubmit(question.id, index)}
                style={{backgroundColor: !answers ? '#EADCA6': index === question.correctAnswerIndex ? '#17D7A0' : '#B91646'  }}
              ><Chosenanswer>{item}</Chosenanswer> </Choicebutton> 
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

      
    </Main>
  )
 
}
