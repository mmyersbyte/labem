import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  assunto: {
    type: String,
    required: true,
  },
  mensagem: {
    type: String,
    required: true,
  },
  dataEnvio: {
    type: Date,
    default: Date.now,
  },
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
