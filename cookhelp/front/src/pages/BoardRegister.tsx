import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import Btn from "../UI/Btn";
import { useNavigate } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RegisterContainer = styled(Container)`
  max-width: 60rem;
  width: 70%;
  //height: 35rem;
  margin: 2rem auto;
  display: flex;
  padding: 3rem;
`;
const Title = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  margin-right: auto;
  font-weight: var(--Bold-font);
  display: flex;
  margin-top: 3rem;
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
const RegisterBtn = styled(Btn)`
  display: flex;
  margin: auto;
`;

const BoardRegister = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    title: "", // 게시판 제목
    content: "", // 내용
    boardstyle: "자유게시판", // 게시판 종류(QnA, 자유게시판 (공지사항은 따로))
    members: localStorage.getItem('loginId'),

  });

  const handleValueChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };


  const registerBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(registerData)
    try {
      const response = await fetch("http://localhost:8081/community/api/upload", {
        method: "POST",
        headers: {
          // headers: API 응답에 대한 정보를 담음
          "content-type": "application/json",
        },
        body: JSON.stringify(registerData)
      });

      if (response.ok) {
        navigate("/board_list");
        console.log("게시물 등록 성공");
      }

      console.log(registerData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Title>게시판 등록</Title>
      <RegisterContainer>
        <form encType="multipart/form-data" method="POST">
          <FormItem>
            <Label>게시글 제목</Label>
            <Input
              type="text"
              name="title"
              placeholder="게시글 제목을 입력해주세요."
              onChange={handleValueChange}
              required
            />
          </FormItem>

          <FormItem>
            <Label>카테고리</Label>
            <Select name="boardstyle" value = {registerData.boardstyle} onChange={handleValueChange}>
              <option value="QnA">QnA</option>
              <option value="자유게시판">자유게시판</option>
            </Select>
          </FormItem>

          <FormItem>
            <Label>게시글 내용</Label>
            <CKEditor
          editor={ClassicEditor}
          id="content"
          data="<p></p>"
          onReady={editor => {
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            registerData.content = data;
            console.log("hello",registerData)
          }}
          onBlur={(event: any, editor: any) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event: any, editor : any) => {
            console.log('Focus.', editor);
          }}
        />
          </FormItem>

          {/* <FormItem>
            <Label>요리 이미지</Label>
            <Input
              type="file"
              name="recipe_img"
              onChange={(e) => handleImgUpload(e)}
              required
            />
          </FormItem> */}


        </form>
      </RegisterContainer>
      <RegisterBtn onClick={registerBtnClick}>등록하기</RegisterBtn>
    </>
  );
};

export default BoardRegister;
