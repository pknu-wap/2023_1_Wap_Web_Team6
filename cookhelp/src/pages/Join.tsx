import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import { Link } from "react-router-dom";

const Title = styled.h2`
  font-size: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Form = styled.form`
  width: 50%;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #678570;
  color: #fff;
  border: none;
  border-radius: 10px;
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

const LoginLink = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  & > a {
    text-decoration: none;
  }
`;

const ItemBtn = styled.button<{ isActive: boolean }>`
  padding: 10px;
  font-size: 16px;
  background-color: ${({ isActive }) => (isActive ? "#678570" : "#fff")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

const ItemGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

let sampleReg: RegExp = /^[A-Za-z0-9]{4,10}$/;

const loginID = /^[A-Za-z0-9]{4,10}$/; //
function korRuleChk(arg: string): boolean {
  return loginID.test(arg);
}

const Join = () => {
  const [clickedCategory, setClickCategory] = useState("");
  const foodStyle = ["한식", "중식", "일식", "양식"];
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickCategory(e.currentTarget.name);
  };

  console.log(clickedCategory);

  return (
    <>
      <Navbar />
      <Container>
        <Title>회원가입</Title>
        <LoginLink>
          계정이 이미 있으십니까? <Link to="/login">로그인</Link>
        </LoginLink>
        <Form>
          <FormGroup>
            <Label>아이디 </Label>
            <Input type="text" placeholder="아이디 입력"></Input>
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 </Label>
            <Input type="password" placeholder="비밀번호 입력"></Input>
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 재입력</Label>
            <Input type="password" placeholder="비밀번호 재입력"></Input>
          </FormGroup>
          <FormGroup>
            <Label>닉네임</Label>
            <Input type="text" placeholder="닉네임 입력"></Input>
          </FormGroup>
          <FormGroup>
            <Label>관심 분야</Label>
            <ItemGroup>
              {foodStyle.map((elm, idx) => {
                return (
                  <ItemBtn
                    type="button"
                    key={idx}
                    onClick={handleClick}
                    name={elm}
                    isActive={clickedCategory === elm}
                  >
                    {elm}
                  </ItemBtn>
                );
              })}
            </ItemGroup>
          </FormGroup>
          <ButtonGroup>
            <Button>회원가입</Button>
          </ButtonGroup>
        </Form>
      </Container>
    </>
  );
};

export default Join;
