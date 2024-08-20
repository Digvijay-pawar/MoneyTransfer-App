import { useEffect, useState } from 'react';
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
function Users() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    async function fetchUsers(){
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                filter: search
            }
        })
        if(response.statusText == "OK"){
            setUsers(response.data.user)
        }
    }

    useEffect(()=>{
        fetchUsers()
    }, [search])
    return (
        <div className="mt-4 px-5">
            <span className="font-medium">Users</span>
            <input onChange={(e) => setSearch(e.target.value)} type="text" className="mt-2 w-full border py-1 px-3" placeholder="Search users" />
            {users.map((user) => {
                return(<User lastName={user.lastName} username={user.firstName} id={user._id} key={user._id}/>)
            })}
        </div>
    );
}

function User({username, id, lastName}) {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between py-2">
            <div className="flex">
                <div className="rounded-full h-8 w-8 bg-slate-200 flex justify-center">
                    <div className="flex flex-col uppercase justify-center h-full text-xl">
                        {username[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full mx-3">
                    {username}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full align-item text-sm font-boldd">
                <Button onClick={(e) => {
                    navigate(`/send?id=${id}&name=${username + " " + lastName}`)
                }} label={"Send Money"}/>
            </div>
        </div>
    )
}

export default Users;