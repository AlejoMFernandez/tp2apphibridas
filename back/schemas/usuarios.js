import yup from 'yup'

export const usuarioSchema = yup.object({
    email: yup.string().email("Debe ser un email válido").required("El email es requerido"),
    password: yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(16, "La contraseña debe tener máximo 16 caracteres")
                .matches(/[0-9]/, "La contraseña debe tener al menos un número")
                .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
                .matches(/[@$!%*?&]/, "La contraseña debe tener al menos un caracter especial")
                .required("La contraseña es requerida"),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Las contraseñas deben coincidir").required("Debe confirmar la contraseña"),
    username: yup.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional()
})

export const loginSchema = yup.object({
    email: yup.string().email("Debe ser un email válido").required("El email es requerido"),
    password: yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(16, "La contraseña debe tener máximo 16 caracteres")
        .matches(/[0-9]/, "La contraseña debe tener al menos un número")
        .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
        .matches(/[@$!%*?&]/, "La contraseña debe tener al menos un caracter especial")
        .required("La contraseña es requerida")
})
