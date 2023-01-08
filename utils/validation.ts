export function loginValidation(values: any) {
    const errors: any = {}

    if (!values.email) {
        errors.email = 'Field required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = "Field required"
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater than 8 and less than 20 characters long"
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid password"
    }

    return errors

}

export function registerValidation(values: any) {
    const errors: any = {}

    if (!values.email) {
        errors.email = 'Field required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = "Field required"
    } else if (values.password.length < 7 || values.password.length > 20) {
        errors.password = "Password must be greater than 7 and less than 20 characters long"
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid password"
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*])(?=.{8,})/i.test(values.password)) {
        errors.password = "Password must be greater than 7 characters and contain one uppercase and lowercase letter, one digit and one symbol"
    }

    if (!values.cpassword) {
        errors.cpassword = "Field required"
    } else if (values.password !== values.cpassword) {
        errors.cpassword = "Passwords do not match"
    } else if (values.cpassword.includes(" ")) {
        errors.cpassword = "Invalid confirm password"
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*])(?=.{8,})/i.test(values.cpassword)) {
        errors.cpassword = "Password must be greater than 7 characters and contain one uppercase and lowercase letter, one digit and one symbol"
    }

    return errors
}