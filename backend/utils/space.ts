
import materialModel from "../models/material.model";
import eventModel from "../models/event.model";

class SpaceUtils {
  constructor() {}

  purgeSpace = async (spaceId: string | undefined) => {
    await materialModel.deleteMany({ spaceId });

    await eventModel.deleteMany({ spaceId });

    return { success: true };
  };
}

export default SpaceUtils;
