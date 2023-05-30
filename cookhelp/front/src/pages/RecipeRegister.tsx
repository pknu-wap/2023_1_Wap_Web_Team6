import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import Btn from "../UI/Btn";
import RecipeSeq from "../components/RecipeSeq";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const [countList, setCountList] = useState([0])
    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
    }

    const [registerData, setRegisterData] = useState({
        recipe_title: "null", // 레시피 제목
        recipe_stuff: "null", // 요리 재료
        recipe_img: "null", // 레시피 전체 이미지
        foodstyle: "null", // 음식 종류(한,중,일,양)

        recipe_step_1: "null", // 요리순서 소제목 1~10
        recipe_step_2: "null",
        recipe_step_3: "null",
        recipe_step_4: "null",
        recipe_step_5: "null",
        recipe_step_6: "null",
        recipe_step_7: "null",
        recipe_step_8: "null",
        recipe_step_9: "null",
        recipe_step_10: "null",

        rd_1: "null", // 요리순서 상세설명 1~10 
        rd_2: "null",
        rd_3: "null",
        rd_4: "null",
        rd_5: "null",
        rd_6: "null",
        rd_7: "null",
        rd_8: "null",
        rd_9: "null",
        rd_10: "null",

        // rd_1_img: "null", // 요리순서 이미지 1~10
        // rd_2_img: "null",
        // rd_3_img: "null",
        // rd_4_img: "null",
        // rd_5_img: "null",
        // rd_6_img: "null",
        // rd_7_img: "null",
        // rd_8_img: "null",
        // rd_9_img: "null",
        // rd_10_img: "null",

        rd_imgs: Array(10).fill("null"),

        timer_1: "null", // 타이머 1~10
        timer_2: "null",
        timer_3: "null",
        timer_4: "null",
        timer_5: "null",
        timer_6: "null",
        timer_7: "null",
        timer_8: "null",
        timer_9: "null",
        timer_10: "null"
    })

    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageUrl = reader.result as string;

                setRegisterData((prevData) => {
                    const updatedImgs = [...prevData.rd_imgs];
                    updatedImgs[index] = imageUrl;

                    return {
                        ...prevData,
                        rd_imgs: updatedImgs,
                    };
                });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const registerBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetch("http://localhost:8081/board/api/upload", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(registerData)
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("게시물 등록 성공");
                navigate("/recipe_list");
            })
            .catch(function (err) {
                console.log("Error", err);
            })
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
                        name="recipe_title"
                        placeholder="레시피 제목을 입력해주세요."
                        onChange={handleValueChange}
                        required
                    />
                </FormItem>

                <FormItem>
                    <Label>카테고리</Label>
                    <Select name="foodstyle" onChange={handleValueChange}>
                        <option value="한식">한식</option>
                        <option value="중식">중식</option>
                        <option value="일식">일식</option>
                        <option value="양식">양식</option>
                    </Select>
                </FormItem>

                <FormItem>
                    <Label>요리 재료</Label>
                    <Textarea
                        name="recipe_stuff"
                        placeholder="요리 재료를 입력해주세요."
                        onChange={handleValueChange}
                        required
                    />
                </FormItem>

                <FormItem>
                    <Label>요리 이미지</Label>
                    <Input
                        type="file"
                        name="recipe_img"

                        required
                    />
                </FormItem>

                <Label>요리 순서</Label>
                <CreateListDiv>
                    <RecipeSeq countList={countList} handleImgUpload={handleImgUpload}/>
                    <Btn onClick={onAddDetailDiv}>
                        순서 추가
                    </Btn>
                </CreateListDiv>

            </RegisterContainer>
            <Btn onClick={registerBtnClick}>등록하기</Btn>
        </>
    );
};

export default RecipeRegister;