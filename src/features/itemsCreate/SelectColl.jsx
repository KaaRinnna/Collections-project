import React, {useEffect} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase.js";

const SelectColl = React.forwardRef(({onSelectionChange}, ref) => {
    const [items, setItems] = React.useState([]);
    const collRef = collection(db, 'collections');

    useEffect(() => {
        const fetchColl = async () => {
            try {
                const coll = await getDocs(collRef);
                const collData = coll.docs.map((doc) => ({
                    ...doc.data(), id: doc.id,
                }));
                setItems(collData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchColl();
    }, []);


    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete
                isRequired
                label="Select a collection"
                className="max-w-xs my-1.5"
                variant="faded"
                onSelectionChange={onSelectionChange}
                defaultItems={items}
                items={items}
            >
                {(item) => <AutocompleteItem>{item.collectionName}</AutocompleteItem>}
            </Autocomplete>
        </div>
    )
});

export default SelectColl;