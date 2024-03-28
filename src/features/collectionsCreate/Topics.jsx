import React, {useEffect, useState} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase.js";

const Topics = React.forwardRef(({ onSelectionChange }, ref) => {
    const [items, setItems] = useState([]);
    const topicsRef = collection(db, "topics");

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getDocs(topicsRef);
                const topicsData = data.docs.map((doc) => ({
                    ...doc.data(),
                }));
                setItems(topicsData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchTopics();
    }, []);

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete
                isRequired
                label="Select a category"
                className="max-w-xs my-1.5"
                variant="faded"
                defaultItems={items}
                items={items}
                onSelectionChange={onSelectionChange}
            >
                {(item) => <AutocompleteItem className="dark:text-gray-200" key={item.value} value={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>
        </div>
    );
});

export default Topics;