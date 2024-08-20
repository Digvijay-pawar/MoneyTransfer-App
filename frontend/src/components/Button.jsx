function Button({label, onClick}) {
    return ( 
        <button onClick={onClick} className="bg-black w-full py-2 text-white font-bold rounded px-3">{label}</button>
     );
}

export default Button;