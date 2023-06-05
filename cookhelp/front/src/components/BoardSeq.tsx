import React, { ChangeEvent, useState } from "react"
import styled from "styled-components"
import { BoardSeqProps } from "../components/type"

const DetailDiv = styled.div`
    margin-bottom: 2rem;
    width: 320px;
`;
const Textarea = styled.textarea`
    font-size: 16px;
    border: 1px solid var(--gray-color);
    border-radius: 3px;
    padding: 5px;   
    width: 20rem;
    height: 5rem;
`;
const Input = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid var(--gray-color);
  border-radius: 3px;
  width: 20rem;
  margin-bottom: 0.5rem;
`;
const SeqData = styled.div`
  margin-bottom: 3rem;  
`;
const TimerContainer = styled.div`
  margin-top: 1rem;  
  display: flex;
`;

const RecipeSeq = (props: BoardSeqProps) => {
    const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

    const checkedItemHandler = (index: number, isChecked: boolean) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = isChecked;
        setCheckedItems(updatedCheckedItems);
      };

    return (
        <DetailDiv>
        </DetailDiv>
    )
}

export default RecipeSeq