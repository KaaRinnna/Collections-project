import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {Button, Card, CardHeader, Input, Textarea} from "@nextui-org/react";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Topics from "./Topics.jsx";
import {PlusIcon} from "../../components/profile/PlusIcon.jsx";
import FieldSelect from "./FieldSelect.jsx";
import {db, auth} from "../../config/firebase.js";
import {collection, addDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {Text} from "../../main.jsx";
import {LanguageContext} from "../../containers/Language.jsx";

export default function CollectionCreation() {
    const navigate = useNavigate();
    const {dictionary} = useContext(LanguageContext);

    const schema = yup.object().shape({
        collectionName: yup.string().required().min(2),
        description: yup.string().required().min(2),
    })

    const { register, handleSubmit, formState: {errors}, unregister
    } = useForm({
        resolver: yupResolver(schema),
    })

    const [selectedKey, setSelectedKey] = React.useState(null);
    const [fieldSelect, setFieldSelect] = React.useState([
        <FieldSelect key={0} register={register} unregister={unregister}/>])

    function onSelectionChange(id) {
        setSelectedKey(id);
    }

    async function onFormSubmit(data) {
        const newData = {
            ...data,
            topic: selectedKey,
            user_id: auth.currentUser.uid,
        };
        Object.keys(newData).forEach(key => {
            if (key.startsWith('custom') && key.endsWith('_name')) {
                const stateKey = key.slice(0, -4) + 'state';
                newData[stateKey] = newData[key] !== "";
            }
        })
        try {
            const collRef = collection(db, "collections");
            const newDocRef = await addDoc(collRef, newData);
            navigate(`/collections/collection/${newDocRef.id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const addFieldSelect = () => {
        if (fieldSelect.length < 5) {
            setFieldSelect([...fieldSelect, <FieldSelect key={fieldSelect.length} register={register} unregister={unregister}/>])
        }
    }

    return (
        <div className="max-w-[640px] relative w-full mx-auto my-24 pt-3">
            <Card className="min-w-0">
                <CardHeader>
                    <h1 className='text-center'><Text tid="create new coll"/></h1>
                </CardHeader>
                <form
                    className="text-left p-3 h-auto subpixel-antialiased break-words overflow-y-auto flex-col flex-auto w-full flex relative"
                    onSubmit={handleSubmit(onFormSubmit)}>
                    <Input
                        isRequired
                        label={dictionary["coll name"]}
                        size="lg"
                        variant="faded"
                        {...register("collectionName")}
                        placeholder={dictionary["coll name description"]}
                        className="my-1.5"
                        errorMessage={errors.collectionName?.message}
                    />
                    <Textarea
                        isRequired
                        label={dictionary.description}
                        size="lg"
                        variant="faded"
                        {...register("description")}
                        placeholder={dictionary["coll description"]}
                        className="my-1.5"
                        errorMessage={errors.description?.message}
                    />
                    <Topics onSelectionChange={onSelectionChange}/>

                    <div>
                        <p className="my-8"><Text tid="tip"/></p>
                        {fieldSelect}
                        <Button onClick={addFieldSelect} endContent={<PlusIcon/>} className="justify-end my-2">
                            <Text tid="add new"/>
                        </Button>

                    </div>

                    <div>
                        <Button className="my-1.5" type="submit" color="primary"><Text tid="submit"/></Button>
                    </div>
                </form>
            </Card>

        </div>
    )
}
