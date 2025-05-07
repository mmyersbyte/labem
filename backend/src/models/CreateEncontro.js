import mongoose from 'mongoose';

const createEncontroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  slideTeorico: {
    data: Buffer,
    contentType: {
      type: String,
      required: true,
      default: 'application/pdf',
    },
    required: true,
  },
  materialApoio: {
    data: Buffer,
    contentType: {
      type: String,
      required: true,
      default: 'application/pdf',
    },
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

const CreateEncontro = mongoose.model('CreateEncontro', createEncontroSchema);
export default CreateEncontro;
