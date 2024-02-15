import {useEffect, useState} from "react";

export const useValidation = (value, validations) => {
    const [inputErr, setInputErr] = useState(true);
    const [isEmpty, setEmpty] = useState({err: true, text: ''});
    const [minLengthError, setMinLengthError] = useState({err: true, text: ''});
    const [emailError, setEmailError] = useState({err: true, text: ''});

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength': {
                    value.length < validations[validation] ?
                        setMinLengthError({
                            err: true,
                            text: 'Минимальная длина должна быть ' + validations[validation]
                        }) :
                        setMinLengthError({err: false, text: ''});
                    break;
                }

                case 'isEmpty': {
                    value ?
                        setEmpty({err: false, text: ''}) :
                        setEmpty({err: true, text: 'Поле не может быть пустым'});
                    break;
                }

                case 'isEmail': {
                    let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    format.test(value) ?
                        setEmailError({err: false, text: ''}) :
                        setEmailError({err: true, text: 'Некорректный email'});
                    break;
                }

            }
        }
    }, [value]);

    useEffect(() => {
        let errors = [];
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    errors.push(minLengthError.err);
                    break;

                case 'isEmpty':
                    errors.push(isEmpty.err);
                    break;

                case 'isEmail':
                    errors.push(emailError.err);
                    break;
            }
        }
        setInputErr(errors.some((el) => el));
    }, [isEmpty, minLengthError, emailError]);

    return {
        inputErr,
        isEmpty,
        minLengthError,
        emailError
    }
}
