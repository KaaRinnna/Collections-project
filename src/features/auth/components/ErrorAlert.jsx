import React from "react";

const Alert = ({error}) => {
    const getErrorMessage = (errorMessage) => {
        // Обрабатывайте текст ошибки и возвращайте понятные сообщения
        if (errorMessage.includes("invalid-email")) {
            return "Invalid email address.";
        } else if (errorMessage.includes("user-not-found")) {
            return "User not found. Please check your email and try again.";
        } else if (errorMessage.includes("wrong-password")) {
            return "Incorrect password. Please try again.";
        } else if (errorMessage.includes("invalid-credential")) {
            return "Incorrect email or password";
        } else if (errorMessage.includes("weak-password")) {
            return "Password should be at least 6 characters."
        } else {
            return "An error occurred. Please try again later.";
        }
    };

    return (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2" role="alert">
            <p className="font-bold">Error!</p>
            <p>{getErrorMessage(error)}</p>
        </div>
    )
}

export default Alert;