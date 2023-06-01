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
  handleImgUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleValueChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export interface PaginationProps {
  totalPage: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface RegisterData {
  recipe_title: string;
  recipe_stuff: string;
  foodstyle: string;
  recipe_img: string[];
  members: string;

  recipe_step_1: string;
  recipe_step_2: string;
  recipe_step_3: string;
  recipe_step_4: string;
  recipe_step_5: string;
  recipe_step_6: string;
  recipe_step_7: string;
  recipe_step_8: string;
  recipe_step_9: string;
  recipe_step_10: string;

  rd_1: string;
  rd_2: string;
  rd_3: string;
  rd_4: string;
  rd_5: string;
  rd_6: string;
  rd_7: string;
  rd_8: string;
  rd_9: string;
  rd_10: string;

  timer_rd_1: string;
  timer_rd_2: string;
  timer_rd_3: string;
  timer_rd_4: string;
  timer_rd_5: string;
  timer_rd_6: string;
  timer_rd_7: string;
  timer_rd_8: string;
  timer_rd_9: string;
  timer_rd_10: string;
}

export interface DeckData {
  [key: string]: string | null;
}
