export interface RecipeListType {
  id: number;
  ListNum: number;
  pic: string;
  detail: string;
  stepTitle: string;
  timer?: number;
}

export interface RecipeCard {
  id: number;
  RecipeName: string;
  FoodType: string;
  cards: RecipeListType[];
  Ingredient: string[];
}

export interface CardProps {
  currentCard: RecipeListType;
}

export interface ArrowButtonProps {
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

export interface searchData {
  recipe_idx: number;
  img?: string;
  recipe_title: string;
  members: string;
  created_date: string;
  views?: number;
}

export interface RecipeItemProps {
  RecipeId: number;
  RecipeTitle: string;
  RecipeWriter: string;
  RecipeDate: string;
  to: string;
}

export interface fetchRecipeList {
  created_date: string;
  foodstyle: string;
  members: string;
  recipe_idx: number;
  recipe_title: string;
}

export interface ListProps {
  stepDetail: string;
  listNum: number;
  setSelectIdx: React.Dispatch<React.SetStateAction<number>>;
}

export interface RecipeSeqProps {
  countList: number[];
  handleImgUpload: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}
