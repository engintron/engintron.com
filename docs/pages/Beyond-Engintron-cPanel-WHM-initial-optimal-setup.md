## cPanel WHM initial optimal setup

Engintron will make your cPanel based server fly, but it's important to have cPanel/WHM properly configured already.

Here are some basic configuration steps that we generally follow in cPanel server deployments of all sizes.

_(These steps are generally recommended for newly launched cPanel servers)_


### Configure your cPanel/WHM server
- Under "Server Configuration » Server Time", verify the server's time.
- Under "Networking Setup » Resolver Configuration", make sure the resolvers are properly set. 
- If you're using Google Analytics, Piwik etc. or don't care about statistics gathering in the server, under "Server Configuration » Statistics Software Configuration" disable all statistics software.
- Under "Service Configuration » Service Manager" disable services you don't need, e.g. DNS (if you manage DNS records offsite), mail services (if you use SaaS like Google Apps or Zoho Mail), spamd (if you won't use the local email server) etc.
- Under "Security Center » cPHulk Brute Force Protection", enable that option and make sure to whitelist the IPs through which you'll be logging into your server as root.
- If you want to allow SSH/terminal access to cPanel users, under "Security Center » Shell Fork Bomb Protection" make sure you enable that option.
- Using the terminal, install CSF (an IPTables frontend & more) and afterwards configure it so that ports 8080 & 8443 are allowd for Apache to work properly when Engintron (and thus Nginx) is installed. Installation instructions at: [https://download.configserver.com/csf/install.txt](https://download.configserver.com/csf/install.txt)
- Under "cPanel » Manage Plugins", install Munin to keep track of how resources are consumed on your server.
- Under "Software » MySQL/MariaDB Upgrade", choose the database software and version you want to use.
- Depending on your EasyApache version (EA3 or EA4), grab the latest profile here to install: [https://github.com/engintron/engintron/tree/master/cpanel/EasyApache_Profiles](https://github.com/engintron/engintron/tree/master/cpanel/EasyApache_Profiles)
- Install Engintron (of course) :)
- Follow the rest of the "Beyond Engintron" guides in this wiki to optimize Apache, MySQL, PHP and CentOS.
- Finally, setup your user accounts and domains in cPanel/WHM