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
  
  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    localStorage.setItem('isLogin', "False");
    localStorage.setItem('loginId', "");
    alert("로그아웃 완료 되었습니다!")
    setMode("LOGIN");
    // e.preventDefault(); // 버튼 클릭의 기본 동작 중지
    // fetch("http://localhost:8081/members/api/logout", {
    //   //auth 주소에서 받을 예정
    //   method: "post", // method :통신방법
    //   headers: {
    //     // headers: API 응답에 대한 정보를 담음
    //     "content-type": "application/json",
    //   }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log('click')
    //     if(data.isLogout==="True"){
    //       alert('로그아웃 완료되었습니다!')
    //       navigate("/");
    //     }
    //     else{
    //       console.log(data)
    //       alert(data.isLogin)
    //     }
    //   })
    //   .catch(error => console.log("error =>", error))
  };

  const navigate = useNavigate();
  const id = localStorage.getItem('loginId')
  useEffect(() => {
    if(localStorage.getItem('isLogin') === "True"){
      setMode("WELCOME")
    } else{
      setMode("LOGIN")
    }
  //   fetch("http://localhost:8081/members/api/authcheck", {credentials: 'include'})
  //     .then((res) => res.json())
  //     .then((data) => {        
  //       localStorage.setItem('sessionID', data.sessionID);
  //       console.log()
  //       if (data.isLogin === "True") {
  //         console.log('hello')
  //         setMode("WELCOME");
  //         console.log(data)
  //       }
  //       else {
  //         console.log(data)
  //         setMode("LOGIN");
  //       }
  //     });
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
    <AuthButton onClick={() => navigate(`/myPage/${id}`)}>{id}</AuthButton>
    <AuthButton onClick={handleBtnClick}>로그아웃</AuthButton>
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
