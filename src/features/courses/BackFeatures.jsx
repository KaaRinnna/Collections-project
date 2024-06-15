import {Card, CardBody, CardHeader} from "@nextui-org/react";
import React from "react";
import {WrenchIcon, WindowIcon, TableCellsIcon, ServerStackIcon, ShieldCheckIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

export default function BackFeatures() {
    const features = [
        {
            name: 'Изучение Node.js и Python для создания серверной логики',
            description:
                'Студенты изучат основные концепции, инструменты и практические приемы, используемые для разработки мощных и эффективных бэкенд-приложений.',
            icon: ServerStackIcon,
        },
        {
            name: 'Работа с SQL и NoSQL базами данных',
            description:
                'Изучение основных операций баз данных, таких как создание, чтение, обновление и удаление данных, а также проектирование и оптимизация структуры баз данных.',
            icon: TableCellsIcon,
        },
        {
            name: 'Создание высокопроизводительных и масштабируемых бэкенд систем',
            description:
                'Изучение передовых архитектурных шаблонов, технологий и методов оптимизации, необходимые для создания надежных и эффективных серверных приложений.',
            icon: RocketLaunchIcon,
        },
        {
            name: 'Безопасность и аутентификация',
            description:
                'Изучение методов обеспечения безопасности данных и аутентификации пользователей в серверных приложениях.',
            icon: ShieldCheckIcon,
        },
        {
            name: 'Микросервисная архитектура',
            description:
                'Разбор микросервисной архитектуры и ее преимуществ для разработки масштабируемых и устойчивых приложений.',
            icon: WindowIcon,
        },
        {
            name: 'Тестирование и отладка',
            description:
                'Научитесь писать тесты и отлаживать бэкенд-приложения для обеспечения их надежности и стабильной работы.',
            icon: WrenchIcon,
        },
    ]

    return (
        <Card className="max-w-[1200px] mx-auto my-8">
            <CardHeader className="flex gap-3 justify-center">
                <div className="flex flex-col">
                    <p className="py-8 max-w-3xl text-center text-lg leading-8">Этот курс предназначен для тех, кто хочет стать экспертом в разработке серверных приложений.
                        Вы изучите языки программирования, такие как Node.js и Python, а также базы данных SQL и NoSQL.</p>
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