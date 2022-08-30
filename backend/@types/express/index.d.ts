import { User } from '../../types/user';
import { IOrderProduct } from '../../types/order';
import { IReservation } from '../../types/reservation';

// On a rajouté un object "user" (qui suit l'interface "User") à l'interface Request qui fait partie de Express
declare global {
    namespace Express {
        interface Request {
            user: User;
            IOrderProduct: IOrderProduct;
            IReservation: IReservation;
        }
    }
}
