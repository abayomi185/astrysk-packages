const proxmoxLocales = {
  qemu: "QEMU",
  lxc: "LXC",
  storage: "Storage",
  node: "Node",
  sdn: "SDN",

  maxcpu: "Max CPU",
  maxmemory: "Max Memory",

  cpu: "CPU",
  "cpu(s)": "CPU(s)",
  cpuinfo: "CPU Info",
  ioDelay: "IO Delay",
  memory: "Memory",
  diskSpace: "Disk Space",
  diskSpaceRootFs: "Disk Space (Root FS)",
  disk: "Disk",
  rootFs: "Root FS",
  filesystem: "File System",
  swap: "Swap",
  kveversion: "KVE Version",
  pveversion: "PVE Version",

  // Chart legends
  cpuUsage: "CPU Usage",
  serverLoad: "Server Load",
  loadavg: "Load Avg",
  memoryUsage: "Memory Usage",
  storageUsage: "Storage Usage",
  mem: "Memory",
  memused: "Memory Used",
  memtotal: "Memory Total",
  maxmem: "Max Memory",
  swapUsage: "Swap Usage",
  swapused: "Swap Used",
  swaptotal: "Swap Total",
  networkTraffic: "Network Traffic",
  netin: "Net In",
  netout: "Net Out",
  "day(avg)": "Day (Avg)",

  gb: "GB",

  usage: "Usage",
  status: "Status",
  content: "Content",

  online: "Online",
  uptime: "Uptime",
  template: "Template",

  days: "Days",

  type: "Type",
  order: "Order",

  id: "ID",
  alphabetical: "Alphabetical",

  running: "Running",
  stopped: "Stopped",
  paused: "Paused",
  suspended: "Suspended",
  available: "Available",

  noResourcesFound: "No Resources Found",
  noRecentTaskHistoryFound: "No Recent Task History Found",

  deleteCache: "Delete Cache",
  deleteCacheMessage: "Are you sure you want to delete the Proxmox cache?",

  taskHistory: "Task History",
  startTime: "Start Time",
  endTime: "End Time",
  duration: "Duration",

  alert: {
    shutdown: "Are you sure you want to shutdown?",
    reboot: "Are you sure you want to reboot?",
    reset: "Are you sure you want to reset?",
    stop: "Are you sure you want to stop?",
    suspend: "Are you sure you want to suspend?",
  },

  success: {
    actionComplete: "Action Complete",

    vmStarted: "VM Start Request Successful",
    vmSuspended: "VM Suspend Request Successful",
    vmResumed: "VM Resume Request Successful",
    vmShutdown: "VM Shutdown Request Successful",
    vmRebooted: "VM Reboot Request Successful",
    vmReset: "VM Reset Request Successful",
    vmStopped: "VM Stop Request Successful",

    lxcStarted: "LXC Start Request Successful",
    lxcSuspended: "LXC Suspend Request Successful",
    lxcResumed: "LXC Resume Request Successful",
    lxcShutdown: "LXC Shutdown Request Successful",
    lxcRebooted: "LXC Reboot Request Successful",
    lxcStopped: "LXC Stop Request Successful",

    taskStopped: "Task Stop Request Successful",
  },

  error: {
    actionFailed: "Action Failed",
  },

  qmstart: "Start",
  qmstop: "Stop",
  qmsuspend: "Suspend",
  qmresume: "Resume",
  qmshutdown: "Shutdown",
  qmreboot: "Reboot",
  qmreset: "Reset",

  lxcstart: "Start",
  lxcstop: "Stop",
  lxcsuspend: "Suspend",
  lxcresume: "Resume",
  lxcshutdown: "Shutdown",
  lxcreboot: "Reboot",

  vncproxy: "VNC Proxy",
};

export default proxmoxLocales;
