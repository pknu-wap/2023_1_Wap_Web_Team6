import React from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import searchLogo from "../assets/searchLogo.png";
import RecipeItem from "../components/RecipeItem";

const RecipeListContainer = styled(Container)`
  max-width: 60rem;
  width: 70%;
  height: 30rem;
`;
const StyleSearchLogo = styled.div`
  width: 50px;
  padding-right: 0.5rem;
  padding-top: 1.5rem;
`;
const LogoImg = styled.img`
  width: 100%;
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;
const ListContainer = styled.div`
  // 레시피 검색 목록
  background-color: green;
  width: 500px;
  height: 500px;
`;

// 나중에 type.ts 파일에 옮기기
interface searchData {
  id?: number;
  img?: string;
  title: string;
  date?: string;
  views?: number;
}

const RecipeList = () => {
  const searchTmpData: searchData[] = [
    {
      id: 0,
      img: "https://cdn.pixabay.com/photo/2022/12/29/01/01/image-7683986_960_720.jpg",
      title: "떡볶이",
      date: "2023/05/04",
      views: 1534,
    },
    {
      id: 1,
      img: "https://cdn.pixabay.com/photo/2017/06/17/16/20/waffles-2412628_960_720.jpg",
      title: "와플",
      date: "2023/05/05",
      views: 14,
    },
    {
      id: 2,
      img: "https://cdn.pixabay.com/photo/2018/06/04/13/36/cold-noodles-3453218_960_720.jpg",
      title: "냉면",
      date: "2023/05/06",
      views: 579,
    },
  ];

  return (
    <>
      <Navbar />
      <RecipeListContainer>
        <LogoBox>
          <StyleSearchLogo>
            <LogoImg src={searchLogo}></LogoImg>
          </StyleSearchLogo>
          <input placeholder="레시피 검색"></input>
        </LogoBox>
        <ListContainer>
          {searchTmpData.map((ele: searchData) => {
            return <RecipeItem RecipeTitle={ele.title} />;
          })}
        </ListContainer>
      </RecipeListContainer>
    </>
  );
};

export default RecipeList;
