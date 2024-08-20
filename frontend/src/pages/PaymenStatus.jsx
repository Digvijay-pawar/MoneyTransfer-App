import { Link, useSearchParams } from "react-router-dom";

function PaymentStatus() {
    const [searchParams] = useSearchParams()
    const status = searchParams.get("status")
    const amount = searchParams.get("amount")
    console.log(status)
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className={`bg-${status == "Completed" ? "green" : "red"}-400 rounded-lg w-96 py-5 text-center px-5`}>
                    <div className="flex flex-row text-white mt-4 justify-center">
                        <div className={`rounded-full h-12 w-12 bg-${status == "Completed" ? "green" : "red"}-600 flex justify-center`}>
                            <div className="flex uppercase flex-col justify-center h-full text-xl">
                                {status == "Completed" ? "✔️" : "✖️"}
                            </div>
                        </div>
                    </div>
                    <div className="w-full text-black font-bold text-2xl mt-3">Payment {status == "Completed" ? "Completed" : "Failed"}</div>
                    <div className="text-black font-medium text-xl">Amount: ${amount}</div>
                    <div className="text-white my-3">Go to <Link className="underline" to={"/dashboard"}>Home</Link></div>
                </div>
            </div>
        </div>
    );
}

export default PaymentStatus;