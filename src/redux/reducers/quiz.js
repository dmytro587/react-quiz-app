import {
   FETCH_QUIZ_ERROR,
   FETCH_QUIZ_START,
   FETCH_QUIZ_SUCCESS,
   FINISH_QUIZ,
   NEXT_QUESTION,
   REPEAT_QUIZ, RESET_QUIZ
} from '../actionTypes/quiz'

const initialState = {
   id: 1,
   isFinished: false,
   currentQuestion: 0,
   results: [],
   quiz: {
      quizName: '',
      questions: []
   },
   isLoading: false,
   error: null
}

const quizReducer = (state = initialState, action) => {
   switch (action.type) {

      case NEXT_QUESTION :
         return {
            ...state,
            currentQuestion: state.currentQuestion + 1,
            results: [ ...state.results, action.payload ]
         }

      case FINISH_QUIZ :
         return {
            ...state,
            isFinished: true,
            results: [ ...state.results, action.payload ]
         }

      case REPEAT_QUIZ :
         return {
            ...state,
            results: [],
            currentQuestion: 0,
            isFinished: false
         }

      case RESET_QUIZ :
         return {
            ...state,
            results: [],
            currentQuestion: 0,
            isFinished: false,
            quiz: {
               quizName: '',
               questions: []
            }
         }

      case FETCH_QUIZ_START :
         return { ...state, isLoading: true }

      case FETCH_QUIZ_SUCCESS :
         return {
            ...state,
            isLoading: false,
            quiz: action.payload
         }

      case FETCH_QUIZ_ERROR :
         return {
            ...state,
            isLoading: false,
            error: action.payload
         }

      default :
         return state
   }
}

export default quizReducer