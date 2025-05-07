import mongoose from 'mongoose';

const createEncontroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  slideTeorico: {
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
      default: 'application/pdf',
    },
  },
  materialApoio: {
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
      default: 'application/pdf',
    },
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
