import { RideResolvers } from "../../server/types";
import * as polyline from "@mapbox/polyline";
export const resolvers: RideResolvers = {
  id(ride) {
    return ride._id.toHexString();
  },

  creator(ride, _, ctx) {
    return ctx.db.users.findOne({ _id: ride.creatorID });
  },

  previewURL(ride) {
    const line = polyline.encode(
      ride.points.map((p) => [p.latitude, p.longitude])
    );
    const apiURL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/path-5+f44-0.9(${encodeURIComponent(
      line
    )})/auto/600x400?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
    return apiURL;
  },

  color() {
    const h = Math.random() * 358;
    const s = Math.floor(Math.random() * 21) + 80;
    const l = Math.floor(Math.random() * 11) + 45;
    return "hsl(" + h + ", " + s + "%, " + l + "%)";
  },
};
