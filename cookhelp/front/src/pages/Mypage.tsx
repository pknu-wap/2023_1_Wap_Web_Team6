import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import styled from "styled-components";
import { PostData } from "../components/type";
import { useNavigate } from "react-router-dom";

const StyleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
`;
const InfoGroup = styled.div`
  display: flex;
  align-items: center;
`;
const ItemGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
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
const Label = styled.div`
  font-size: 20px;
  font-weight: var(--semiBold-font);
  width: 100px;
`;
const Info = styled.div`
  font-size: 20px;
  font-weight: var(--med-font);
  flex-grow: 1;
  margin-left: 10px;
  text-align: center;
`;
const Side = styled.ul`
  float: left;
  width: 200px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;

  > li {
    padding: 10px;
    cursor: pointer;
  }
  > li:hover {
    background-color: #555;
    color: white;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  position: relative;

  > h2 {
    position: absolute;
    width: 100%;
    text-align: center;
  }
`;
const Main = styled.div`
  display: flex;
`;
const PostItem = styled.li`
  cursor: pointer;
`;

const Mypage = () => {
  const getID = localStorage.getItem("loginId");
  const navigate = useNavigate();

  const [id, setId] = useState("id");
  const [password, setPassword] = useState("password");
  const [nick, setNick] = useState("nickname");
  const [clickedCategory, setClickCategory] = useState("");
  const foodStyle = ["한식", "중식", "일식", "양식"];
  const [check, setCheck] = useState("정보 조회");
  const [postData, setPostData] = useState<PostData[]>([]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await fetch(
          `http://localhost:8081/members/api/info/${getID}`
        );
        const data = await res.json();

        setId(data[0].id);
        setPassword(data[0].password);
        setNick(data[0].nickname);
        setClickCategory(data[0].foodstyle);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    const getPost = async () => {
      try {
        // const res = await fetch(
        //   `http://localhost:8081/members/api/cookhelperInfo/${getID}`
        // );
        const res = await fetch(
          `http://localhost:8081/members/api/cookhelperInfo/test`
        );
        const data = await res.json();
        // console.log(data);
        setPostData(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getInfo();
    getPost();
  }, []);

  const handleFoodClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickCategory(e.currentTarget.name);
  };

  const onChange = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e.currentTarget.textContent);
    if (e.currentTarget.textContent) setCheck(e.currentTarget.textContent);
  };

  const handlePostNavigate = (
    e: React.MouseEvent<HTMLElement>,
    target: PostData
  ) => {
    e.preventDefault();
    navigate(`/recipe/${target.recipe_idx}`);
  };

  let InfoContent = <></>;
  if (check === "정보 조회") {
    InfoContent = (
      <Container>
        <h2>정보 조회</h2>
        <StyleInfo>
          <InfoGroup>
            <Label>닉네임</Label>
            <Info>{nick}</Info>
          </InfoGroup>
          <InfoGroup>
            <Label>아이디</Label>
            <Info>{id}</Info>
          </InfoGroup>
          <InfoGroup>
            <Label>비밀번호</Label>
            <Info>{password}</Info>
          </InfoGroup>
        </StyleInfo>
        <Label>관심 분야</Label>
        <ItemGroup>
          {foodStyle.map((elm, idx) => {
            return (
              <ItemBtn
                type="button"
                key={idx}
                onClick={handleFoodClick}
                name={elm}
                isActive={clickedCategory === elm}
              >
                {elm}
              </ItemBtn>
            );
          })}
        </ItemGroup>
      </Container>
    );
  } else if (check === "작성글 조회") {
    InfoContent = (
      <Container>
        <h2>작성글 조회</h2>
        <ul>
          {postData.map((ele) => (
            <PostItem
              key={ele.recipe_idx}
              onClick={(e) => handlePostNavigate(e, ele)}
            >
              {ele.recipe_title}
            </PostItem>
          ))}
        </ul>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Main>
        <Side>
          <li onClick={onChange}>정보 조회</li>
          <li onClick={onChange}>작성글 조회</li>
        </Side>
        <Content>
          <h2>마이페이지</h2>
          {InfoContent}
        </Content>
      </Main>
    </>
  );
};

export default Mypage;
