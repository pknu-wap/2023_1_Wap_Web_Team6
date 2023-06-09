import { Card } from "@mui/material";
import styled from "styled-components";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

const CardWrapper = styled(Link)`
  flex-basis: 0;
  flex-grow: 1;
  margin-bottom: 30px;
  text-decoration-line: none;
`;

const CardTitle = styled.div`
  font-weight: var(--semiBold-font);
  margin-top: -5px;
`;

type FoodGenreCardsProps = {
  genreName: string;
  imgSrc: string;
};

function FoodGenreCards(props: FoodGenreCardsProps) {
  return (
    <CardWrapper
      to={{ pathname: "/recipe_list", search: `?genreName=${props.genreName}` }}
    >
      <Card sx={{ maxWidth: 200 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={props.imgSrc} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <CardTitle>{props.genreName}</CardTitle>
            </Typography>
            {/*  <Typography variant="body2" color="text.secondary">
              Sample Paragraph
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </CardWrapper>
  );
}

export default FoodGenreCards;
