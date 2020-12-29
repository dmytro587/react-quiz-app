import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchQuizById, nextQuestion, repeatQuiz, resetQuiz } from '../../redux/actions/quiz'

import AnswerList from '../../components/AnswerList/AnswerList'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Preloader from '../../components/Preloader/Preloader'
import * as S from './styles'


const Quiz = ({
   questions,
   currentQuestion,
   nextQuestion,
   isFinished,
   results,
   quizName,
   repeatQuiz,
   resetQuiz,
   fetchQuizById,
   isLoading,
   history,
   match
}) => {

   useEffect(() => {
      fetchQuizById(match.params.id)

      return () => resetQuiz()
   }, [match.params.id, resetQuiz, fetchQuizById])

   if (isLoading || questions.length === 0) return <Preloader />

   return (
      <S.Wrapper>
         <S.Title>{ quizName }</S.Title>

         { isFinished
            ? <FinishedQuiz
                  results={ results }
                  questions={ questions }
                  repeatQuiz={ repeatQuiz }
                  history={ history }
              />
            : (
            <AnswerList
               question={ questions[currentQuestion].question }
               answers={ questions[currentQuestion].answers }
               questionsCount={ questions.length }
               currentQuestion={ currentQuestion + 1 }
               onAnswerClick={ nextQuestion }
            />
         ) }
      </S.Wrapper>
   )
}

const mapStateToProps = state => ({
   questions: state.quiz.quiz.questions,
   currentQuestion: state.quiz.currentQuestion,
   results: state.quiz.results,
   quizName: state.quiz.quiz.quizName,
   isFinished: state.quiz.isFinished,
   isLoading: state.quiz.isLoading
})

const mapDispatchToProps = {
   nextQuestion,
   repeatQuiz,
   fetchQuizById,
   resetQuiz
}

export default compose(
   withRouter,
   connect(
      mapStateToProps,
      mapDispatchToProps
   )
)(Quiz)