import { Schema, model, models } from 'mongoose';

const IncomeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required.'],
  },
  category: {
    type: String
    
  },
  date: {
    type: Date,
    required: [true, 'Date is required.'],
  },
});

const Income = models.Income || model('Income', IncomeSchema);

export default Income;