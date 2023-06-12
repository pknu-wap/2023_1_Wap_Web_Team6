import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Container from "../UI/Container";
import searchLogo from "../assets/searchLogo.png";
import BoardItem from "../components/BoardItem";
import { fetchBoardList, boardsearchData } from "../components/type";
import { useNavigate, useLocation } from "react-router-dom";
import Btn from "../UI/Btn";
import Pagination from "../components/Pagination";

const BoardListContainer = styled(Container)`
  max-width: 60rem;
  width: 70%;
  height: 40rem;
  margin-bottom: 5rem;
  display: flex;
`;
const StyleSearchLogo = styled.div`
  width: 34px;
  padding-left: 0.5rem;
  padding-top: 1rem;
`;
const LogoImg = styled.img`
  width: 100%;
  cursor: pointer;

`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;
const SearchInput = styled.input`
  margin-top: 0.5rem;
`;
const ListBox = styled.div`
  background-color: var(--light-gray-color);
  width: 90%;
  height: 500px;
`;
const RegisterBtn = styled(Btn)`
  margin-left: auto;
  margin-right: 5rem;
`;
const StyleBtnContainer = styled.div`
  position: relative;
  left: 12rem;
  top: 4rem;
  display: flex;
  gap: 0.7rem;
`;
const ItemBtn = styled.button<{ isActive: boolean }>`
  padding: 10px;
  font-size: 16px;
  background-color: ${({ isActive }) =>
    isActive ? "var(--green-color)" : "var(--light-gray-color)"};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;

  position: relative;
  left: 18rem;
`;

const BoardList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let genreName = searchParams.get("genreName");
  const [listData, setListData] = useState([]);
  const boardstyle = ["전체", "공지사항", "QnA", "자유게시판"];
  const [clickedCategory, setClickCategory] = useState(
    genreName ? genreName : "전체"
  );
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const [keyword, setKeyword] = useState("");
  // const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://ec2-3-34-47-79.ap-northeast-2.compute.amazonaws.com:8081/community/api/list");
        const data = await res.json();

        if (!res.ok) {
          console.log("error : ", data.description);
          return;
        }

        clickedCategory === "전체"
          ? setListData(data)
          : setListData(
            data.filter(
              (item: fetchBoardList) => item.boardstyle === clickedCategory
            )
          );
      } catch (error) {
        console.log("Error!", error);
      }
    };

    fetchData();
    // console.log(listData);
  }, [clickedCategory]);

  const handleFoodClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickCategory(e.currentTarget.name);
  };

  const BoardSearch = async () => {
    try {
      const res = await fetch(
        `http://ec2-3-34-47-79.ap-northeast-2.compute.amazonaws.com:8081/community/api/search/${keyword}`
      );
      const data = await res.json();
      console.log(keyword);
      console.log(data);
      if (!res.ok) {
        console.log("error : ", data.description);
        return;
      }
      
      setListData(data);

    } catch (error) {
      console.log("Error!", error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
  };

    return (
      <>
        <Navbar />
        <StyleBtnContainer>
          {boardstyle.map((elm, idx) => {
            return (
              <ItemBtn
                type="button"
                key={idx}
                onClick={handleFoodClick}
                name={elm}
                isActive={clickedCategory === elm}
              >
                {elm}
              </ItemBtn>
            );
          })}
        </StyleBtnContainer>
        <BoardListContainer>
          <LogoBox>
            <SearchInput placeholder="레시피 검색" onChange={handleInputChange}></SearchInput>
            <StyleSearchLogo>
              <LogoImg src={searchLogo}
                onClick={BoardSearch}
              ></LogoImg>
            </StyleSearchLogo>
          </LogoBox>
          <ListBox>
            {listData
              .slice(offset, offset + limit)
              .map((ele: boardsearchData, index: number) => {
                //const date = ele.created_date.slice(0, 10);
                return (
                  <BoardItem
                    key={ele.board_idx}
                    to={`/board/${ele.board_idx}`}
                    BoardIdx={ele.board_idx}
                    BoardTitle={ele.title}
                    BoardWriter={ele.members}
                    BoardDate={ele.create_date}
                    BoardStyle={ele.boardstyle}
                  />
                );
              })}
          </ListBox>
          <Pagination
            totalPage={listData.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <RegisterBtn onClick={() => navigate("/board_register")}>
            게시글 등록
          </RegisterBtn>
        </BoardListContainer>
      </>
    );
  };

export default BoardList;
