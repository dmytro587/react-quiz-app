import styled from 'styled-components'

export const List = styled.ul`
  min-width: 500px;
  cursor: pointer;

  li {
    margin-bottom: 10px;
    padding: 10px 20px 10px 50px;
    
    background-color: #fff;
    border-radius: 5px;
    
    font-size: 1.2rem;
    font-weight: 500;
    color:#000;
    
    overflow: hidden;
    position: relative;
    transition: background-color .1s ease;
    counter-increment: answer; 
    
    &:hover {
      background-color: #eee;
    }
    
    &::before {
      content: counter(answer);
      position: absolute;
      top: 0;
      left: 0;
      width: 35px;
      height: 100%;
      
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 1rem;      
      background-color: #eee;
    }
  }
`

export const Counter = styled.div`
  margin-bottom: 10px;
  text-align: right;
`

export const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 1.2rem;
`