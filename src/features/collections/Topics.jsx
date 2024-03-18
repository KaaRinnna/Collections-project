import React, {useEffect, useState} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase.js";

const Topics = React.forwardRef(({ onSelectionChange }, ref) => {
    const [items, setItems] = useState([]);
    const topicsRef = collection(db, "topics");
    const [selectedKey, setSelectedKey] = useState(null);

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

    const onSelectionChangeLocal = (id) => {
        setSelectedKey(id);
        onSelectionChange(id);
    }

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
                {(item) => <AutocompleteItem key={item.value} value={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>
            <p>{selectedKey}</p>
        </div>
    );
});

export default Topics;