# Vagrant

## getting started

build a box start to finish - [https://www.engineyard.com/blog/building-a-vagrant-box](https://www.engineyard.com/blog/building-a-vagrant-box)

## Networking

[https://www.vagrantup.com/docs/networking/basic\_usage.html](https://www.vagrantup.com/docs/networking/basic_usage.html) - docs

from: [https://www.safaribooksonline.com/library/view/vagrant-virtual-development/9781784393748/ch05s02.html](https://www.safaribooksonline.com/library/view/vagrant-virtual-development/9781784393748/ch05s02.html)

**A quick note regarding static IP addresses**

When using astatic IP address on a local machine, we'll want to ensure that we are using IP ranges reserved for private networks to avoid any possible collisions with our outside environment. The IP ranges for private networks are established by the Internet Engineering Task Force and are reserved for use by private networks. The three ranges are defined in RFC1918 \([http://tools.ietf.org/html/rfc1918](http://tools.ietf.org/html/rfc1918)\) as:

* `10.0.0.0`
  -
  `10.255.255.255`
  \(10/8 prefix\)
* `172.16.0.0`
  -
  `172.31.255.255`
  \(172.16/12 prefix\)
* `192.168.0.0`
  -
  `192.168.255.255`
  \(192.168/16 prefix\)

When assigning static IPs in a Vagrantfile, choose one of these ranges to assign IPs in. More specifically, you'll likely want to assign ranges in either the`172`or`192`ranges, many corporate \(or even home\) networks use the`10`range for resources located within the wider network by default. Your hypervisor software will typically alert you if you are running into an IP address conflict.

## Provisioning

### setup custom user and home

[https://medium.com/@JohnFoderaro/how-to-set-up-a-local-linux-environment-with-vagrant-163f0ba4da77](https://medium.com/@JohnFoderaro/how-to-set-up-a-local-linux-environment-with-vagrant-163f0ba4da77) - setting up local linux environment

https://www.engineyard.com/blog/building-a-vagrant-box-from-start-to-finish - setting up base box guide

## testing

### serverspec

[https://serverspec.org/resource\_types.html\#file](https://serverspec.org/resource_types.html#file)

example spec

```
  it 'should have a gradle home dir for docker containers' do
    expect(file('/home/vagrant/gradle')).to be_directory
    expect(file('/home/vagrant/gradle')).to be_owned_by 'vagrant'
    expect(file('/home/vagrant/gradle')).to be_owned_by 'be_grouped_into'
    expect(file('/home/vagrant/gradle')).to be_readable_by 'vagrant'
    expect(file('/home/vagrant/gradle')).to be_writable_by 'vagrant'
    expect(file('/home/vagrant/gradle')).to be_executable 'vagrant'
  end
```



