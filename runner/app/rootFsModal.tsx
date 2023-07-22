import React from "react";
import { activeApplet } from "@applet";

export default (() => {
  const [_, appletInstance] = activeApplet;
  return (
    <>{React.createElement(appletInstance.fullScreenModalView as React.FC, {})}</>
  );
}) as React.FC;
