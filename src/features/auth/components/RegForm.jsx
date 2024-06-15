import React, {useState, useContext} from "react";
import {Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon.jsx";
import {EyeFilledIcon} from "./EyeFilledIcon.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db} from "../../../config/firebase.js";
import Alert from "./ErrorAlert.jsx";
import {doc, setDoc} from "firebase/firestore";
import {Text} from "../../../main.jsx";
import {LanguageContext} from "../../../containers/Language.jsx";

export default function RegForm() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { dictionary } = useContext(LanguageContext);

    const signUp = async (e) => {
        e.preventDefault();
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: name,
            });
            navigate(`/profile/${user.uid}`);
        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
            console.log(errorMessage);
        }

        const user = auth.currentUser;
        const newUser = {
            name,
            email,
            uid: user.uid,
            role: 'user',
        };

        try {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, newUser)
        } catch (error){
            console.log(error)
        }

    }

    return (
        <div className="max-w-[400px] w-full">
            <Card className="min-w-0">
                <CardHeader>
                    <h2 className='text-center'><Text tid="sign up"/></h2>
                </CardHeader>
                {error && <Alert error={error}></Alert>}
                <CardBody className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                        isRequired
                        type="text"
                        label={dictionary.name}
                        value={name}
                        variant="bordered" size="md"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        isRequired
                        type="email"
                        label={dictionary.email}
                        value={email}
                        size="md" variant="bordered"
                        onChange={(e) => setEmail(e.target.value)}/>
                    <Input isRequired
                           label={dictionary.password}
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
                        <Text tid="to sign up"/>
                    </Button>
                    <p><Text tid="already have acc"/><NavLink className="dark:hover:text-cyan-500 dark:text-indigo-500 text-violet-500" to="/login"> <Text tid="log in"/></NavLink></p>
                </CardBody>
            </Card>
        </div>

    );
}