# Prep SD card with image

### format the card

[http://www.makeuseof.com/tag/write-format-manage-sd-card-linux/](http://www.makeuseof.com/tag/write-format-manage-sd-card-linux/)

```
dd if=/dev/zero of=/dev/sdc
```

WARNING: this will wipe the card, make sure the target is correct. of is target and /dev/sdc is a disk in this case



### Download the image to copy

Find a copy of the image you want online and start download. In this example Kali:

[https://www.offensive-security.com/kali-linux-arm-images/](https://www.offensive-security.com/kali-linux-arm-images/)



### prep the image

1. unzip the image  
  
   `xz -d kali-2017.01-rpi2.img.xz`

2.  unmount sd card  
  
   `lsblk  # verify disk  
  
   sudo unmount /dev/sdc`

3. 






