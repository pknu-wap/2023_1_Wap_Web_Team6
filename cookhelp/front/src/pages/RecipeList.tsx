import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import searchLogo from "../assets/searchLogo.png";
import RecipeItem from "../components/RecipeItem";
import {
  fetchRecipeList,
  RecipeItemProps,
  searchData,
} from "../components/type";
import searchTmpData from "../tmpDB/tmpRecipeListDB";
import { useNavigate } from "react-router-dom";
import Btn from "../UI/Btn";
import { type } from "os";

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
const StyleBtnContainer = styled.div`
  position: relative;
  left: 12rem;
  top: 4rem;
  display: flex;
  gap: 0.7rem;
`;
const ItemBtn = styled.button<{ isActive: boolean }>`
  padding: 10px;
  font-size: 16px;
  background-color: ${({ isActive }) =>
    isActive ? "var(--green-color)" : "var(--light-gray-color)"};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;

  position: relative;
  left: 18rem;
`;

const RecipeList = () => {
  const [listData, setListData] = useState([]);
  const foodStyle = ["전체", "한식", "중식", "일식", "양식"];
  const [clickedCategory, setClickCategory] = useState("전체");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/list");
        const data = await res.json();

        if (!res.ok) {
          console.log("error : ", data.description);
          return;
        }
        console.log("data : ", data);

        clickedCategory === "전체"
          ? setListData(data)
          : setListData(
              data.filter(
                (item: fetchRecipeList) => item.foodstyle === clickedCategory
              )
            );

        // setListData(data);
      } catch (error) {
        console.log("Error!", error);
      }
    };

    fetchData();
    console.log(listData);
  }, [clickedCategory]);

  const navigate = useNavigate();

  const handleFoodClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickCategory(e.currentTarget.name);
  };

  return (
    <>
      <Navbar />
      <StyleBtnContainer>
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
      </StyleBtnContainer>
      <RecipeListContainer>
        <LogoBox>
          <SearchInput placeholder="레시피 검색"></SearchInput>
          <StyleSearchLogo>
            <LogoImg src={searchLogo}></LogoImg>
          </StyleSearchLogo>
        </LogoBox>

        <ListBox>
          {listData.map((ele: searchData, index: number) => {
            const date = ele.created_date.slice(0, 10);
            return (
              <RecipeItem
                key={ele.recipe_number}
                to={`/recipe/${index}`}
                RecipeId={ele.recipe_number}
                RecipeTitle={ele.recipe_title}
                RecipeWriter={ele.members}
                RecipeDate={date}
              />
            );
          })}
        </ListBox>
        <RegisterBtn onClick={() => navigate("/recipe_register")}>
          레시피 등록
        </RegisterBtn>
      </RecipeListContainer>
    </>
  );
};

export default RecipeList;
