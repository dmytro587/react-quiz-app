import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchQuizzes } from '../../redux/actions/quizList'
import Preloader from '../../components/Preloader/Preloader'
import * as S from './styles'

const QuizList = ({ quizzes, isLoading, fetchQuizzes }) => {

   useEffect(() => {
      fetchQuizzes()
   }, [fetchQuizzes])

   let quizList = null

   if (quizzes.length > 0) {
      quizList = quizzes.map(quiz => (
         <Link
            to={ `quiz/${quiz.id}` }
            key={ quiz.id }
         >
            { quiz.name }
         </Link>
      ))
   }

   if (isLoading) return <Preloader />

   return (
      <S.Wrapper>
         <S.Title>Список тестов</S.Title>
         <S.List>
            { quizList || <S.Empty>Список пуст</S.Empty> }
         </S.List>
      </S.Wrapper>
   )
}

const mapStateToProps = state => ({
   quizzes: state.quizList.quizzes,
   isLoading: state.quizList.isLoading
})

export default connect(
   mapStateToProps,
   { fetchQuizzes }
)(QuizList)