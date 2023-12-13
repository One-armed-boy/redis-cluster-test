import { Cluster } from "ioredis";
import "dotenv/config";

(async function () {
  const cluster = new Cluster(
    [
      { port: 6379, host: "127.0.0.1" },
      { port: 6380, host: "127.0.0.1" },
      { port: 6381, host: "127.0.0.1" },
      { port: 6382, host: "127.0.0.1" },
      { port: 6383, host: "127.0.0.1" },
    ],
    {
      natMap: {
        "173.17.0.2:6379": { port: 6379, host: "127.0.0.1" },
        "173.17.0.3:6379": { port: 6380, host: "127.0.0.1" },
        "173.17.0.4:6379": { port: 6381, host: "127.0.0.1" },
        "173.17.0.5:6379": { port: 6382, host: "127.0.0.1" },
        "173.17.0.6:6379": { port: 6383, host: "127.0.0.1" },
      },
      redisOptions: { password: process.env.REDIS_PASSWORD },
    }
  );

  cluster.addListener("error", (err) => {
    console.log("Error");
    console.log(err);
  });
  cluster.addListener("connect", () => {
    console.log("Connect");
  });
  cluster.addListener("ready", () => {
    console.log("Ready");
  });
  cluster.addListener("reconnecting", () => {
    console.log("Re-Connect");
  });
  cluster.addListener("node error", (err) => {
    console.log("Node error");
    console.log(err);
  });
  cluster.addListener("close", () => {
    console.log("Close");
  });
  const testKVSet: Record<string, string> = {
    a: "test-a",
    b: "test-b",
    c: "test-c",
    d: "test-d",
    e: "test-e",
  };

  for await (const key of Object.keys(testKVSet)) {
    console.log(await cluster.set(key, testKVSet[key]));
    console.log(await cluster.get(key));
  }
})();
