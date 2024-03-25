import React, {useEffect, useRef, useState} from "react";
import {Autocomplete, AutocompleteItem, Input} from "@nextui-org/react";
import {fieldTypes} from "./fieldTypes.js";
export default function FieldSelect({register, unregister}) {
    const [selectedKey, setSelectedKey] = useState(null);
    const prevKeyRef = useRef();
    const [fields, setFields] = useState({number: [{}, {}, {}], string: [{}, {}, {}],
        text: [{}, {}, {}], checkbox: [{}, {}, {}], date: [{}, {}, {}]});

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
        <div className="flex w-full flex-wrap md:flex-nowrap gap-1">
            <Autocomplete
                label="Select a field type"
                className="max-w-xs mb-2.5"
                onSelectionChange={onSelectionChange}
                variant="faded"
            >
                {fieldTypes.map((field) => (
                    <AutocompleteItem className="dark:text-gray-200" key={field.value} value={field.value} >
                        {field.label}
                    </AutocompleteItem>
                ))}
            </Autocomplete>

            {selectedKey && fields[selectedKey].map((field, index) => (
                    <Input
                        key={index}
                        label="Field name"
                        variant="flat"
                        placeholder="Enter field`s name"
                        className="mb-2.5"
                        {...register("custom_"+`${selectedKey}${index+1}_name`)}
                    />
            ))}
        </div>
    );
};
