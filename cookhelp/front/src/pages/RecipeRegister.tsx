import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import { Form } from "react-router-dom";
import Btn from "../UI/Btn";
import RecipeSeq from "../components/RecipeSeq";

const RegisterContainer = styled(Container)`
  max-width: 60rem;
  width: 70%;
  //height: 35rem;
  margin-bottom: 1rem;
  display: flex;
  padding: 3rem;
`;

const AdditionBtn = styled(Btn)`
padding: 5px;
font-size: 14px;
`;

const Title = styled.div`
font-size: 24px;
margin-bottom: 20px;
margin-right: auto;
font-weight: var(--semiBold-font);
`;

const Input = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid var(--gray-color);
  border-radius: 3px;
  width: 20rem;
  margin-bottom: 0.5rem;
`;

const Textarea = styled.textarea`
font-size: 16px;
border: 1px solid var(--gray-color);
border-radius: 3px;
padding: 5px;
width: 20rem;
height: 5rem;
`;

const Label = styled.label`
font-size: 1rem;
margin-right: 3rem;

`;

const Select = styled.select``;

const FormItem = styled.div`
 flex-direction: column;
 margin-bottom: 1rem;
`;

const DetailDiv = styled.div`
    margin-bottom: 2rem;
    width: 320px;
`

const CreateListDiv = styled.div`
  padding: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const RecipeRegister = () => {

    const [countList, setCountList] = useState([0])
    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
    }

    return (
        <>
            <Navbar />
            <Title>레시피 등록</Title>
            <RegisterContainer>
                <FormItem>
                    <Label>레시피 제목</Label>
                    <Input
                        type="text"
                        name="recipeTitle"
                        placeholder="레시피 제목을 입력해주세요."
                        required
                    />
                </FormItem>
                <FormItem>
                    <Label>카테고리</Label>
                    <Select name="category">
                        <option value="1">한식</option>
                        <option value="2">중식</option>
                        <option value="3">일식</option>
                        <option value="4">양식</option>
                    </Select>
                </FormItem>
                <FormItem>

                    <Label>요리 재료</Label>
                    <Textarea
                        name="ingredients"
                        placeholder="요리 재료를 입력해주세요."
                        required
                    />
                </FormItem>

                <Label>요리 순서</Label>
                <CreateListDiv>
                    <RecipeSeq countList={countList} />
                    <Btn onClick={onAddDetailDiv}>
                        순서 추가
                    </Btn>
                </CreateListDiv>


            </RegisterContainer>
            <Btn>등록하기</Btn>
        </>
    );
};

export default RecipeRegister;