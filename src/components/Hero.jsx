import React from "react";
import {Button, Link} from "@nextui-org/react";

export default function Hero() {
    return (
        <div className="w-[100%] h-[40vh] bg-fuchsia-100">
            <h1 className="font-bold">Create your own collections</h1>
            <Button as={Link} color="secondary" href="#" variant="flat">
                Start
            </Button>
        </div>
    )
}