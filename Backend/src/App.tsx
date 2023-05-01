import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';

const customers = [
  {
  'id' : 1,
  'password' : '000324',
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '김민석',
  'birthday' : '000324',
  'gender' : '남자',
  'job' : '대학생'
  },
  {
    'id' : 2,
    'password' : '2321',
    'image' : 'https://placeimg.com/64/64/any',
    'name' : '홍길동',
    'birthday' : '7437',
    'gender' : '남자',
    'job' : '대학생'
  },
  {
    'id' : 3,
    'password' : '023',
    'image' : 'https://placeimg.com/64/64/any',
    'name' : '홍길순',
    'birthday' : '7437',
    'gender' : '여자',
    'job' : '대학생'
  }
]

class App extends Component{
  render() {
    return(
      <div>
        {
          customers.map(c =>{
            return (
              <Customer 
                key = {c.id}
                id = {c.id}
                password = {c.password}
                image = {c.image}
                name = {c.name}
                birthday = {c.birthday}
                gender = {c.gender}
                job = {c.job}
              />
            );
          })
        } 
          
      </div>
    );
  }
}

export default App;
