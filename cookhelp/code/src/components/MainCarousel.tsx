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
    return (
      <CarouselWrapper>
        <Carousel>
          <Paper>
            <CarouselItemImg src="https://thumbs.dreamstime.com/b/healthy-food-selection-healthy-food-selection-fruits-vegetables-seeds-superfood-cereals-gray-background-121936825.jpg" />
            <ItemTitle>완전 건강해 보이는 요리</ItemTitle>
            <ItemText>완전 건강해 보이는 요리의 레시피입니다. 닭가슴살과 아보카도, 방울토마토, 연어, 어쩌구</ItemText>
          </Paper>
          <Paper>
            <CarouselItemImg src="https://www.chickensaladchick.com/assets/mainstage/mainstage-img.jpg" />
            <ItemTitle>치킨 샐러드 샌드위치</ItemTitle>
            <ItemText>치킨 샐러드 샌드위치의 레시피입니다. 통밀 베이글에 양상추와 토마토, 어쩌구를 넣어서 </ItemText>
          </Paper>
          <Paper>
            <CarouselItemImg src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chan-walrus-958545.jpg&fm=jpg" />
            <ItemTitle>커리와 치킨</ItemTitle>
            <ItemText>치킨 티카 마살라와 탄두치 치킨의 레시피입니다. </ItemText>
          </Paper>
        </Carousel>
      </CarouselWrapper>
    );
  };

  export default MainCarousel;