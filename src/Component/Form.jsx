import React, { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";

function Form() {
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        username: "",
        nationality: "",
        other: "",
    });

    const FormTitles = ["Sign Up", "Personal Info", "Other"];

    const PageDisplay = () => {
        if (page === 0) {
            return <SignUpInfo formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
            return <PersonalInfo formData={formData} setFormData={setFormData} />;
        } else {
            return <OtherInfo formData={formData} setFormData={setFormData} />;
        }
    };

    // console.log(formData)

    const handleSubmitData = async (event) => {
        console.log('Clicked')
        if (page === FormTitles.length - 1) {
            alert("FORM SUBMITTED");
            console.log(formData);
            event.preventDefault();
            const { email, password, confirmPassword, firstName, lastName, username, nationality, other } = formData;
            const res = fetch('https://multiple-form-d235d-default-rtdb.asia-southeast1.firebasedatabase.app/multipleForm.json',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        confirmPassword,
                        firstName,
                        lastName,
                        username,
                        nationality,
                        other,
                    }),
                }
            );
            setPage((currPage) => currPage - 2);
            setFormData({
                email: "",
                password: "",
                confirmPassword: "",
                firstName: "",
                lastName: "",
                username: "",
                nationality: "",
                other: "",
            })
        } else {
            setPage((currPage) => currPage + 1);

            // event.preventDefault();
            // const { email, password, confirmPassword, firstName, lastName, username, nationality, other } = formData;
            // const res = fetch('https://multiple-form-d235d-default-rtdb.asia-southeast1.firebasedatabase.app/multipleForm.json',
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify({
            //             email,
            //             password,
            //             confirmPassword,
            //             firstName,
            //             lastName,
            //             username,
            //             nationality,
            //             other,
            //         }),
            //     }
            // );
        }
    }

    return (
        <div className="form">
            <div className="progressbar">
                <div
                    style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
                ></div>
            </div>
            <div className="form-container">
                <div className="header">
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className="body">{PageDisplay()}</div>
                <div className="footer">
                    <button
                        disabled={page == 0}
                        onClick={() => {
                            setPage((currPage) => currPage - 1);
                        }}
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleSubmitData}
                    >
                        {page === FormTitles.length - 1 ? "Submit" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Form;