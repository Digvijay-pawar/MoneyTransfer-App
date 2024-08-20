import axios from "axios";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from '../components/Users'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const [balance, setBalance] = useState(0)
    const navigate = useNavigate()
    async function validateUser(){
        const token = localStorage.getItem("token")
        if(!token){
           navigate("/")
        }
    }

    async function fetchBalance(){
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.statusText == "OK"){
            console.log(response.data.balance)
            setBalance(response.data.balance)
        }
    }

    useEffect(() => {
        validateUser()
        fetchBalance()
    },[])
    return (
        <div>
            <Appbar />
            <Balance value={balance}/>
            <Users/>
        </div>
    );
}

export default Dashboard;