import React, {useEffect} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Card, CardHeader, Input} from "@nextui-org/react";
import SelectColl from "./SelectColl.jsx";
import {addDoc, collection, doc, onSnapshot} from "firebase/firestore";
import {db} from "../../config/firebase.js";

export default function ItemForm() {
    const [selectedKey, setSelectedKey] = React.useState(null);
    const [docFields, setDocFields] = React.useState([]);
    const schema = yup.object().shape({
        item_name: yup.string().required(),
    });

    const {register, handleSubmit, formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onItemSubmit(data) {
        const newData = {
            ...data, collection: selectedKey,
        }
        const subCollectionRef = collection(db, `collections/${selectedKey}/items`);
        try {
            await addDoc(subCollectionRef, newData);
            console.log('success');
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        if (selectedKey) {
            const docRef = doc(db, 'collections', selectedKey);
            const unsubscribe = onSnapshot(docRef, (doc) => {
                const docData = {
                    ...doc.data()
                }
                setDocFields(docData);
                console.log(docData);
            });
            return unsubscribe;
        }
    }, [selectedKey]);

    function onSelectionChange(id) {
        setSelectedKey(id);
    }

    return (
        <div className="max-w-[640px] w-full mx-auto my-8">
            <Card className="min-w-0">
                <CardHeader>
                    <h2 className="text-center">Create an item for your collection</h2>
                </CardHeader>
                <form
                    className="text-left p-3 h-auto subpixel-antialiased break-words overflow-y-auto flex-col flex-auto w-full flex relative"
                    onSubmit={handleSubmit(onItemSubmit)}>
                    <SelectColl onSelectionChange={onSelectionChange}/>
                    <Input
                        isRequired
                        className="my-1.5"
                        label="ItemName"
                        placeholder="Enter your item`s name"
                        {...register("item_name")} />

                    {Object.keys(docFields).map((key) => {
                        if (key.startsWith('custom_') && key.endsWith('_name')) {
                            const stateKey = key.replace('_name', '_state');
                            if (docFields[stateKey] === true) {
                                return (
                                    <div key={key}>
                                        <Input
                                            label={docFields[key]}
                                            className="my-1.5"
                                            {...register(key)}
                                        />
                                    </div>
                                )
                            }
                        }
                    })}
                    <div>
                        <Button type="submit" color="primary">Submit</Button>
                    </div>

                </form>

            </Card>
        </div>
    )
}