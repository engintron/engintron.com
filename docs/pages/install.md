## Installation (and updates)

### Requirements

Engintron is tested only on platforms that are actively supported by cPanel itself.

As such, as of January 2022, Engintron is fully compatible with CentOS 6 with CloudLinux (the only actively supported Enterprise Linux variant by cPanel as CentOS 6 is officially EOL since 2020), CentOS 7 and all EL 8 variants such as AlmaLinux, Rocky Linux & CentOS 8 (for which support by Red Hat stopped at the end of 2021).

Engintron should also work on other EL 8 variants (e.g. Oracle Linux, Amazon Linux etc.) that can run cPanel (albeit "unofficially")...

Additionally, once cPanel is officially released to also support Ubuntu (in the near future), Engintron will also be released to support Ubuntu as well.


### Installing Engintron for the first time

Installation is a process that lasts only a few minutes. You'll need root SSH access to your cPanel server. Also check the current requirements (listed lower). If everything is ok, log in as root and type (or copy/paste) the following command:

```
curl -sSL https://raw.githubusercontent.com/engintron/engintron/master/engintron.sh | bash -s -- install
```

If cURL is not available on your system, you can use wget like so:

```
wget --no-check-certificate -O - https://raw.githubusercontent.com/engintron/engintron/master/engintron.sh | bash -s -- install
```

The process will take a couple of minutes to complete and after that, Engintron will be installed on your cPanel server. Engintron has a nice user interface which is activated inside WHM, under the Plugins section. After installation, refresh WHM in your browser and you should see Engintron in the Plugins section (it's the absolute last section in WHM's sidebar).

In there, you'll find basic options to control Nginx, Apache and MySQL, all in one convenient place. Additionally, you can edit all of Nginx's configuration files (as well as some from Apache & MySQL) to get even more from Engintron (e.g. configure Engintron for use with CloudFlare). If however all you want is to accelerate both static & dynamic content delivery, then Engintron is already setup for you and you don't need to do anything more.

Inside the Engintron app dashboard you'll also find some handy utilities to monitor things like your Nginx access & error logs, check processes on your server or see incoming traffic on ports 80/443.


### Update (or re-install) Engintron

To re-install or update Engintron, either use Enginton's WHM app (there's a link to update/re-install Engintron) or if you prefer the terminal simply follow the same process as described in the installation section above.

HOWEVER, if you have customized any of the 5 main Nginx configuration files (nginx.conf, the 3 proxy\_params\_* files, default.conf), please back up your changes, so you can paste them back after the update. As of version 1.6.2, "custom\_rules" is not changed on subsequent updates in order to maintain your custom Nginx configuration options like for example rules for CloudFlare. Engintron will always override the 5 configuration files mentioned earlier upon re-installation or update to ensure things always work as expected.

If for some reason you forget to do this, we got your back (shit can happen, right?). Login as root and navigate to Nginx's files to retrieve the backups of the configuration files which are automatically created when you re-install/update Engintron:

```
$ cd /etc/nginx
$ cat nginx.conf.bak
$ cat proxy_params_common.bak
$ cat proxy_params_dynamic.bak
$ cat proxy_params_static.bak
$ cat conf.d/default.conf.bak
```

This way you can view your previous changes so you can copy them to the new configuration files installed.

**We HIGHLY recommend** that any customizations to Nginx's configuration are only performed inside the custom\_rules file. When you update Engintron, we can show you a copy of your previous "custom\_rules" file so you can copy/paste or adapt any of your custom Nginx rules to the new release's "custom\_rules" file.
