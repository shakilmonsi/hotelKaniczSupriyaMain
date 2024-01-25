import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers=()=> {
    
 //   const {data: users = [],refetch}=useQuery(["users"],async()=>{
//     const res = await fetch ("http://localhost:5000/users")
//     return res.json()
//   })

    
const { data: users = [], isLoading, isError ,refetch} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/users');
      return res.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
  const  handleMakeAdmin  = user  =>{
    fetch (`http://localhost:5000/users/admin/${user._id}`, {
        method : "PATCH",

    })
    .then(res=>res.json())
    .then(data=> {
        console.log(data)
        if(data.modifiedCount){
            refetch()
            
            Swal.fire({
                position: "top-end",
                title: `${user.name } is an admin new`,
                icon: "seccess",
                showCancelButton: true,
              timer: 1500
            })
        }

    })

  }
  const handleDelete = user =>{

  }

return (

    <div>
    <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
    </div>
    <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
            {/* head */}
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => <tr key={user._id}>
                        <th>{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                                { user.role === 'admin' ? 'Admin' : <button
                                    onClick={() => handleMakeAdmin(user)}
                                    className="btn btn-lg bg-orange-500">
                                    <FaUsers className="text-white 
                                    text-2xl"></FaUsers>
                                </button>}
                            </td>


                        <td>
                                <button
                                    onClick={() => handleDeleteUser(user)}
                                    className="btn btn-ghost btn-lg">
                                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                </button>
                            </td>
                    </tr>)
                }

            </tbody>
        </table>
    </div>
</div>

    
);
}




export default AllUsers;