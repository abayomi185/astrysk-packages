import { Applet } from "@astrysk/types";
import { Applets } from "@astrysk/constants";

// Set up applet here
import { Jellyfin } from "@astrysk/applets";
// import { useJellyfinStore } from "@astrysk/applets/jellyfin/store";
// Save the baseURL and token to the store to authenticate on startup
// useJellyfinStore.setState({baseURL: "http://jellyfin-example.com"})
// useJellyfinStore.setState({token: "jellyfin-token"})

// Other applets
// import { Sonarr } from "@astrysk/applets";
// import { Radarr } from "@astrysk/applets";
// import { Plex } from "@astrysk/applets"; // Maybe??

export const activeApplet: [string, Applet] = [Applets.JELLYFIN, Jellyfin];
