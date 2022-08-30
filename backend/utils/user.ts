import ReservationEvent from "../models/reservationEvent.model";
import reservationMaterialModel from "../models/reservationMaterial.model";
import reservationModel from "../models/reservation.model";

class UserUtils {
  constructor() {}

  purgeUser = async (userId: string) => {
    // 1. purge event reservation by user id
    await ReservationEvent.deleteMany({ userId });

    // 2. purge material reservation by user id
    await reservationMaterialModel.deleteMany({ userId });

    // 3. purge spaces
    await reservationModel.deleteMany({ userId });

    console.log("purged user reservations for:", { userId });

    return { success: true };
  };
}

export default UserUtils;
