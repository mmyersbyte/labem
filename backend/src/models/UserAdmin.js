import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userAdminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserAdmin = mongoose.model('UserAdmin', userAdminSchema);
export default UserAdmin;
