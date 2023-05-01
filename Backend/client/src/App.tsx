import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
          </TableBody>
        </Table>
        
          
      </div>
    );
  }
}

export default App;
