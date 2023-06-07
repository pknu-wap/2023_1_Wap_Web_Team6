import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import Btn from "../UI/Btn";
import { useNavigate } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useLocation } from "react-router";

const ModifyContainer = styled(Container)`
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
const Label = styled.label`
  font-size: 1rem;
  margin-right: 3rem;
`;

const Select = styled.select``;

const FormItem = styled.div`
  flex-direction: column;
  margin-bottom: 1rem;
`;
const ModifyBtn = styled(Btn)`
  display: flex;
  margin: auto;
`;

const BoardModify = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state)

  const [modifyData, setModifyData] = useState({
    board_idx: state,
    title: "", // 게시판 제목
    content: "", // 내용
    boardstyle: "자유게시판", // 게시판 종류(QnA, 자유게시판 (공지사항은 따로))
    members: localStorage.getItem('loginId'),
  });

  const [board_idx, setboard_idx] = useState<string>("");
  const [title, settitle] = useState<string>("");
  const [content, setcontent] = useState<string>("")
  const [members, setmembers] = useState<string>("")
  const [boardstyle, setboardstyle] = useState<string>("");
  const [create_date, setcreate_date] = useState();

  const handleValueChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'title') {
      settitle(value);
    } else if (name === 'content') {
        setcontent(value);
    } else if (name ==='boardstyle') {
        setboardstyle(value);
    }

    setModifyData({
      ...modifyData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchRecipeHelper = async () => {
      try {
        const res = await fetch(
          `http://localhost:8081/community/api/board/${state}`
        );
        const data = await res.json();

        if (!res.ok) {
          console.log("error : ", data.description);
          return;
        }
        console.log("data : ", data[0]);
        // console.log("data : ", data.result[0]);
        setboard_idx(data[0].board_idx);
        settitle(data[0].title);
        setcontent(data[0].content);
        setmembers(data[0].members);
        setboardstyle(data[0].boardstyle);
        setcreate_date(data[0].create_date);
      } catch (error) {
        console.log("Error!", error);
      }
    };

    fetchRecipeHelper();
  }, []);

  const modifyBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(modifyData)
    try {
      const response = await fetch("http://localhost:8081/community/api/boardModify", {
        method: "POST",
        headers: {
          // headers: API 응답에 대한 정보를 담음
          "content-type": "application/json",
        },
        body: JSON.stringify(modifyData)
      });

      if (response.ok) {
        navigate(`/board/${state}`, { state });
        console.log("게시물 수정 성공");
      }

      console.log(modifyData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Title>게시판 등록</Title>
      <ModifyContainer>
        <form encType="multipart/form-data" method="POST">
          <FormItem>
            <Label>게시글 제목</Label>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={handleValueChange}
              required
            />
          </FormItem>

          <FormItem>
            <Label>카테고리</Label>
            <Select name="boardstyle" value = {boardstyle} onChange={handleValueChange}>
              <option value="QnA">QnA</option>
              <option value="자유게시판">자유게시판</option>
            </Select>
          </FormItem>

          <FormItem>
            <Label>게시글 내용</Label>
            <CKEditor
          editor={ClassicEditor}
          id="content"
          data={content}
          onReady={editor => {
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            modifyData.content = data;
          }}
          onBlur={(event: any, editor: any) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event: any, editor : any) => {
            console.log('Focus.', editor);
          }}
        />
          </FormItem>
        </form>
      </ModifyContainer>
      <ModifyBtn onClick={modifyBtnClick}>수정하기</ModifyBtn>
    </>
  );
};

export default BoardModify;
