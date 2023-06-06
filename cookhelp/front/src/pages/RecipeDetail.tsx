import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Container from "../UI/Container";
import Btn from "../UI/Btn";
import {
  DeckData,
  fetchRecipeCardsProps,
  StepItemProps,
} from "../components/type";

import imgSrc from "../assets/양식.jpg";

const StyledContainer = styled(Container)`
  width: 80%;
  max-width: 80rem;
  position: relative;
`;
const StyledStepItem = styled.div`
  display: flex;
  margin: 1rem 1rem;

  > img {
    width: 150px;
    height: 100px;
    object-fit: cover;
  }
`;
const StyledBtnWrap = styled.div`
  width: 100%;
  position: relative;
`;
const StyledBtn = styled(Btn)`
  position: absolute;
  top: -4rem;
  right: 0.8rem;
`;
const IngredientWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StepItem = ({ card }: StepItemProps) => {
  const { title, detail, pic } = card;
  //   console.log(card);
  return (
    <StyledStepItem>
      <div>
        <h2>{title}</h2>
        <div>{detail}</div>
      </div>
      <img src={imgSrc} />
    </StyledStepItem>
  );
};

const RecipeDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [RecipeData, setRecipeData] = useState();
  const [Ingredient, setIngredient] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [cards, setCards] = useState<fetchRecipeCardsProps[]>([]);

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

        // console.log(data);

        //data 저장
        setRecipeData(data.result[0]);
        setIngredient(data.recipeStuffArray);
        setTitle(data.result[0].recipe_title);
        setDate(data.result[0].formatted_date);
        const newGenerateCard = generateCards(data.result[0]);
        setCards(newGenerateCard);
      } catch (error) {
        console.log("Error!", error);
      }
    };

    fetchRecipeHelper();
  }, []);

  const generateCards = (deckData: DeckData) => {
    const newCards = [];

    for (let i = 1; i <= 10; i++) {
      const recipeImg = deckData[`recipe_img_${i}`];
      const rd = deckData[`rd_${i}`];
      const timerRd = deckData[`timer_rd_${i}`];
      const titleRd = deckData[`recipe_step_${i}`];

      if (recipeImg || rd || timerRd || titleRd) {
        const card = {
          listNums: i,
          title: titleRd,
          pic: recipeImg,
          detail: rd,
          timer: timerRd !== null ? parseInt(timerRd) : null,
        };
        newCards.push(card);
      }
    }

    return newCards;
  };

  const navigateToHelper = () => {
    navigate(`/recipe/${params.recipe_idx}`);
  };

  //   console.log(RecipeData);

  return (
    <>
      <NavBar />
      <StyledContainer>
        <StyledBtnWrap>
          <StyledBtn onClick={navigateToHelper}>요리도우미</StyledBtn>
        </StyledBtnWrap>
        <h1>{title}</h1>
        <div>{date}</div>
        <IngredientWrap>
          <h3>요리 재료</h3>
          <div>{Ingredient}</div>
        </IngredientWrap>
        {cards.map((elm, idx) => (
          <StepItem key={idx} card={elm} />
        ))}
      </StyledContainer>
    </>
  );
};

export default RecipeDetail;
