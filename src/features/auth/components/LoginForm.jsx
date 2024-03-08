import React, {useState} from "react";
import {Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon.jsx";
import {EyeFilledIcon} from "./EyeFilledIcon.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../config/firebase.js";
import Alert from "./ErrorAlert.jsx";


export default function LoginForm() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const logIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate(`/profile/${user.uid}`);
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    return (
        <div className="max-w-[400px] w-full">
            <Card className="min-w-0">
                <CardHeader>
                    <h2 className='text-center'>Log In</h2>
                </CardHeader>
                {error && <Alert error={error}></Alert>}
                <CardBody className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input isRequired type="email" label="Email" size="md" variant="bordered" onChange={(e) => setEmail(e.target.value)}/>
                    <Input isRequired label="Password" variant="bordered" onChange={(e) => setPassword(e.target.value)}
                           endContent={
                               <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                   {isVisible ? (
                                       <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                   ) : (
                                       <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                   )}
                               </button>
                           }
                           type={isVisible ? "text" : "password"}
                           className="max-w-md"
                    />
                    <Button type="submit" color="primary" onClick={logIn}>
                        Log In
                    </Button>
                    <p>Don`t have an account?<NavLink to="/signup"> Sign Up</NavLink></p>
                </CardBody>
            </Card>
        </div>

    );
}