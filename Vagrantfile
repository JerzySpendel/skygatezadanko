# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty32"
  config.vm.network "private_network", ip: "192.168.33.11"
  config.ssh.forward_agent = true
  config.vm.provision :shell, path: "provision/prepare_machine.sh", privileged: false
end
