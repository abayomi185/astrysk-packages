import React from "react";
import { Redirect } from "expo-router";
import { Screens } from "@astrysk/constants";

export default (() => {
  return (
    <>
      <Redirect href={Screens.HOME_SCREEN_ROUTE} />
    </>
  );
}) satisfies React.FC;
