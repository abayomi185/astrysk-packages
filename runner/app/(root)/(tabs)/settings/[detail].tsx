import React from "react";

import { activeApplet } from "@applet";

export default (() => {
  const [_, appletInstance] = activeApplet;
  return <>{React.createElement(appletInstance.detailView, {})}</>;
}) satisfies React.FC;
