import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalysisResult {
  score: number;
  matches: string[];
  missing: string[];
}

interface AppState {
  activeTab: string;
  isDark: boolean;
  analysis: {
    jobTitle: string;
    skillsRequired: string;
    location: string;
    isAnalyzing: boolean;
    progress: number;
    result: AnalysisResult | null;
  };
}

const initialState: AppState = {
  activeTab: 'home',
  isDark: false,
  analysis: {
    jobTitle: '',
    skillsRequired: '',
    location: '',
    isAnalyzing: false,
    progress: 0,
    result: null,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDark = !state.isDark;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
    setJobDetails: (state, action: PayloadAction<{ jobTitle?: string; skillsRequired?: string; location?: string }>) => {
      state.analysis = { ...state.analysis, ...action.payload };
    },
    startAnalysis: (state) => {
      state.analysis.isAnalyzing = true;
      state.analysis.progress = 0;
      state.analysis.result = null;
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      state.analysis.progress = action.payload;
    },
    completeAnalysis: (state, action: PayloadAction<AnalysisResult>) => {
      state.analysis.isAnalyzing = false;
      state.analysis.progress = 100;
      state.analysis.result = action.payload;
    },
    resetAnalysis: (state) => {
      state.analysis.isAnalyzing = false;
      state.analysis.progress = 0;
      state.analysis.result = null;
    },
  },
});

export const { 
  setActiveTab, 
  toggleDarkMode, 
  setDarkMode, 
  setJobDetails, 
  startAnalysis, 
  updateProgress, 
  completeAnalysis,
  resetAnalysis
} = appSlice.actions;

export default appSlice.reducer;
