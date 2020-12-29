import { Wrapper } from './styles'
import { NavLink } from 'react-router-dom'
import Backdrop from '../Backdrop/Backdrop'
import { Fragment } from 'react'

const Drawer = ({ isOpen, onClose, isAuthorized }) => {

   let links = []

   if (isAuthorized) {
      links = [
         { text: 'Создать тест', to: '/create-quiz', exact: false },
         { text: 'Список тестов', to: '/quiz-list', exact: false },
         { text: 'Выйти', to: '/logout', exact: false },
      ]
   } else {
      links = [
         { text: 'Авторизация', to: '/auth', exact: false }
      ]
   }

   const linkList = links.map((link, index) => (
      <NavLink
         onClick={ onClose }
         key={ index }
         to={ link.to }
      >
         { link.text }
      </NavLink>
   ))

   return (
      <Fragment>
         { isOpen && <Backdrop onClick={ onClose } /> }
         <Wrapper isOpen={ isOpen }>
            { linkList }
         </Wrapper>
      </Fragment>
   )
}

export default Drawer