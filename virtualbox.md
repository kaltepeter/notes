# virtualbox

## convert parallels to virtualbox

https://forums.virtualbox.org/viewtopic.php?f=8&t=57476

### prepare parallels vm

1. uninstall parallels tools
2. convert to vhd

### Convert disk to VHDX

* Download and run this tool: https://technet.microsoft.com/en-us/sysinternals/ee656415.aspx
* May need a external HD to store the image due to guest additions being missing

### Convert VHDX to VDI

* https://nfolamp.wordpress.com/2010/06/10/converting-vmdk-files-to-vdi-using-vboxmanage/
* run the command to convert

```bash
VBoxManage clonehd --format VDI ~/Documents/pc-VMW7.VHDX ~/Documents/pc-VMW7.vdi

```
