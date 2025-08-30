import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RiskAssessment {
  id: string;
  answers: Record<string, number>;
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  date: string;
  farmName: string;
}

interface RiskStore {
  assessments: RiskAssessment[];
  currentAssessment: RiskAssessment | null;
  saveAssessment: (assessment: RiskAssessment) => void;
  deleteAssessment: (id: string) => void;
  setCurrentAssessment: (assessment: RiskAssessment | null) => void;
}

export const useRiskStore = create<RiskStore>()(
  persist(
    (set, get) => ({
      assessments: [],
      currentAssessment: null,
      saveAssessment: (assessment) => {
        set((state) => ({
          assessments: [assessment, ...state.assessments],
          currentAssessment: assessment,
        }));
      },
      deleteAssessment: (id) => {
        set((state) => ({
          assessments: state.assessments.filter(a => a.id !== id),
        }));
      },
      setCurrentAssessment: (assessment) => {
        set({ currentAssessment: assessment });
      },
    }),
    {
      name: 'risk-assessments',
    }
  )
);