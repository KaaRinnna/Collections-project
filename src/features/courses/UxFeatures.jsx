import {Card, CardBody, CardHeader} from "@nextui-org/react";
import React from "react";
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function UxFeatures() {
    const features = [
        {
            name: 'Push to deploy',
            description:
                'Освоение основ дизайна интерфейсов и визуальной коммуникации.',
            icon: CloudArrowUpIcon,
        },
        {
            name: 'SSL certificates',
            description:
                'Изучение инструментов и методов UX/UI.',
            icon: LockClosedIcon,
        },
        {
            name: 'Simple queues',
            description:
                'Создание пользовательских интерфейсов, которые приятны в использовании и привлекательны внешне.',
            icon: ArrowPathIcon,
        },
        {
            name: 'Исследование пользовательских потребностей',
            description:
                'Углубленное изучение методов и инструментов для проведения исследования пользовательских потребностей и создания персонализированных интерфейсов.',
            icon: FingerPrintIcon,
        },
        {
            name: 'Проектирование доступных интерфейсов',
            description:
                'Разработка интерфейсов с учетом принципов доступности, чтобы обеспечить комфортный доступ к приложениям для всех пользователей.',
            icon: FingerPrintIcon,
        },
        {
            name: 'Анимация и интерактивность',
            description:
                'Изучение техник добавления анимации и интерактивности в интерфейсы для создания привлекательных и удобных в использовании веб-приложений.',
            icon: FingerPrintIcon,
        },
    ]

    return (
        <Card className="max-w-[1200px] mx-auto my-8">
            <CardHeader className="flex gap-3 justify-center">
                <div className="flex flex-col">
                    <p className="py-8 max-w-3xl text-center text-lg leading-8">Этот курс предназначен для тех, кто хочет научиться создавать привлекательные и пользовательские интерфейсы.
                        Вы изучите основы дизайна интерфейсов, инструменты и методы UX/UI.</p>
                </div>
            </CardHeader>
            <CardBody className="flex flex-col">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-6 max-w-2xl sm:mt-8 lg:mt-10 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-10">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">
                                        <div
                                            className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true"/>
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}