import {Card, CardBody, CardHeader} from "@nextui-org/react";
import {Text} from "../../main.jsx";
import React from "react";
import { AcademicCapIcon, BookOpenIcon, CodeBracketIcon, ComputerDesktopIcon, DeviceTabletIcon, PencilSquareIcon} from '@heroicons/react/24/outline'

export default function FrontFeatures() {
    const features = [
        {
            name: 'Основы HTML, CSS и JavaScript',
            description:
                'Введение в веб-разработку с помощью основных технологий: HTML для структуры страницы, CSS для стилизации и JavaScript для добавления интерактивности.',
            icon: AcademicCapIcon,
        },
        {
            name: 'Изучение React и Vue.js',
            description:
                'Изучение основы работы с каждым фреймворком, освоение основных концепций и применение их для создания динамичных и масштабируемых интерфейсов.',
            icon: BookOpenIcon,
        },
        {
            name: 'Создание динамичных интерфейсов',
            description:
                'Изучение передовых методов создания анимаций, переходов и пользовательского взаимодействия, а также оптимизация производительности интерфейсов .',
            icon: PencilSquareIcon,
        },
        {
            name: 'Разработка кросс-платформенных приложений',
            description:
                'Изучение принципов, позволяющих создавать веб-приложения, которые могут работать на различных устройствах и браузерах.',
            icon: DeviceTabletIcon,
        },
        {
            name: 'Работа с асинхронными запросами',
            description:
                'Изучение работы с асинхронными запросами и обработки данных, что позволит создавать интерактивные и динамичные пользовательские интерфейсы.',
            icon: CodeBracketIcon,
        },
        {
            name: 'Оптимизация производительности',
            description:
                'Научитесь оптимизировать загрузку и производительность веб-приложений для обеспечения быстрого и плавного пользовательского опыта.',
            icon: ComputerDesktopIcon,
        },
    ]

    return (
        <Card className="max-w-[1200px] mx-auto px-3 my-8">
            <CardHeader className="flex gap-3 justify-center">
                <div className="flex flex-col">
                    <p className="py-8 max-w-3xl text-center text-lg leading-8"><Text tid="front header"/></p>
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