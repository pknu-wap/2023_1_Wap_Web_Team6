import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import { Form } from "react-router-dom";
import Btn from "../UI/Btn";

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
`;

const Textarea = styled.textarea`

`;

const Label = styled.label`
font-size: 1rem;
margin-right: 3rem;

`;

const Select = styled.select`

`;

const FormItem = styled.div`
 flex-direction: column;
 margin-bottom: 1rem;
 
`;

const RecipeRegister = () => {
    const [ingredient, setIngredient] = useState([]);

    const AddIngredients = () => {
        

    };

    return (
        <>
            <Navbar />
            <Title>레시피 등록</Title>
            <RegisterContainer>
                <FormItem>
                    <Label>레시피 제목</Label>
                    <Input
                        type="text"
                        name="RecipeTitle"
                        placeholder="레시피 제목을 입력해주세요."
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
                    <Input
                        type="textarea"
                        name="ingredients"
                        placeholder="요리 재료를 입력해주세요."
                    />
                </FormItem>

                <FormItem>
                    <Label>요리 순서</Label>
                    
                </FormItem>
                <AdditionBtn>재료 추가</AdditionBtn>
            </RegisterContainer>
        </>
    );
};

export default RecipeRegister;