## Installation (and updates)

### Requirements

Engintron is tested only on platforms that are actively supported by cPanel itself.

As such, as of January 2022, Engintron is fully compatible with CentOS 6 with CloudLinux (the only actively supported Enterprise Linux variant by cPanel as CentOS 6 is officially EOL since 2020), CentOS 7 and all EL 8 variants such as AlmaLinux, Rocky Linux & CentOS 8 (for which support by Red Hat stopped at the end of 2021).

Engintron should also work on other EL 8 variants (e.g. Oracle Linux, Amazon Linux etc.) that can run cPanel (albeit "unofficially")...

Additionally, once cPanel is officially released to also support Ubuntu (in the near future), Engintron will also be released to support Ubuntu as well.


### Installing Engintron for the first time

Installation is a process that lasts only a few minutes.

You'll need root SSH access to your cPanel server.

If everything is ok, log in as root and type the following command:

```
curl -sSL https://raw.githubusercontent.com/engintron/engintron/master/engintron.sh | bash -s -- install
```

If cURL is not available on your system, you can use wget like so:

```
wget --no-check-certificate -O - https://raw.githubusercontent.com/engintron/engintron/master/engintron.sh | bash -s -- install
```

The process will take a couple of minutes to complete and after that, Engintron will be installed on your cPanel server. Engintron has a nice & simple user interface which is activated inside WHM, under the Plugins section. After installation, refresh WHM in your browser and you should see Engintron in the Plugins section (it's the absolute last section in WHM's sidebar).

In there, you'll find basic options to control Nginx, Apache and MySQL, all in one convenient place. Additionally, you can edit all of Nginx's configuration files (as well as some from Apache & MySQL) to get even more from Engintron (e.g. configure Engintron for use with CloudFlare). If however all you want is to accelerate both static & dynamic content delivery, then Engintron is already setup for you and you don't need to do anything more.

Inside the Engintron app dashboard you'll also find some handy small utilities that make managing your server more productive.


### Update (or re-install) Engintron

To re-install or update Engintron, either use Enginton's WHM app (there's a link to update/re-install Engintron) or if you prefer the terminal simply follow the same process as described in the installation section above.

HOWEVER, if you have customized any of the 5 main Nginx configuration files (nginx.conf, the 3 proxy\_params\_* files & default.conf), then these these configuration files will be overwritten but they are backed up first by being renamed with .bak file extension. To view these files over terminal you can do:

```
$ cd /etc/nginx
$ cat nginx.conf.bak
$ cat proxy_params_common.bak
$ cat proxy_params_dynamic.bak
$ cat proxy_params_static.bak
$ cat conf.d/default.conf.bak
```

This way you can view your previous changes so you can copy them to the new configuration files installed.

However **we HIGHLY recommend** that any customizations to Nginx's configuration are only performed inside the custom\_rules file. 99,999% of the times your modifications can go there.
