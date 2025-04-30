import mongoose from 'mongoose';

const updateSchema = new mongoose.Schema({
  icone: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  paragrafo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Update = mongoose.model('Update', updateSchema);
export default Update;
