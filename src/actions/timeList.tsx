import { TimeItemProps } from "../components/FindTutorList/FindTutorList"
export const updateDate = (payload: TimeItemProps) =>{
    return {
        type: "UPDATE_DATE",
        payload: payload,
    }
}
