import React, { useState } from 'react'
import { FieldArray, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { StyledErrorMessage } from '../common/styles/StyledErrorMessage'
import { StyledField } from '../common/styles/StyledField'
import SelectField from '../SelectField/SelectField'
import Input from './Input/Input'
import { Alert } from '../common/styles/Alert'
import * as S from './styles'


const generateAnswers = count => {
   return new Array(count)
      .fill('')
      .map((_, index) => ({
         id: index + 1, answer: ''
      }))
}

const generateOptions = count => {
   return new Array(count)
      .fill('')
      .map((_, index) => ({
         value: index + 1, label: index + 1
      }))
}

const initialValues = {
   quizName: '',
   question: '',
   correctAnswer: '',
   answerCount: '',
   answers: generateAnswers(4)
}

const answerCountOptions = generateOptions(6)

const validationSchema = Yup.object({
   question: Yup.string().required('Обязательное поле'),
   quizName: Yup.string().required('Обязательное поле'),
   answers: Yup.array()
      .of(
         Yup.object({
            answer: Yup.string().required('Обязательное поле'),
         })
      ),
   correctAnswer: Yup.string().required('Обязательное поле'),
   answerCount: Yup.string().required('Обязательное поле')
})



const QuizCreatorForm = ({ createQuiz }) => {
   const [questions, setQuestions] = useState([])
   const [quizName, setQuizName] = useState(null)
   const [isAlertDisplayed, setIsAlertDisplayed] = useState(false)

   const getQuiz = values => ({
      id: questions.length + 1,
      question: values.question,
      correctAnswerId: Number(values.correctAnswer),
      answers: [ ...values.answers ]
   })

   const addQuestionHandler = (values, { resetForm }) => {
      const { quizName: localQuizName, answerCount, ...rest } = values

      initialValues.quizName = localQuizName
      initialValues.answerCount = answerCount

      setQuestions(prev => [
         ...prev,
         getQuiz(rest)
      ])
      setQuizName(localQuizName)
      resetForm()
   }

   const createQuizHandler = e => {
      e.preventDefault()

      setQuestions([])
      initialValues.quizName = ''

      createQuiz({
         quizName,
         questions
      })

      setIsAlertDisplayed(true)
      setTimeout(() => setIsAlertDisplayed(false), 2000)
   }

   const answerCountHandler = (count, formik) => {
      initialValues.answers = generateAnswers(Number(count))
      formik.resetForm()
   }

   return (
      <Formik
         initialValues={ initialValues }
         onSubmit={ (values, actions) => addQuestionHandler(values, actions) }
         validationSchema={ validationSchema }
         validateOnMount={true}
         validateOnChange={true}
      >
         { ({ values, errors, ...formik }) => (
            <S.StyledForm>
               <Field
                  name="answerCount"
                  component={ SelectField }
                  options={ answerCountOptions }
                  placeholder="Выберите количество ответов"
                  onChange={ count => answerCountHandler(count, formik) }
                  isInvalid={ errors.answerCount && formik.touched.answerCount }
               />
               <StyledErrorMessage component="div" name="answerCount" style={{ marginBottom: '10px' }} />

               <Input name="quizName" formik={ { ...formik, errors } } />

               <Input
                  name="question"
                  formik={ { ...formik, errors } }
                  placeholder="Название вопроса"
               />

               <hr/>

               <FieldArray
                  name="answers"
                  render={ () => (
                     <div>
                        { values.answers.map((answer, index) => (
                           <div key={ index }>
                              <StyledField
                                 name={ `answers[${ index }].answer` }
                                 placeholder={ `Ответ - ${ index + 1 }` }
                                 $isInvalid={ errors.answers?.[index]?.answer && formik.touched.answers?.[index]?.answer }
                              />
                              <StyledErrorMessage component="div" name={ `answers[${ index }].answer` } />
                           </div>
                        )) }
                     </div>
                  ) }
               />

               <Field
                  name="correctAnswer"
                  component={ SelectField }
                  options={ generateOptions(values.answerCount) }
                  isInvalid={ errors.correctAnswer && formik.touched.correctAnswer }
               />
               <StyledErrorMessage component="div" name="correctAnswer" style={{ marginBottom: '10px' }} />

               <S.Button styleType="primary" type="submit">
                  Добавить вопрос
               </S.Button>
               <S.Button
                  styleType="success"
                  onClick={ createQuizHandler }
                  disabled={ questions.length === 0 }
               >
                  Создать тест
               </S.Button>

               { isAlertDisplayed && <Alert type="success">Тест создан. Перейдите в список тестов чтобы увидеть его!</Alert> }
            </S.StyledForm>
         ) }
      </Formik>
   )
}

export default QuizCreatorForm


