import { Classroom } from "./classroom";

export interface Account {
  id: number;
  name: string;
  classes: Classroom[];
}

