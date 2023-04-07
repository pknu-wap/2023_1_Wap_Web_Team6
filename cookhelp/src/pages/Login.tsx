import React from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #678570;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #32503b;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Login = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Title>Login</Title>
        <Form>
          <FormGroup>
            <Label>아이디 </Label>
            <Input type="text" placeholder="아이디 입력"></Input>
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 </Label>
            <Input type="text" placeholder="비밀번호 입력"></Input>
          </FormGroup>
          <ButtonGroup>
            <Button>로그인</Button>
            <Button>회원가입</Button>
          </ButtonGroup>
        </Form>
      </Container>
    </>
  );
};

export default Login;
