import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import { ListProps, DeckData, Card } from "../components/type";
import { useParams } from "react-router-dom";

const Wrap = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  이태윤 존잘
  /* @media screen and (max-width: 800px) {
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
  } */
`;

const Post_view_wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  이태윤 존잘
`;

const Post_view_go_list_btn = styled.div`
  border: 0;
  padding: 10px;
  background-color: #ffd9d9;
`;

const Post_view_row  = styled.div`
  margin: 10px 0;
  display: flex;
`;

const Post_view_row1 = styled.div`
  margin: 10px 0;
  width: 30%;
  font-weight: bold;
`;

const Post_view_row2 = styled.div`
  margin: 10px 0;
  width: 70%;
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
  width: 80%;
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

  const [board_idx, setboard_idx] = useState();
  const [title, settitle] = useState();
  const [content, setcontent] = useState();
  const [members, setmembers] = useState();
  const [boardstyle, setboardstyle] = useState();
  const [create_date, setcreate_date] = useState();
  const [selectIdx, setSelectIdx] = useState<number>(1);
  const [Ingredient, setIngredient] = useState<string[]>([]);
  const [cards, setCards] = useState<Card[]>([]);


    useEffect(() => {
      const fetchRecipeHelper = async () => {
        try {
          const res = await fetch(
            `http://localhost:8081/community/api/board/${params.board_idx}`
          );
          const data = await res.json();

          if (!res.ok) {
            console.log("error : ", data.description);
            return;
          }
          console.log("data : ", data[0]);
          // console.log("data : ", data.result[0]);
          setboard_idx(data[0].board_idx);
          settitle(data[0].title);
          setcontent(data[0].content);
          setmembers(data[0].members);
          setboardstyle(data[0].boardstyle);
          setcreate_date(data[0].create_date);
          setIngredient(data.recipeStuffArray);
        } catch (error) {
          console.log("Error!", error);
        }
      };

      fetchRecipeHelper();
    }, []);
  return (
    <div>
    <NavBar />
    <Wrap>
      <Main>

      <ListTitle>{board_idx} : {title}</ListTitle>
      <Post_view_wrapper>
              <Post_view_row>
                <label>게시글 번호</label>
                <label>{ board_idx }</label>
              </Post_view_row>
              <Post_view_row1>
                <label>제목</label>
                <label>{ title }</label>
              </Post_view_row1>
              <Post_view_row1>
                <label>작성일</label>
                <label>{ create_date }</label>
              </Post_view_row1>
              {/* <div className="post-view-row">
                <label>조회수</label>
                <label>{  }</label>
              </div> */}
              <Post_view_row2>
                <label>내용</label>
                {/* <div dangerouslySetInnerHTML={{ __html: content }}></div>; */}
              </Post_view_row2>
        <button className="post-view-go-list-btn">목록으로 돌아가기</button>
      </Post_view_wrapper>
          <Slider cards={cards} selectIdx={selectIdx} />{content} {members}
          {/* {SliderContent} */}
        </Main>
      </Wrap>
    </div>
  );
};

export default Recipe;
