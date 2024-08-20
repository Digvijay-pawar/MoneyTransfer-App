import { Header } from "../components/Header";
import InputBox from "../components/InputBox";
import { SubHeader } from '../components/SubHeader'
import Button from '../components/Button'
import Footer from "../components/Footer";
import { useState, useEffect} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    function validateUser(){
        const token = localStorage.getItem("token")
        if(token){
            navigate("/dashboard")
        }
    }

    useEffect(() => {
        validateUser()
    })

    return ( 
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center  px-5">
                    <Header label={"Sign up"}></Header>
                    <SubHeader label={"Enter your information to create an account"}></SubHeader>
                    <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label="First name"/>
                    <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Wick" label="Last name"/>
                    <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="john@gmail.com" label="Email"/>
                    <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="12321231" label="Create password"/>
                    <div className="pt-4">
                        <Button onClick={async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/sign-up", {
                                username, firstName, lastName, password
                            })
                            if (response.statusText == 'OK'){
                                localStorage.setItem("token", response.data.token)
                                navigate('/dashboard')
                            }
                        }} label="Sign up"/>
                    </div>
                    <Footer label="Already have an account?" linkText="Sign in" to="/signin"/>
                </div>
            </div>
        </div>
     );
}

export default Signup;