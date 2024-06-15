import {Card, CardBody, CardFooter, CardHeader, Divider, Image} from "@nextui-org/react";
import React from "react";
import myImage from "./images/backend.png"
import {Text} from "../../main.jsx";
import {Link} from "react-router-dom";

export default function NoCourse() {
    return (
        <Card className="max-w-[700px] mx-auto my-8">
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={80}
                    radius="sm"
                    src={myImage}
                    width={80}
                />
                <div className="flex flex-col">
                    <p className="text-md"><Text tid="no course"/></p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p className=" text-foreground-400 py-[5rem] text-center"><Text tid="no course desc"/>
                    <Link className="text-violet-500 dark:hover:text-gray-200"
                    to="/choosecourse"
                >
                    <Text tid="link"/>
                </Link></p>
            </CardBody>

        </Card>
    )
}