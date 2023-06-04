import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BoardItemProps } from "../components/type";

const StyledRecipeItem = styled.div`
  // 레시피 각각의 아이템
  background-color: white;
  padding: 0.5em;
  border: solid;
  border-bottom: 0.5px;
  border-color: var(--gray-color);
  cursor: pointer;
`;
const ListWrapper = styled(Link)`
  display: flex;
  gap: 1rem;
  text-decoration-line: none;
  color: black;
`;
const ListId = styled.div`
  width: 4%;
`;
const ListTitle = styled.div`
  width: 52%;
`;
const ListWriter = styled.div`
  width: 15%;
`;
const ListDate = styled.div`
  margin-left: auto;
`;

const BoardItem = ({
  BoardIdx,
  BoardTitle,
  BoardWriter,
  BoardDate,
  BoardStyle,
  to,
}: BoardItemProps) => {
  return (
    <StyledRecipeItem>
      <ListWrapper to={to}>
        <ListId>{BoardIdx}</ListId>
        <ListTitle>[{BoardStyle}]{BoardTitle}</ListTitle>
        <ListWriter>{BoardWriter}</ListWriter>
        <ListDate>{BoardDate}</ListDate>
      </ListWrapper>
    </StyledRecipeItem>
  );
};

export default BoardItem;
