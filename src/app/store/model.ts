export interface AppState {
  wordsLoading: boolean;
  words: string[];
  wordsError: string | null;
}

export const initialAppState: AppState = {
  words: [],
  wordsError: null,
  wordsLoading: false
};
