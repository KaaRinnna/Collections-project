import {Tab, Tabs} from "@nextui-org/react";
import {Text} from "../../main.jsx";
import FrontFeatures from "./FrontFeatures.jsx";
import BackFeatures from "./BackFeatures.jsx";
import UxFeatures from "./UxFeatures.jsx";

export default function CoursesDescription() {
    return (
        <div className="flex w-full flex-col items-center my-14 peaks">
            <h1 className="mt-16 text-center dark:text-gray-200 max-w-3xl max-sm:text-[2.5rem]"><Text tid="course h1"/></h1>
            <Tabs className="my-8" radius="full" color="primary" aria-label="Options">
                <Tab key="frontend" title="Front-end">
                    <FrontFeatures/>
                </Tab>
                <Tab key="backend" title="Back-end">
                    <BackFeatures/>
                </Tab>
                <Tab key="ux" title="UX/UI">
                    <UxFeatures/>
                </Tab>
            </Tabs>
        </div>
    )
}