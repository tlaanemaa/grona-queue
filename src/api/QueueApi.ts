import rideMetadata from "../ride-metadata.json";
import { Ride } from "../model/Ride";

export class QueueApi {
  private static lastCall = Date.now();
  private static lastResult?: Promise<Ride[]>;

  public async getLatest() {
    const now = Date.now();
    if (QueueApi.lastResult && now - QueueApi.lastCall < 60000) {
      return QueueApi.lastResult;
    }
    QueueApi.lastResult = this.getQueues();
    QueueApi.lastCall = now;
    return QueueApi.lastResult;
  }

  private async getQueues() {
    const response = await fetch(
      "https://prs-cdp-prod-webapiproxy.azurewebsites.net/api/glt/QueueTimes/",
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
          "sec-fetch-site": "cross-site",
        },
        referrerPolicy: "same-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    );

    return this.parseResult(await response.json());
  }

  private parseResult(response: any[]): Ride[] {
    return response
      .filter(
        (item) => !!rideMetadata[item.attractionId as keyof typeof rideMetadata]
      )
      .map((item) => {
        return new Ride(
          String(item.attractionId),
          parseInt(item.queueTime),
          String(item.queueTimeText),
          String(item.info),
          new Date(item.lastUpdated)
        );
      });
  }
}
