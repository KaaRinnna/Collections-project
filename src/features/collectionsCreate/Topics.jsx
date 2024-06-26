import React, {useContext, useEffect, useState} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase.js";
import {LanguageContext} from "../../containers/Language.jsx";

const Topics = React.forwardRef(({ onSelectionChange }, ref) => {
    const [items, setItems] = useState([]);
    const topicsRef = collection(db, "topics");
    const [selectedKey, setSelectedKey] = useState(null);
    const {dictionary} = useContext(LanguageContext);

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
                label={dictionary["category"]}
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