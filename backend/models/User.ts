import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
}

const UserSchema: Schema = new Schema ({
    username: {type: 'string', required: true},
    email: {type: 'string', required: true, unique: true },
    password: {type: 'string', required: true}
})

export default mongoose.model<IUser>('User', UserSchema)
