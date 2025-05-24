import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken: {
      type: String, // Stores the refresh token for logout/rotation
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

// Add a method to compare password during login
userSchema.methods.comparePassword = function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;