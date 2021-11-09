import { createSlice } from '@reduxjs/toolkit'

// Change these to your own questions!


const initialState = {
  questions: [
    { id: 1, questionText: 'In order of birth, who are the seven Weasley siblings?', 
      options: ['Percy, Bill, George, Charlie, Fred, Ron, Ginny', 
                'George, Fred, Percy, Bill, Charlie, Ron, Ginny', 
                'Bill, Charlie, Percy, Fred, George, Ron, Ginny'], 
      correctAnswerIndex: 2 },
    { id: 2, questionText: 'What is the only book in the Harry Potter series that does not feature Lord Voldemort?', 
      options: ['The Sorceres Stone', 
                'The Prisoner of Akzaban', 
                'The Deathly Hallows'], 
      correctAnswerIndex: 1 },
      { id: 3, questionText: 'Who is Scabbers the Rat?', 
      options: ['Peter Pettigrew', 
                'Remus Lupin', 
                'Sirius Black'], 
      correctAnswerIndex: 0 },
      { id: 4, questionText: 'Which Harry Potter word is now in the Oxford English Dictionary?', 
      options: ['Voldemort', 
                'Hogwarts',
                'Muggle'], 
      correctAnswerIndex: 2 },
      { id: 5, questionText: 'Which of these Hogwarts Professors teaches Transfiguration?', 
      options: ['Professor Snape', 
                'Professor McGonagall',
                'Professor Sprout'], 
      correctAnswerIndex: 1 },
      { id: 6, questionText: 'Who invented the spell Sectumsempra?', 
      options: ['Professor Snape', 
                'Miranda Goshawk',
                'Lord Voldemort'], 
      correctAnswerIndex: 0 },
      { id: 7, questionText: 'Who is Nagini?', 
      options: ["Hermione's Cat", 
                "Ron's Owl",
                "Lord Voldemort's Snake"], 
      correctAnswerIndex: 2 },
      { id: 8, questionText: 'How many players are there in a Quidditch team?', 
      options: ["7", 
                "8",
                "9"], 
      correctAnswerIndex: 0 }
  ],
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      console.log('State: ', state);
			console.log('Action: ', action);

      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
     
    },


    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})
