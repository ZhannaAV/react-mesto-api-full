const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator(v) {
        // проверка регуляркой на уровне схемы - это условие задания
        return /^[a-яё -]+$/.test(v);
      },
      message: 'Укажите корректное название',
    },
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        // проверка регуляркой на уровне схемы - это условие задания
        return /^(http|https):\/\/[A-za-z0-9-._~:/?#\[\]@!$&'()*+,;=]{1,}$/.test(v);
      },
      message: 'Укажите корректную ссылку',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
