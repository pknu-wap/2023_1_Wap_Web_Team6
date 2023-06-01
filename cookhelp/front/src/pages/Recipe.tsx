import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import { RecipeCard, ListProps, DeckData } from "../components/type";
import RecommendCard from "../components/RecommendCard";
import { Form, useParams } from "react-router-dom";

const Wrap = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  /* @media screen and (max-width: 800px) {
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
  } */
`;

const RightSideBar = styled.div`
  background-color: var(--light-gray-color);

  max-width: 250px;
  width: 25%;
  margin: 0;

  /* @media screen and (max-width: 800px) {
    max-width: 100%;
    width: 600px;
    max-height: 50%;
    height: 150px;
  } */
`;
const LeftSideBar = styled.div`
  background-color: var(--dark-green-color);
  color: white;
  width: 25%;
  max-width: 250px;
`;
const ListTitle = styled.ol`
  font-weight: var(--Bold-font);
  font-size: 18px;
  margin: 1rem 1rem;
`;
const StyledList = styled.li`
  font-size: 1rem;
  margin-bottom: 5px;
  list-style-type: decimal;
  cursor: pointer;
  /* padding-left: 1rem; */
`;
const Main = styled.div`
  background-color: var(--mint-color);
  width: 50%;
`;
const IngredientItem = styled.li`
  font-size: 1rem;
  margin-bottom: 5px;
  list-style: none;
  padding-left: 1rem;
`;
const Footer = styled.footer`
  background-color: var(--green-color);
  color: white;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  justify-content: center;

  width: 1500px;
  max-width: 90%;
  height: 190px;
`;

const List = ({ stepDetail, listNum, setSelectIdx }: ListProps) => {
  const hadleListItem = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log(e.currentTarget.value);
    setSelectIdx(e.currentTarget.value);
  };

  return (
    <StyledList key={listNum} value={listNum} onClick={hadleListItem}>
      {stepDetail}
    </StyledList>
  );
};

const Recipe = () => {
  const params = useParams();
  // console.log(params.recipe_idx);

  const [deck, setDeck] = useState();
  const [selectIdx, setSelectIdx] = useState<number>(1);
  const [recipeSteps, setRecipeSteps] = useState<string[]>([]);
  const [timer, setTimer] = useState<number[]>([]);
  const [Ingredient, setIngredient] = useState<string[]>([]);

  const addRecipeStep = (step: string | null) => {
    if (step == null) return;
    setRecipeSteps((prev) => [...prev, step]);
  };
  const addTimer = (time: string | null) => {
    if (time == null) return;
    const parsedTime = parseInt(time);
    setTimer((prev) => [...prev, parsedTime]);
  };

  useEffect(() => {
    const fetchRecipeHelper = async () => {
      try {
        const res = await fetch(
          `http://localhost:8081/board/api/recipehelper/${params.recipe_idx}`
        );
        const data = await res.json();

        if (!res.ok) {
          console.log("error : ", data.description);
          return;
        }
        console.log("data : ", data.result[0]);
        setDeck(data.result[0]);
        setIngredient(data.recipeStuffArray);
        updateContent(data.result[0]);
      } catch (error) {
        console.log("Error!", error);
      }
    };

    fetchRecipeHelper();
  }, []);

  const updateContent = (deckData: DeckData) => {
    setRecipeSteps([]);
    setTimer([]);

    Object.keys(deckData).forEach((key) => {
      //요리 순서(소제목) 배열에 저장
      if (key.startsWith("recipe_step") && deckData[key] !== null) {
        // console.log(deckData[key]);
        addRecipeStep(deckData[key]);
      }

      // 타이머 저장
      if (key.startsWith("timer_rd")) {
        addTimer(deckData[key]);
      }
    });
  };

  let listContent = recipeSteps.map((step, idx) => (
    <List
      key={idx}
      stepDetail={step}
      listNum={idx + 1}
      setSelectIdx={setSelectIdx}
    />
  ));

  let IngredientContent = Ingredient.map((item, index) => (
    <IngredientItem key={index}>{item}</IngredientItem>
  ));

  // console.log("deck : ", deck);
  // console.log("listContent : ", listContent);
  return (
    <div>
      <NavBar />
      <Wrap>
        <RightSideBar>
          <ListTitle>요리 순서</ListTitle>
          {listContent}
        </RightSideBar>
        <Main>{/* <Slider recipeList={deck} selectIdx={selectIdx} /> */}</Main>
        <LeftSideBar>
          <ListTitle>요리 재료</ListTitle>
          {IngredientContent}
        </LeftSideBar>
      </Wrap>
      <Footer>
        <RecommendCard />
      </Footer>
    </div>
  );
};

export default Recipe;
