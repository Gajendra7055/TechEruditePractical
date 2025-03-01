export interface Event {
    [x: string]: any;
    id: number;
    title: string;
    description: string;
  }
  
  export interface LoginResponse {
    token: string;
  }
  
  export interface FavoritesState {
    items: Event[];
  }