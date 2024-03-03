import React from "react";
import {Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import {EyeSlashFilledIcon} from "../../EyeSlashFilledIcon.jsx";
import {EyeFilledIcon} from "../../EyeFilledIcon.jsx";

export default function LoginForm() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="max-w-[400px] w-full">
            <Card className="min-w-0">
                <CardHeader>
                    <h2 className='text-center'>Log In</h2>
                </CardHeader>
                <CardBody className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input isRequired type="email" label="Email" size="md" variant="bordered"/>
                    <Input isRequired label="Password" variant="bordered"
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
                    <Button type="submit" color="primary">
                        Submit
                    </Button>
                    <p>Don`t have an account?<a href="#"> Sign Up</a></p>
                </CardBody>
            </Card>
        </div>

    );
}