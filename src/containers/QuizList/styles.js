import styled from 'styled-components'
import { darken } from 'polished'

export const Wrapper = styled.div`
  margin-top: -150px;
  color: #fff;
`

export const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
`

export const List = styled.div`
  a {
    display: block;
    margin-bottom: 10px;
    font-size: 1.3rem;
    text-decoration: none;
    color: inherit;
    transition: color .1s ease;
    
    &:hover {
      color: ${ darken(.2, '#fff') }
    }
  }
`