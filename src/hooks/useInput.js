import {useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (initValue, validations) => {
    const [value, setValue] = useState(initValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onBlur = (e) => {
        setDirty(true);
    }

    return {
        value,
        isDirty,
        onChange,
        onBlur,
        ...valid
    }
}
