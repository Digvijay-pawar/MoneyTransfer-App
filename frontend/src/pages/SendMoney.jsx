import { useState } from "react";
import { Header } from "../components/Header";
import InputBox from "../components/InputBox";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SendMoney() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-96 text-center px-5">
                    <Header label={"Send Money"} />
                    <div className="flex text-white mt-4">
                        <div className="rounded-full h-10 w-10 bg-green-500 flex justify-center">
                            <div className="flex uppercase flex-col justify-center h-full text-xl">
                                {name[0]}
                            </div>
                        </div>
                        <div className="flex flex-col mt-1 text-black font-medium text-xl justify-center h-full mx-3">
                            {name}
                        </div>
                    </div>
                    <InputBox onChange={(e) => setAmount(e.target.value)} placeholder={"Enter amount"} label={"Amount (in RS)"} />
                    <div className="py-4">
                        <button onClick={async () => {
                            try {
                                const response = await axios.post("http://localhost:3000/api/v1/account/transfer",
                                    { amount, to: id },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem("token")}`
                                        }
                                    }

                                )
                                if (response.data.message) {
                                    console.log(response.data)
                                    navigate("/payment-status?status=Completed&amount="+amount)
                                } else{
                                    navigate("/payment-status?status=Failed&amount="+amount)        
                                }
                            }catch(error){
                                navigate("/payment-status?status=Failed&amount="+amount)
                            }
                        }} className="btn py-2 rounded bg-green-500 w-full text-white font-medium">Initiate Transfer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SendMoney;