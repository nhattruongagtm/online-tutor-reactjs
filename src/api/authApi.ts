import Login from "../components/Auth/Login/Login";
import signUpInfoReducer from "../reducers/signUpInfo";
import axiosClient from "./axiosClient"
interface SignUpInput{
    email: string;
    password: string;
    phone: string;
    fullName: string;
    city: string;
    district: string;
    gender: boolean;


}
export const authApi = {
    async sendMailToSignUp(email: string){
        
        const url = `/send-mail/${email}`;

        // return await axiosClient.post(url).catch(e=>{console.log(e)})

        // fake code
        return '123456';
    },
    async signUp(input: SignUpInput){
        const url = '/sign-up';
        // return await axiosClient.post(url,input).catch(e=> console.log(e));
        return true;  
    },
    async login(email: string){
        

    }
}