import { createSlice } from '@reduxjs/toolkit'

// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText: 'Which one of these things were invented in year 1970?',
    options: ['The post-it notes', 'Walkman', 'Videocassette', 'The floppy disk'],
    correctAnswerIndex: 3
  },
  {
    id: 2,
    questionText: 'What year was Apple founded?',
    options: ['1974', '1976', '1979', '1973'],
    correctAnswerIndex: 1
  },

  {
    id: 3,
    questionText: 'Why did president Nixon resign from office in 1974?',
    options: ['He suffered from dementia', 'He wanted to spend more time with his family', 'Watergate', 'Because of a love affair'],
    correctAnswerIndex: 2
  },

  {
    id: 4,
    questionText: 'Which year did Abba win the Eurovision song contest with “Waterloo”?',
    options: ['1972', '1974', '1976', '1978'],
    correctAnswerIndex: 1
  },

  {
    id: 5,
    questionText: 'What is the name of the most hyped night club in the late 1970-ies?',
    options: ['Studio 54', 'Studio 56', 'Studio 51', 'Studio 53'],
    correctAnswerIndex: 0
  }
]

const initialState = {
  questions,
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