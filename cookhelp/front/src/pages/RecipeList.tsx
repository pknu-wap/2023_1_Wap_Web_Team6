import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import searchLogo from "../assets/searchLogo.png";
import RecipeItem from "../components/RecipeItem";
import { RecipeItemProps, searchData } from "../components/type";
import searchTmpData from "../tmpDB/tmpRecipeListDB";
import { useNavigate } from "react-router-dom";
import Btn from "../UI/Btn"

const RecipeListContainer = styled(Container)`
  max-width: 60rem;
  width: 70%;
  height: 35rem;
  margin-bottom: 1rem;
  display: flex;
`;
const StyleSearchLogo = styled.div`
  width: 34px;
  padding-left: 0.5rem;
  padding-top: 1rem;
`;
const LogoImg = styled.img`
  width: 100%;
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;
const SearchInput = styled.input`
  margin-top: 0.5rem;
`;
const ListBox = styled.div`
  background-color: var(--light-gray-color);
  width: 90%;
  height: 500px;
`;
const RegisterBtn = styled(Btn)`
  margin-left: auto;
  margin-right: 5rem;
`;

const RecipeList = () => {

  // const [listData, setListData] = useState([]);

  // fetch("/api/list")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const newArray = data.map((item: RecipeItemProps) => ({
  //       id: item.RecipeId,
  //       title: item.RecipeTitle,
  //       writer: item.RecipeWriter,
  //       date: item.RecipeDate,
  //     }));

  //     setListData(newArray);
  //     console.log(newArray);
  //   })
  //   .catch((error) => {
  //     console.log("Error!", error);
  //   });
  
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
        <RecipeListContainer>
          <LogoBox>
            <SearchInput placeholder="레시피 검색"></SearchInput>
            <StyleSearchLogo>
              <LogoImg src={searchLogo}></LogoImg>
            </StyleSearchLogo>
          </LogoBox>

          <ListBox>
            {searchTmpData.map((ele: searchData, index: number) => {
              return (
                <RecipeItem
                  to={`/recipe/${index}`}
                  RecipeId={ele.id}
                  RecipeTitle={ele.title}
                  RecipeWriter={ele.writer}
                  RecipeDate={ele.date}
                />
              );
            })}
          </ListBox>
          <RegisterBtn onClick={() => navigate("/recipe_register")}>레시피 등록</RegisterBtn>  
        </RecipeListContainer>

    </>
  );
};

export default RecipeList;

