import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Paper } from '@mui/material'
import styled from "styled-components";

const CarouselWrapper = styled.div`
  //align-items: center;
  //justify-content: center;
  width: 60%;
  margin: auto; 
  margin-top: 50px;
`;

const CarouselItemImg = styled.img`
  height: 350px;
  width: 100%;
  //min-width: 400px;
  margin-bottom: -10px;
  object-fit:cover;
`;

const ItemTitle = styled.h2`
  font-weight: var(--semiBold-font);
  margin-bottom: -10px;
`;

const ItemText = styled.p`
  padding-bottom: 15px;
`;

const MainCarousel = () => {
  const [recipeTitle, setRecipeTitle] = useState<string[]>([]);
  const [recipeImg, setRecipeImg] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeCard = async () => {
      try {
        const titlePromises = [1, 2, 3].map(async (id) => {
          const res = await fetch(`http://localhost:8081/board/api/recipehelper/${id}`);
          const data = await res.json();

          return data.result[0]?.recipe_title || "";
        });

        const titles = await Promise.all(titlePromises);
        setRecipeTitle(titles);
      } catch (error) {
        console.log("Error!", error);
      }
    };

    fetchRecipeCard();
  }, []);

  useEffect(() => {
    const fetchRecipeImg = async () => {
      try {
        const imgPromises = [1, 2, 3].map(async (id) => {
          const res = await fetch(`http://localhost:8081/board/api/recipehelperimg/${id}`);
          const data = await res.json();

          return data.result[0]?.recipe_img || "";
        });

        const thumbnail = await Promise.all(imgPromises);
        setRecipeImg(thumbnail);
      } catch (error) {
        console.log("Error!", error);
      }
    };

    fetchRecipeImg();
  }, []);


  const handlePaperClick = (id: number) => {
    navigate(`/recipe_detail/${id}`);
  };

  return (
    <CarouselWrapper>
      <Carousel>
        <Paper onClick={() => {handlePaperClick(1)}}>
          <CarouselItemImg src={recipeImg[0]} />
          <ItemTitle>{recipeTitle[0]}</ItemTitle>
          <ItemText>{recipeTitle[0]} </ItemText>
        </Paper>
        <Paper onClick={() => {handlePaperClick(2)}}>
          <CarouselItemImg src={recipeImg[1]} />
          <ItemTitle>{recipeTitle[1]}</ItemTitle>
          <ItemText>{recipeTitle[1]} </ItemText>
        </Paper>
        <Paper onClick={() => {handlePaperClick(3)}}>
          <CarouselItemImg src={recipeImg[2]}/>
          <ItemTitle>{recipeTitle[2]}</ItemTitle>
          <ItemText>{recipeTitle[2]} </ItemText>
        </Paper>
      </Carousel>
    </CarouselWrapper>
  );
};

export default MainCarousel;