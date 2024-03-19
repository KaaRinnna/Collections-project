import React, {useEffect, useRef, useState} from "react";
import {Autocomplete, AutocompleteItem, Button, Input} from "@nextui-org/react";
import {fieldTypes} from "./fieldTypes.js";
import {PlusIcon} from "../../components/profile/PlusIcon.jsx";
export default function FieldSelect({register, unregister}) {
    const [selectedKey, setSelectedKey] = useState(null);
    const prevKeyRef = useRef();
    const [fields, setFields] = useState({int: [{}, {}, {}], string: [{}, {}, {}],
        multiline: [{}, {}, {}], checkbox: [{}, {}, {}], date: [{}, {}, {}]});

    useEffect(() => {
        if (prevKeyRef.current && prevKeyRef.current !== selectedKey) {
            unregister("custom_"+`${prevKeyRef.current}`+"1_name");
            unregister("custom_"+`${prevKeyRef.current}`+"2_name");
            unregister("custom_"+`${prevKeyRef.current}`+"3_name");
        }
        prevKeyRef.current = selectedKey;
    }, [selectedKey, unregister])
    const onSelectionChange = (id) => {
        setSelectedKey(id);
        if (fields[id].length < 3) {
            setFields({
                ...fields,
                [id]: [...fields[id], {name: ""}]
            });
        }
    }

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete
                label="Select a field type"
                className="max-w-xs"
                onSelectionChange={onSelectionChange}
            >
                {fieldTypes.map((field) => (
                    <AutocompleteItem key={field.value} value={field.value}>
                        {field.label}
                    </AutocompleteItem>
                ))}
            </Autocomplete>

            {selectedKey && fields[selectedKey].map((field, index) => (
                    <Input
                        key={index}
                        label="Field name"
                        variant="faded"
                        placeholder="Enter field`s name"
                        className="my-1.5"
                        {...register("custom_"+`${selectedKey}${index+1}_name`)}
                    />
            ))}
        </div>
    );
};
