import React, {useEffect} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Card, CardHeader, Input} from "@nextui-org/react";
import SelectColl from "./SelectColl.jsx";
import {addDoc, collection, doc, onSnapshot, serverTimestamp} from "firebase/firestore";
import {db} from "../../config/firebase.js";
import {useNavigate} from "react-router-dom";

export default function ItemForm() {
    const [selectedKey, setSelectedKey] = React.useState(null);
    const [docFields, setDocFields] = React.useState([]);
    const navigate = useNavigate();

    let validationSchema = {
        item_name: yup.string().required().min(1),
    };

    Object.keys(docFields).forEach((key) => {
        if (key.includes('int')) {
            validationSchema[key] = yup.number();
        } else if (key.includes('date')) {
            validationSchema[key] = yup.date();
        }
    });

    const schema = yup.object().shape(validationSchema);

    const {register, handleSubmit, formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onItemSubmit(data) {
        const newData = {
            ...data, collection: selectedKey, createdAt: serverTimestamp(),
        }
        const subCollectionRef = collection(db, `collections/${selectedKey}/items`);
        try {
            await addDoc(subCollectionRef, newData);
            navigate(`/collections/collection/${selectedKey}`);
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
            });
            return unsubscribe;
        }
    }, [selectedKey]);

    function onSelectionChange(id) {
        setSelectedKey(id);
    }

    return (
        <div className="max-w-[640px] w-full mx-auto my-12">
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
                        {...register("item_name")}
                        errorMessage={errors.item_name?.message}
                    />

                    {Object.keys(docFields).map((key) => {
                        if (key.startsWith('custom_') && key.endsWith('_name')) {
                            const typeKey = key.slice(7,-6);
                            const stateKey = key.replace('_name', '_state');
                            if (docFields[stateKey] === true) {
                                return (
                                    <div key={key}>
                                        <Input
                                            isRequired={typeKey !== "checkbox"}
                                            type={typeKey}
                                            label={docFields[key]}
                                            className="my-1.5"
                                            {...register(key)}
                                            errorMessage={errors[key]?.message}
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