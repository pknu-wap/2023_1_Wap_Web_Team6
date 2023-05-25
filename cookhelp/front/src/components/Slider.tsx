import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSliderCard from "../hooks/useSliderCard";
import Timer from "./Timer";
import { RecipeCard, ArrowButtonProps, CardProps } from "./type";

const SliderContainer = styled.div`
  margin: 1rem 0;
`;
const ImgBox = styled.div`
  display: flex;
`;
const StyledCard = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledArrowBack = styled.svg`
  width: 15%;
  max-width: 60px;
`;
const StyledArrowForward = styled.svg`
  width: 15%;
  max-width: 60px;
`;
const SlideImg = styled.img`
  width: 90%;
  margin: auto;
  max-width: 600px;
`;
const CardIdx = styled.p`
  font-size: 0.8rem;
  margin-bottom: 1rem;
  color: var(--dark-green-color);
  display: flex;
  justify-content: center;
`;

const ArrowBack = ({ onClick }: ArrowButtonProps) => {
  return (
    <StyledArrowBack
      onClick={onClick}
      style={{ cursor: "pointer" }}
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
    </StyledArrowBack>
  );
};

const ArrowForward = ({ onClick }: ArrowButtonProps) => {
  return (
    <StyledArrowForward
      onClick={onClick}
      style={{ cursor: "pointer" }}
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
    </StyledArrowForward>
  );
};

const Card = ({ currentCard }: CardProps) => {
  const { pic, detail } = currentCard;

  return (
    <StyledCard>
      <SlideImg src={pic} />
      <p>{detail}</p>
    </StyledCard>
  );
};

const Slider = ({
  recipeList,
  selectIdx,
}: {
  recipeList: RecipeCard;
  selectIdx: number;
}) => {
  const { RecipeName, cards } = recipeList;
  const { card, cardIdx, goForward, goBack } = useSliderCard(cards, selectIdx);

  // console.log("RecipeName", RecipeName);
  // console.log("cards", cards);
  // console.log(cardIdx);
  // console.log(timerRender);
  // console.log("cardIdx : ", cardIdx);

  return (
    <SliderContainer>
      {card.length !== 0 && (
        <>
          <ImgBox>
            <ArrowBack onClick={goBack} />
            <Card currentCard={card[cardIdx]} />
            <ArrowForward onClick={goForward} />
          </ImgBox>
          <CardIdx>
            {cardIdx + 1}/{card.length}
          </CardIdx>
          <Timer curTime={card[cardIdx].timer} Idx={cardIdx} />
        </>
      )}
    </SliderContainer>
  );
};

export default Slider;
