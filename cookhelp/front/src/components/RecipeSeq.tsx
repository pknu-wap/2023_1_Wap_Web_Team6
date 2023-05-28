import React, { useState } from "react"
import styled from "styled-components"
import { RecipeSeqProps } from "../components/type"


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

const RecipeSeq = (props: RecipeSeqProps) => {
    const [checkTimer, setCheckTimer] = useState(0);

    return (
        <DetailDiv>
            {props.countList && props.countList.map((item, i) => (
                <SeqData key={i}>
                    <label>소제목</label>
                    <Input
                        type="text"
                        name="recipe_step_1"
                        placeholder="요리 순서에 대한 소제목을 입력해주세요."
                        required
                    />
                    <label>상세 설명</label>
                    <Textarea
                        placeholder="요리 순서에 대한 설명을 적어주세요."
                        required
                    />
                    <input type='file' />

                    <TimerContainer>
                        <div>
                            <input type="checkbox" id="scales" name="scales" />
                            <label>타이머</label>
                        </div>

                    </TimerContainer>
                </SeqData>
            ))}
        </DetailDiv>
    )
}

export default RecipeSeq