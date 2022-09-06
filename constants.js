import { Dimensions } from "react-native";

export const {width:SCREEN_WIDTH,height:SCREEN_HEIGHT} = Dimensions.get('window');
export const SQUARES_IN_HORIZONTAL = 8;
export const SQUARE_CONTAINER_SIZE = SCREEN_WIDTH/SQUARES_IN_HORIZONTAL;
export const PADDING = 20;
export const SQUARE_SIZE = SQUARE_CONTAINER_SIZE - PADDING;
export const SQUARES_IN_VERTICAL = Math.floor(SCREEN_HEIGHT/SQUARE_CONTAINER_SIZE+7);
export const CANVA_WIDTH = SCREEN_WIDTH;
export const CANVA_HEIGHT = SQUARES_IN_VERTICAL * SQUARE_SIZE;
export const MAX_DISTANCE = Math.sqrt(CANVA_WIDTH**2+CANVA_HEIGHT**2);