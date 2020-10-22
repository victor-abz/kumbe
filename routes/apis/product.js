import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	editProduct,
	getProducts
} from '../../controllers/product';
import { catchErrors } from '../../middlewares/app';
import { isAtLeastAdmin } from '../../middlewares/auth';
import {
	doesProductExit,
	isProductInfoValid
} from '../../middlewares/productValidation';

const productRoutes = Router();
productRoutes.post(
	'/',
	catchErrors(isAtLeastAdmin),
	catchErrors(isProductInfoValid),
	catchErrors(createProduct)
);
productRoutes.get('/', catchErrors(getProducts));
productRoutes.patch(
	'/:productId',
	catchErrors(isAtLeastAdmin),
	catchErrors(doesProductExit),
	catchErrors(isProductInfoValid),
	catchErrors(editProduct)
);
productRoutes.delete(
	'/:productId',
	catchErrors(doesProductExit),
	catchErrors(deleteProduct)
);

export default productRoutes;
