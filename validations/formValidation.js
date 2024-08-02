import vine from "@vinejs/vine"
import { customErrorReporter } from "./customErrorReporter.js";


vine.errorReporter = () => new customErrorReporter();
export const operatorTypeAdd = vine.object({
    title: vine.string().minLength(3).maxLength(50),
    status: vine.number(),
})


export const stateAdd = vine.object({
    title: vine.string().minLength(3).maxLength(50),
    state_code: vine.string().minLength(3).maxLength(50),
    status: vine.number(),
})

