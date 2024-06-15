import React, {useEffect, useState} from "react";
import {Text} from "../../main.jsx";
import CardFrontend from "../../features/courseChoosing/CardFrontend.jsx";
import CardBackend from "../../features/courseChoosing/CardBackend.jsx";
import CardDesign from "../../features/courseChoosing/CardDesign.jsx";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../config/firebase.js";
import {useParams} from "react-router-dom";
import {Card, CardBody, CardFooter, CardHeader, Spinner, Switch, TimeInput} from "@nextui-org/react";
import NoCourse from "../../features/courseChoosing/NoCourse.jsx";
import {Time} from "@internationalized/date";
import {getDownloadURL, ref, getStorage} from "firebase/storage";
import {storage} from "../../config/firebase.js";

async function getDownloadLink(filePath) {
    try {
        const fileRef = ref(storage, filePath);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error) {
        console.error('Error getting download URL:', error);
        return null;
    }
}

async function handleDownloadButtonClick(filePath) {
    try {
        const downloadURL = await getDownloadLink(filePath);
        if (downloadURL) {
            // Открываем ссылку на скачивание в новой вкладке
            window.open(downloadURL, '_blank');
        } else {
            console.error('Failed to get download URL');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export default function ProfileCourse () {
    const {uid} = useParams();
    const [userCourse, setUserCourse] = useState('');
    const [loading, setLoading] = useState(true);
    const [load, setLoad] = useState(false);

    // Обработчик клика по кнопке скачивания
    const handleDownloadButton = () => {
        setLoad(true); // Устанавливаем флаг загрузки
        const filePath = 'gs://make-collections-54f7e.appspot.com/Itransition certificate.pdf';
        handleDownloadButtonClick(filePath);
        setLoad(false); // Сбрасываем флаг загрузки
    };

    useEffect(() => {
        const getUserData = async () => {
            const userRef = doc(db, 'users', uid);
            const userData = await getDoc(userRef);
            if (userData.exists()) {
                setUserCourse(userData.data().course);
            }
            setLoading(false);
        }
        getUserData();
    }, []);

    return (
        loading ? <div className="absolute top-[50%] left-[50%] transform"><Spinner label="Loading..." /></div> :
            <div className="profile-peaks px-8">
                <h1 className="my-14 text-center dark:text-gray-200"><Text tid="my course"/></h1>
                <div className="grid lg:grid-cols-2 gap-10 sm:grid-cols-1 mb-8">
                    <div>
                        {userCourse === "frontend" ? <CardFrontend/>
                            : userCourse === "backend" ? <CardBackend/>
                                : userCourse === "ux" ? <CardDesign/> : <NoCourse/>}
                    </div>

                    <div>
                        <Card className="max-w-[700px] mx-auto my-8">
                            <CardHeader className="flex gap-3">
                                <div className="flex flex-col">
                                    <h3 className="text-md">Расписание</h3>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="flex items-center pb-2.5 justify-between">
                                    <p>Понедельник</p>
                                    <Switch defaultSelected className="pl-2.5"/>
                                    <TimeInput className="max-w-[250px]" label="Время начала занятия"
                                               defaultValue={new Time(11, 45)}/>
                                </div>
                                <div className="flex items-center py-2.5 justify-between">
                                    <p>Вторник</p>
                                    <Switch className="pl-2.5"/>
                                    <TimeInput isReadOnly className="max-w-[250px]" label="Время начала занятия"/>
                                </div>
                                <div className="flex items-center py-2.5 justify-between">
                                    <p>Среда</p>
                                    <Switch defaultSelected className="pl-2.5"/>
                                    <TimeInput isReadOnly className="max-w-[250px]" label="Время начала занятия"
                                               defaultValue={new Time(11, 45)}/>
                                </div>
                                <div className="flex items-center py-2.5 justify-between">
                                    <p>Четверг</p>
                                    <Switch className="pl-2.5"/>
                                    <TimeInput isReadOnly className="max-w-[250px]" label="Время начала занятия"/>
                                </div>
                                <div className="flex items-center py-2.5 justify-between">
                                    <p>Пятница</p>
                                    <Switch defaultSelected className="pl-2.5"/>
                                    <TimeInput isReadOnly className="max-w-[250px]" label="Время начала занятия"
                                               defaultValue={new Time(11, 45)}/>
                                </div>
                            </CardBody>
                            <CardFooter><button className="hover:text-slate-600" onClick={handleDownloadButton}>Сертификат PDF</button></CardFooter>
                        </Card>
                    </div>
                </div>

            </div>

    )
}