import QuizCreatorForm from '../../components/QuizCreatorForm/QuizCreatorForm'
import * as S from './styles'
import { connect } from 'react-redux'
import { createQuiz } from '../../redux/actions/quiz'

const QuizCreator = ({ createQuiz }) => {
   return (
      <S.Wrapper>
         <S.Title>Создание теста</S.Title>
         <QuizCreatorForm createQuiz={ createQuiz } />
      </S.Wrapper>
   )
}

export default connect(
   null,
   { createQuiz }
)(QuizCreator)