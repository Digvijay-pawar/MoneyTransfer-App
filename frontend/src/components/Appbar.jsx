function Appbar() {
    
    return ( 
        <div className="shadow py-3 flex justify-between px-5">
            <div className="flex flex-col justify-center h-full align-item text-2xl font-boldd">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                <div className="rounded-full h-8 w-8 bg-slate-200 flex justify-center">
                    <div className="flex flex-col justify-center h-full text-xl">
                        D
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Appbar;