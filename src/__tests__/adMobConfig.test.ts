import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

describe("adMob config", () => {
  it("keeps the registered Android app id and production ad unit ids", () => {
    const configPath = fileURLToPath(new URL("../config/adMob.ts", import.meta.url).href);
    const appJsonPath = fileURLToPath(new URL("../../app.json", import.meta.url).href);
    const configSource = readFileSync(configPath, "utf8");
    const appJson = JSON.parse(readFileSync(appJsonPath, "utf8")) as {
      expo: {
        plugins: unknown[];
        "react-native-google-mobile-ads": { android_app_id: string };
      };
    };

    expect(appJson.expo["react-native-google-mobile-ads"].android_app_id).toBe(
      "ca-app-pub-4402708884038037~4147084988"
    );
    expect(configSource).toContain("ca-app-pub-4402708884038037~4147084988");
    expect(configSource).toContain("ca-app-pub-4402708884038037/4952214439");
    expect(configSource).toContain("ca-app-pub-4402708884038037/4628780801");
    expect(configSource).toContain("ca-app-pub-4402708884038037/3288768655");
  });
});
