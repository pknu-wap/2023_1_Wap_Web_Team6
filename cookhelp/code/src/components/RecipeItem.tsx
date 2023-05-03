import React from "react";
import styled from "styled-components";

const StyledRecipeItem = styled.div`
  // 레시피 각각의 아이템
  background-color: yellow;
`;

// props 인터페이스 정의
interface RecipeItemProps {
  RecipeTitle: string;
}

const RecipeItem = ({ RecipeTitle }: RecipeItemProps) => {
  return <StyledRecipeItem>{RecipeTitle}</StyledRecipeItem>;
};

export default RecipeItem;
