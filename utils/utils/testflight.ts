declare var process: {
  env: {
    EXPO_PUBLIC_ENVIRONMENT: string;
  };
};

export const isTestflightBuild =
  process.env.EXPO_PUBLIC_ENVIRONMENT === "testflight";

// export const isTestflightBuild = false;
