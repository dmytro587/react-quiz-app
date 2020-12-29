import styled from 'styled-components'
import { Field } from 'formik'

export const StyledField = styled(Field)`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  display: block;
  border-radius: 4px;
  border: 2px solid ${ ({ $isInvalid }) => $isInvalid ? '#f00' : 'transparent' };
  background-color: hsl(0,0%,100%);
`

