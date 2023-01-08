import { Schema, Document, model } from "mongoose"
import { hash, compare } from "bcryptjs"
import uniqueValidator from "mongoose-unique-validator"

export interface IUser extends Document {
    email: string
    password: string
    comparePassword(passowrd: string): Promise<boolean>
}

const userSchema: Schema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
            trim: true,
            match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        },
        password: {
            type: String,
            select: false,
            required: true,
            minlength: 8,
        }
    }, { timestamps: true }
)

userSchema.plugin(uniqueValidator, { message: 'E-mail already exists' })

userSchema.pre("save", async function (this: IUser, next) {
    if (!this.isModified("password")) {
        return next()
    }

    try {
        this.password = await hash(this.password, 10)
        return next()
    } catch (error) {
        if (error instanceof Error) {
            next(error)
        }
    }
})

userSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    return await compare(password, this.password).catch((e) => false)
}

export default model<IUser>("User", userSchema)
