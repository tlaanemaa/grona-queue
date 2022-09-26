import { promises as fs } from "fs";
import fetch from "node-fetch";

const targetFilePath = "./src/ride-metadata.json";

const download = async () => {
  const response = await fetch(
    "https://www.gronalund.com/page-data/en/rides/page-data.json",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en,et;q=0.9",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://www.gronalund.com/en/rides",
      referrerPolicy: "same-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );

  const jsonData = await response.json();
  const rides = findBlocks("ContentfulRideBlock", jsonData).reduce(
    (obj, ride) => {
      obj[ride.rideId] = ride;
      return obj;
    },
    {}
  );

  await fs.writeFile(targetFilePath, JSON.stringify(rides, null, 2));
};

/**
 * Recursively step through an object and find all nodes with
 * a `__typename` property containing the given typename string.
 */
const findBlocks = (typename, object) => {
  return Object.values(object).reduce((blocks, value) => {
    if (value != null && typeof value === "object") {
      if (value.__typename === typename) {
        blocks.push(value);
      }
      blocks = blocks.concat(findBlocks(typename, value));
    }

    return blocks;
  }, []);
};

download();
