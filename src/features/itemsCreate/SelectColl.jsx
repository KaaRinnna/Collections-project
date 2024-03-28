import React, {useEffect} from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db, auth} from "../../config/firebase.js";

const SelectColl = React.forwardRef(({onSelectionChange}, ref) => {
    const [items, setItems] = React.useState([]);
    const [role, setRole] = React.useState(null);

    const userRef = doc(db, 'users', auth.currentUser.uid);
    const collectionRef = collection(db, 'collections');

    useEffect(() => {
        const fetchColl = async () => {
            try {
                const coll = await getDocs(collectionRef);
                const collectionData = coll.docs.map((doc) => ({
                    ...doc.data(), id: doc.id,
                }));
                setItems(collectionData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchColl();
    }, []);

    useEffect(() => {
        const checkRole = async () => {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userRole = userDoc.data().role;
                setRole(userRole);
            }
        }
        checkRole();
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
                {(item) => {
                    if (item.user_id === auth.currentUser.uid || role === 'admin') {
                        return <AutocompleteItem className="dark:text-gray-200" >{item.collectionName}</AutocompleteItem>;
                    } else {
                        return null;
                    }
                }}
            </Autocomplete>
        </div>
    )
});

export default SelectColl;