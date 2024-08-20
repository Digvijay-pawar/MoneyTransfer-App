import { useEffect, useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import InputBox from "../components/InputBox";
import { SubHeader } from "../components/SubHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
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
                <div className="bg-white rounded-lg w-96 text-center px-5">
                    <Header label={"Sign in"}/>
                    <SubHeader label={"Enter your detail login an account"}/>
                    <InputBox onChange={(e) => setUsername(e.target.value)} placeholder={"john@gmail.com"} label={"Email"}/>
                    <InputBox onChange={(e) => setPassword(e.target.value)} placeholder={"132123123"} label={"Password"}/>
                    <div className="pt-4">
                        <Button onClick={async() => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/sign-in", {
                                username, password
                            })
                            if(response.statusText){
                                localStorage.setItem("token", response.data.token)
                                navigate("/dashboard")
                            }
                        }} label={"Sign in"}/>
                    </div>
                    <Footer label={"Don't have an account?"} linkText={"Sign up"} to={"/"}/>
                </div>
            </div>
        </div>
     );
}

export default Signin;