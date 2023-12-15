import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema<Userdocument>(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    confirm_password: String,
    gender: String,
    another_mobile: Number,
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    address: String,
    term_and_condition: Boolean,
    token: String,
  },
  {
    timestamps: true,
  }
);

const User = model<Userdocument>("User", UserSchema);
export default User;

interface Userdocument extends mongoose.Document {
  name: string;
  password: string;
  confirm_password: string;
  email: string;
  gender: string;
  mobile: number;
  another_mobile?: number;
  address: string;
  term_and_condition: boolean;
  token?: string;
}
