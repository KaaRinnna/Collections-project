import {languageOptions} from "../languages/";
import {LanguageContext} from "../containers/Language.jsx";
import {useContext} from "react";

export default function LanguageSelector() {
    const {userLanguage, userLanguageChange} = useContext(LanguageContext);
    const handleLanguageChange = e => userLanguageChange(e.target.value);

    return (
        <select className="dark:text-gray-200 font-medium text-gray-800 bg-transparent text-[14px] cursor-pointer" onChange={handleLanguageChange} value={userLanguage}>
            {Object.entries(languageOptions).map(([id, name]) => (
                <option className="bg-gray-200 dark:bg-gray-800" key={id} value={id}>{name}</option>
            ))}
        </select>
    );
};