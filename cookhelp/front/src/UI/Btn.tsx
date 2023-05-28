import styled from "styled-components";

const Btn = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: var(--green-color);
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  
  margin-top: 10px;

  &:hover {
    background-color: var(--dark-green-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
export default Btn;