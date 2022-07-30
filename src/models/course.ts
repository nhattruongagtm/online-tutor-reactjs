import { TutorItem } from '../components/Home/TutorItem';
export interface Course {
  id: number;
  name: string;
  learningDate: number;
  subjectName: string;
  status: number;
  duration: number;
  tutor: any
}
