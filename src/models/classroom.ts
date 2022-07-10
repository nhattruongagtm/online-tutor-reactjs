import { LearningDate } from "../components/WaitingClassList/WaitingClassList";

export interface Register {
  tutor: {
    id: number;
  };
  post: {
    id: number;
  };
  quantity: number;
  status: number;
}
export interface Classroom {
  id: number;
  name: string;
  schedules: LearningDate[];
  subjectName: string;
  status: number;
  duration: number;
  learningDate: number;
}
