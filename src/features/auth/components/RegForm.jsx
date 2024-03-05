import React, {useState} from "react";
import {Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon.jsx";
import {EyeFilledIcon} from "./EyeFilledIcon.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../../config/firebase.js";
import Alert from "./ErrorAlert.jsx";

export default function RegForm() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const signUp = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/profile");
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
                console.log(errorMessage);
            });
    }

    return (
        <div className="max-w-[400px] w-full">
            <Card className="min-w-0">
                <CardHeader>
                    <h2 className='text-center'>Sign Up</h2>
                </CardHeader>
                {error && <Alert error={error}></Alert>}
                <CardBody className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input type="text" label="Username" variant="bordered" size="md"/>
                    <Input
                        isRequired
                        type="email"
                        label="Email"
                        valie={email}
                        size="md" variant="bordered"
                        onChange={(e) => setEmail(e.target.value)}/>
                    <Input isRequired
                           label="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           variant="bordered"
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
                    <Button type="submit" color="primary" onClick={signUp}>
                        Submit
                    </Button>
                    <p>Already have an account?<NavLink to="/login"> Log In</NavLink></p>
                </CardBody>
            </Card>
        </div>

    );
}