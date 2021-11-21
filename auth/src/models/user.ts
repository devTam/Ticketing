import { model, Schema } from "mongoose";
import { Password } from "../services/password";

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

// Before saving password, hash and save hashed password instead 
userSchema.pre('save', async function(done) {
  // Check if password is actually different from what is already in DB
   if (this.isModified('password')) {
     const hashed = await Password.toHash(this.get('password'));
     this.set('password', hashed)
   }
   done();
});

const User = model<IUser>("User", userSchema);

export { User };
