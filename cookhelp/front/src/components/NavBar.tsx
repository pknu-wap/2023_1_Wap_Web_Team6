import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

type TabProps = {
  isActive: boolean;
};

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--green-color);
  color: #fff;
  cursor: pointer;
`;

const MenuWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const MenuItem = styled.div<TabProps>`
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isActive ? "white" : "transparent")};
  color: ${(props) => (props.isActive ? "black" : "var(--mint-color)")};

  &:hover {
    background-color: #fff;
    color: black;
  }
`;

const AuthButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const AuthButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
`;



const Navbar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(0); // 현재 활성화된 메뉴 아이템의 인덱스를 상태로 관리
  const [mode, setMode] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8081/members/api/authcheck", {credentials: 'include'})
      .then((res) => res.json())
      .then((json) => {        
        if (json.isLogin === "True") {
          console.log('hello')
          setMode("WELCOME");
          console.log(json)
        }
        else {
          console.log(json)
          setMode("LOGIN");
        }
      });
  }, []); 

  let content:any = null;  

  if(mode==="LOGIN"){
    content = <>
    <AuthButton onClick={() => navigate("/login")}>로그인</AuthButton> 
    <AuthButton onClick={() => navigate("/Join")}>회원가입</AuthButton>
    </>
  }
  else if (mode === 'WELCOME') {
    content = <>
    <AuthButton onClick={() => navigate("/myPage")}>마이페이지</AuthButton>
    <AuthButton onClick={() => navigate("")}>로그아웃</AuthButton>
    </>
  }

  const handleMenuItemClick = (menuItemIndex: number) => {
    setActiveMenuItem(menuItemIndex);
  };

  return (
    <NavbarWrapper>
      <img
        src="/logo.png"
        alt="logo"
        width="180px"
        onClick={() => {
          navigate("/");
          handleMenuItemClick(0);
        }}
      />
      <MenuWrapper>
        <MenuItem
          isActive={activeMenuItem === 1}
          onClick={() => {
            handleMenuItemClick(1);
            navigate("/recipe_list");
          }}
        >
          Recipe
        </MenuItem>
        <MenuItem
          isActive={activeMenuItem === 2}
          onClick={() => handleMenuItemClick(2)}
        >
          Community
        </MenuItem>
      </MenuWrapper>

      <AuthButtonsWrapper>
        {content}
      </AuthButtonsWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
