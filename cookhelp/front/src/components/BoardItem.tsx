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
const Liststyle = styled.div`
  width: 15%;
`;
const ListTitle = styled.div`
  width: 45%;
`;
const ListWriter = styled.div`
  width: 10%;
`;
const ListDate = styled.div`
  margin-left: auto;
`;

const BoardItem = ({
  BoardTitle,
  BoardWriter,
  BoardDate,
  BoardStyle,
  to,
}: BoardItemProps) => {
  return (
    <StyledRecipeItem>
      <ListWrapper to={to}>
        <Liststyle>{BoardStyle}</Liststyle>
        <ListTitle>{BoardTitle}</ListTitle>
        <ListWriter>{BoardWriter}</ListWriter>
        <ListDate>{BoardDate}</ListDate>
      </ListWrapper>
    </StyledRecipeItem>
  );
};

export default BoardItem;
