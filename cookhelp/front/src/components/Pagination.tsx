import React from "react";
import styled from "styled-components";
import { PaginationProps } from "./type";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: var(--dark-green-color);
  color: white;
  font-size: 1rem;

  &:hover {
    background: var(--green-color);
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: var(--gray-color);
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: var(--green-color);
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const Pagination = ({ totalPage, limit, page, setPage }: PaginationProps) => {
  const numPages = Math.ceil(totalPage / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill(null, 0, numPages)
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
};

export default Pagination;
