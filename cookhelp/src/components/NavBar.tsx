import React, { useState } from "react";
import styled from "styled-components";

interface TabProps {
    isActive: boolean;
}

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #678570;
  color: #fff;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
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
  color: ${(props) => (props.isActive ? "black" : "#DCFBE5")};

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
`;

const Navbar: React.FC = () => {
    const [activeMenuItem, setActiveMenuItem] = useState(1); // 현재 활성화된 메뉴 아이템의 인덱스를 상태로 관리

    const handleMenuItemClick = (menuItemIndex: number) => {
        setActiveMenuItem(menuItemIndex);
    };

    return (
        <NavbarWrapper>
            <Logo>YORIJORI</Logo>
            <MenuWrapper>
                <MenuItem isActive={activeMenuItem === 1} onClick={() => handleMenuItemClick(1)}>
                    Recipe
                </MenuItem>
                <MenuItem isActive={activeMenuItem === 2} onClick={() => handleMenuItemClick(2)}>
                    Community
                </MenuItem>
            </MenuWrapper>
            <AuthButtonsWrapper>
                <AuthButton>로그인</AuthButton>
                <AuthButton>회원가입</AuthButton>
            </AuthButtonsWrapper>
        </NavbarWrapper>
    );
}

export default Navbar;