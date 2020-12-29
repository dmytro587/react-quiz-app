import AuthForm from '../../components/AuthForm/AuthForm'
import * as S from './styles'
import { connect } from 'react-redux'
import { auth } from '../../redux/actions/auth'

const Auth = ({ auth }) => {
   return (
      <div>
         <S.Title>Авторизация</S.Title>
         <AuthForm auth={ auth } />
      </div>
   )
}

const mapDispatchToProps = {
   auth
}

export default connect(
   null,
   mapDispatchToProps
)(Auth)