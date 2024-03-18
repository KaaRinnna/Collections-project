import React from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Card, CardHeader, Input} from "@nextui-org/react";

export default function ItemForm() {
    const schema = yup.object().shape({
        ItemName: yup.string().required(),
    })

    const {register, handleSubmit, formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onItemSubmit = (item) => {
        console.log(item);
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <p>Create an item for your collection</p>
                </CardHeader>
                <form onSubmit={handleSubmit(onItemSubmit)}>
                    <Input
                        isRequired
                        label="ItemName"
                        placeholder="Enter your item`s name"
                        {...register("itemName")} />
                </form>
                <Button type="submit">Submit</Button>
            </Card>
        </div>
    )
}