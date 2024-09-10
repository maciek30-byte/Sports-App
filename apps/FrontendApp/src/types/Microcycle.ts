export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  completed: boolean;
  goalMet: boolean;
}

export interface WorkoutPlan {
  day: string;
  type: 'workout';
  exercises: Exercise[];
}

export interface RestPlan {
  day: string;
  type: 'rest';
}

export type DayPlan = WorkoutPlan | RestPlan;

export interface Microcycle {
  startDate: Date;
  endDate: Date;
  dayPlans: {
    [key: string]: DayPlan;
  };
  weekCount: number;
}
