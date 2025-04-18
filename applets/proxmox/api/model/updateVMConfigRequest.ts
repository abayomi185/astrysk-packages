/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export interface UpdateVMConfigRequest {
  acpi?: boolean;
  agent?: string;
  arch?: string;
  args?: string;
  audio0?: string;
  autostart?: boolean;
  background_delay?: number;
  balloon?: number;
  bios?: string;
  boot?: string;
  bootdisk?: string;
  cdrom?: string;
  cicustom?: string;
  cipassword?: string;
  citype?: string;
  ciuser?: string;
  cores?: number;
  cpu?: string;
  cpulimit?: number;
  cpuunits?: number;
  delete?: string;
  description?: string;
  digest?: string;
  efidisk0?: string;
  force?: boolean;
  freeze?: boolean;
  hookscript?: string;
  hostpci0?: string;
  hostpci1?: string;
  hostpci10?: string;
  hostpci11?: string;
  hostpci12?: string;
  hostpci13?: string;
  hostpci14?: string;
  hostpci15?: string;
  hostpci16?: string;
  hostpci17?: string;
  hostpci18?: string;
  hostpci19?: string;
  hostpci2?: string;
  hostpci20?: string;
  hostpci21?: string;
  hostpci22?: string;
  hostpci23?: string;
  hostpci24?: string;
  hostpci25?: string;
  hostpci26?: string;
  hostpci27?: string;
  hostpci28?: string;
  hostpci29?: string;
  hostpci3?: string;
  hostpci4?: string;
  hostpci5?: string;
  hostpci6?: string;
  hostpci7?: string;
  hostpci8?: string;
  hostpci9?: string;
  hotplug?: string;
  hugepages?: string;
  ide0?: string;
  ide1?: string;
  ide10?: string;
  ide11?: string;
  ide12?: string;
  ide13?: string;
  ide14?: string;
  ide15?: string;
  ide16?: string;
  ide17?: string;
  ide18?: string;
  ide19?: string;
  ide2?: string;
  ide20?: string;
  ide21?: string;
  ide22?: string;
  ide23?: string;
  ide24?: string;
  ide25?: string;
  ide26?: string;
  ide27?: string;
  ide28?: string;
  ide29?: string;
  ide3?: string;
  ide4?: string;
  ide5?: string;
  ide6?: string;
  ide7?: string;
  ide8?: string;
  ide9?: string;
  ipconfig0?: string;
  ipconfig1?: string;
  ipconfig10?: string;
  ipconfig11?: string;
  ipconfig12?: string;
  ipconfig13?: string;
  ipconfig14?: string;
  ipconfig15?: string;
  ipconfig16?: string;
  ipconfig17?: string;
  ipconfig18?: string;
  ipconfig19?: string;
  ipconfig2?: string;
  ipconfig20?: string;
  ipconfig21?: string;
  ipconfig22?: string;
  ipconfig23?: string;
  ipconfig24?: string;
  ipconfig25?: string;
  ipconfig26?: string;
  ipconfig27?: string;
  ipconfig28?: string;
  ipconfig29?: string;
  ipconfig3?: string;
  ipconfig4?: string;
  ipconfig5?: string;
  ipconfig6?: string;
  ipconfig7?: string;
  ipconfig8?: string;
  ipconfig9?: string;
  ivshmem?: string;
  keephugepages?: boolean;
  keyboard?: string;
  kvm?: boolean;
  localtime?: boolean;
  lock?: string;
  machine?: string;
  memory?: number;
  migrate_downtime?: number;
  migrate_speed?: number;
  name?: string;
  nameserver?: string;
  net0?: string;
  net1?: string;
  net10?: string;
  net11?: string;
  net12?: string;
  net13?: string;
  net14?: string;
  net15?: string;
  net16?: string;
  net17?: string;
  net18?: string;
  net19?: string;
  net2?: string;
  net20?: string;
  net21?: string;
  net22?: string;
  net23?: string;
  net24?: string;
  net25?: string;
  net26?: string;
  net27?: string;
  net28?: string;
  net29?: string;
  net3?: string;
  net4?: string;
  net5?: string;
  net6?: string;
  net7?: string;
  net8?: string;
  net9?: string;
  numa?: boolean;
  numa0?: string;
  numa1?: string;
  numa10?: string;
  numa11?: string;
  numa12?: string;
  numa13?: string;
  numa14?: string;
  numa15?: string;
  numa16?: string;
  numa17?: string;
  numa18?: string;
  numa19?: string;
  numa2?: string;
  numa20?: string;
  numa21?: string;
  numa22?: string;
  numa23?: string;
  numa24?: string;
  numa25?: string;
  numa26?: string;
  numa27?: string;
  numa28?: string;
  numa29?: string;
  numa3?: string;
  numa4?: string;
  numa5?: string;
  numa6?: string;
  numa7?: string;
  numa8?: string;
  numa9?: string;
  onboot?: boolean;
  ostype?: string;
  parallel0?: string;
  parallel1?: string;
  parallel10?: string;
  parallel11?: string;
  parallel12?: string;
  parallel13?: string;
  parallel14?: string;
  parallel15?: string;
  parallel16?: string;
  parallel17?: string;
  parallel18?: string;
  parallel19?: string;
  parallel2?: string;
  parallel20?: string;
  parallel21?: string;
  parallel22?: string;
  parallel23?: string;
  parallel24?: string;
  parallel25?: string;
  parallel26?: string;
  parallel27?: string;
  parallel28?: string;
  parallel29?: string;
  parallel3?: string;
  parallel4?: string;
  parallel5?: string;
  parallel6?: string;
  parallel7?: string;
  parallel8?: string;
  parallel9?: string;
  protection?: boolean;
  reboot?: boolean;
  revert?: string;
  rng0?: string;
  sata0?: string;
  sata1?: string;
  sata10?: string;
  sata11?: string;
  sata12?: string;
  sata13?: string;
  sata14?: string;
  sata15?: string;
  sata16?: string;
  sata17?: string;
  sata18?: string;
  sata19?: string;
  sata2?: string;
  sata20?: string;
  sata21?: string;
  sata22?: string;
  sata23?: string;
  sata24?: string;
  sata25?: string;
  sata26?: string;
  sata27?: string;
  sata28?: string;
  sata29?: string;
  sata3?: string;
  sata4?: string;
  sata5?: string;
  sata6?: string;
  sata7?: string;
  sata8?: string;
  sata9?: string;
  scsi0?: string;
  scsi1?: string;
  scsi10?: string;
  scsi11?: string;
  scsi12?: string;
  scsi13?: string;
  scsi14?: string;
  scsi15?: string;
  scsi16?: string;
  scsi17?: string;
  scsi18?: string;
  scsi19?: string;
  scsi2?: string;
  scsi20?: string;
  scsi21?: string;
  scsi22?: string;
  scsi23?: string;
  scsi24?: string;
  scsi25?: string;
  scsi26?: string;
  scsi27?: string;
  scsi28?: string;
  scsi29?: string;
  scsi3?: string;
  scsi4?: string;
  scsi5?: string;
  scsi6?: string;
  scsi7?: string;
  scsi8?: string;
  scsi9?: string;
  scsihw?: string;
  searchdomain?: string;
  serial0?: string;
  serial1?: string;
  serial10?: string;
  serial11?: string;
  serial12?: string;
  serial13?: string;
  serial14?: string;
  serial15?: string;
  serial16?: string;
  serial17?: string;
  serial18?: string;
  serial19?: string;
  serial2?: string;
  serial20?: string;
  serial21?: string;
  serial22?: string;
  serial23?: string;
  serial24?: string;
  serial25?: string;
  serial26?: string;
  serial27?: string;
  serial28?: string;
  serial29?: string;
  serial3?: string;
  serial4?: string;
  serial5?: string;
  serial6?: string;
  serial7?: string;
  serial8?: string;
  serial9?: string;
  shares?: number;
  skiplock?: boolean;
  smbios1?: string;
  smp?: number;
  sockets?: number;
  spice_enhancements?: string;
  sshkeys?: string;
  startdate?: string;
  startup?: string;
  tablet?: boolean;
  tags?: string;
  tdf?: boolean;
  template?: boolean;
  unused0?: string;
  unused1?: string;
  unused10?: string;
  unused11?: string;
  unused12?: string;
  unused13?: string;
  unused14?: string;
  unused15?: string;
  unused16?: string;
  unused17?: string;
  unused18?: string;
  unused19?: string;
  unused2?: string;
  unused20?: string;
  unused21?: string;
  unused22?: string;
  unused23?: string;
  unused24?: string;
  unused25?: string;
  unused26?: string;
  unused27?: string;
  unused28?: string;
  unused29?: string;
  unused3?: string;
  unused4?: string;
  unused5?: string;
  unused6?: string;
  unused7?: string;
  unused8?: string;
  unused9?: string;
  usb0?: string;
  usb1?: string;
  usb10?: string;
  usb11?: string;
  usb12?: string;
  usb13?: string;
  usb14?: string;
  usb15?: string;
  usb16?: string;
  usb17?: string;
  usb18?: string;
  usb19?: string;
  usb2?: string;
  usb20?: string;
  usb21?: string;
  usb22?: string;
  usb23?: string;
  usb24?: string;
  usb25?: string;
  usb26?: string;
  usb27?: string;
  usb28?: string;
  usb29?: string;
  usb3?: string;
  usb4?: string;
  usb5?: string;
  usb6?: string;
  usb7?: string;
  usb8?: string;
  usb9?: string;
  vcpus?: number;
  vga?: string;
  virtio0?: string;
  virtio1?: string;
  virtio10?: string;
  virtio11?: string;
  virtio12?: string;
  virtio13?: string;
  virtio14?: string;
  virtio15?: string;
  virtio16?: string;
  virtio17?: string;
  virtio18?: string;
  virtio19?: string;
  virtio2?: string;
  virtio20?: string;
  virtio21?: string;
  virtio22?: string;
  virtio23?: string;
  virtio24?: string;
  virtio25?: string;
  virtio26?: string;
  virtio27?: string;
  virtio28?: string;
  virtio29?: string;
  virtio3?: string;
  virtio4?: string;
  virtio5?: string;
  virtio6?: string;
  virtio7?: string;
  virtio8?: string;
  virtio9?: string;
  vmgenid?: string;
  vmstatestorage?: string;
  watchdog?: string;
}
