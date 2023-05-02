import NavBar from "../components/NavBar";
import Carousel from "react-material-ui-carousel";
import { Paper, Grid, Card } from '@mui/material'
import styled from "styled-components";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
`;

const MainCarousel = () => {
  return (
    <CarouselWrapper>
      <Carousel>
        <Paper>
          <CarouselItemImg src="https://thumbs.dreamstime.com/b/healthy-food-selection-healthy-food-selection-fruits-vegetables-seeds-superfood-cereals-gray-background-121936825.jpg" />
          <h2>완전 건강해 보이는 요리</h2>
          <p>완전 건강해 보이는 요리의 레시피입니다. 닭가슴살과 아보카도, 방울토마토, 연어, 어쩌구</p>
        </Paper>
        <Paper>
          <CarouselItemImg src="https://www.chickensaladchick.com/assets/mainstage/mainstage-img.jpg"/>
          <h2>치킨 샐러드 샌드위치</h2>
          <p>치킨 샐러드 샌드위치의 레시피입니다. 통밀 베이글에 양상추와 토마토, 어쩌구를 넣어서 </p>
        </Paper>
        <Paper>
          <CarouselItemImg src="./temp.png"/>
          <h2>Recipe 3</h2>
          <p>This is sample paragraph ! </p>
        </Paper>
      </Carousel>
    </CarouselWrapper>
  );
};

const SlideWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: auto; 
  margin-top: 50px;
  gap: 20px;
`;

// JSX에서는 props를 객체 형태로 전달하기 때문에 props의 타입도 객체 형태로 정의해줘야 함!!
type FoodGenreProps = {
  genreName: string;
}

function FoodGenre(props :FoodGenreProps) {
  return (
      <Card sx={{ maxWidth: 200 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="./temp.png"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.genreName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  );
};

// const CardSlide = () => {
//   return (
//     <SlideWrapper>
//       <Carousel>
//       <Grid container spacing={2}> {/*간격 2px*/}
//         <Grid item xs={6} sm={3}>
//           <Paper>
//             <CardItem />
//           </Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper>Item 2</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper>Item 3</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper>Item 4</Paper>
//         </Grid>
//       </Grid>
//     </Carousel>
//     </SlideWrapper>
//   );
// };

const Main = () => {
  return <div>
    <NavBar />
    <MainCarousel />
    <SlideWrapper>
      <FoodGenre genreName = "한식" />
      <FoodGenre genreName = "중식" />
      <FoodGenre genreName = "일식" />
      <FoodGenre genreName = "양식" />
    </SlideWrapper>
  </div>;
};

export default Main;
