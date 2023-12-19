import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const SocailLogin=()=> {
    const { googleSignIn } = useContext(AuthContext);
    // const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const  location = useLocation()
    const from = location.state?.from?.pathname || "/";


    const handleGoogleSignIn = () =>{
        googleSignIn()

   .then(result => {

    
    const   loggedInUser =result.user;
    console.log(loggedInUser)

        const  saveUser = {name: loggedInUser.name, email:loggedInUser.email}
        fetch ("http://localhost:5000/users",{
            method: "POSt",
            headers: {
                'content-type':"application/json"
            },
            body: JSON.stringify(saveUser)
        })
   
        .then(res=>res.json())
        .then(()=> {
           
                

        navigate(from,{relative : true} )
    
        })
  
   })




   
      
    }

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocailLogin;