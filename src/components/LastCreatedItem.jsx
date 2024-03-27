import {collection, query, orderBy, limit, getDocs} from "firebase/firestore";
import {db} from "../config/firebase.js";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function LastCreatedItem() {
    const [lastItem, setLastItem] = useState({});

    const collectionRef = collection(db, 'collections');

    useEffect(() => {
        async function getLastCreatedItem() {
            const getDocFunc = await getDocs(collectionRef);
            let latestItem = null;
            try {
                const getDocsData = await Promise.all(getDocFunc.docs.map(async (doc) => {
                    const itemsRef = collection(db, 'collections', doc.id, 'items');
                    const q = query(itemsRef, orderBy("createdAt", "desc"), limit(1));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const lastCreatedItem = querySnapshot.docs.map(doc => ({...doc.data(), id:doc.id
                        }))[0];
                        if (!latestItem || lastCreatedItem.createdAt > latestItem.createdAt) {
                            latestItem = lastCreatedItem;
                        }
                    }
                }));
                if (latestItem) {
                    setLastItem(latestItem);
                }
            } catch (err) {
                console.error(err)
            }
        }
        getLastCreatedItem()
    }, []);


    return (
        <div className="dark:text-gray-200 max-w-[800px] mx-auto my-24 py-10 px-5 dark:border-gray-700 dark:border-1 rounded-large shadow-small dark:shadow-none">
            <h1>Last Created Item:</h1>
            <div>
                <dl className="divide-y divide-gray-700 text-lg">
                    <div className="py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                        <dt className="dark:text-gray-200 font-normal">Collection</dt>
                        <dd className="dark:text-gray-400">{lastItem.collection}</dd>
                    </div>
                    <div className="py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                        <dt className="dark:text-gray-200 font-normal">Item name</dt>
                        <Link className="text-violet-500 dark:hover:text-gray-200" to={`/collections/collection/${lastItem.collection}/item/${lastItem.id}`}>
                            <dd>{lastItem.item_name}</dd>
                        </Link>
                    </div>
                </dl>
            </div>
        </div>

    )
}