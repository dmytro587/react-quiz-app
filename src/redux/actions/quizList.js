import { apiQuiz } from '../../api/api'
import { FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS } from '../actionTypes/quizList'

const fetchQuizzesStart = () => ({ type: FETCH_QUIZZES_START })
const fetchQuizzesSuccess = quizzes => ({ type: FETCH_QUIZZES_SUCCESS, payload: quizzes })
const fetchQuizzesError = error => ({ type: FETCH_QUIZZES_ERROR, payload: error })

export const fetchQuizzes = () => async dispatch => {
   dispatch(fetchQuizzesStart())
   try {
      const response = await apiQuiz.fetchQuizzes()
      const quizzes = []

      Object.keys(response).forEach(key => {
         quizzes.push({
            id: key,
            name: response[key].quizName
         })
      })

      dispatch(fetchQuizzesSuccess(quizzes))
   } catch (e) {
      dispatch(fetchQuizzesError(e))
   }
}