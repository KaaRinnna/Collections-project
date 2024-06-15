import {Card, CardBody, CardFooter, CardHeader, Divider, Image, Link} from "@nextui-org/react";
import React from "react";
import myImage from "./images/frontend.png"
import {Text} from "../../main.jsx";

export default function CardFrontend() {
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
                    <p className="text-md">Front-end</p>
                    <p className="text-small text-default-500"><Text tid="card front header"/></p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p><Text tid="card front desc"/></p>
            </CardBody>
            <Divider/>
            <CardFooter>
                <Link
                    showAnchorIcon
                    href="/courses"
                >
                    <Text tid="more"/>
                </Link>
            </CardFooter>
        </Card>
    )
}