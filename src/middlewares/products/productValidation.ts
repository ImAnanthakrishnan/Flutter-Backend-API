import {body} from 'express-validator';

// Validation rules
const productValidationRules = [
    body('item_name').isString().withMessage('Name is required').notEmpty(),
    body('price').isNumeric().withMessage('Price must be a number'),
];

export default productValidationRules;
  