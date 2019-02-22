## How to uninstall other Nginx plugins for cPanel (before installing Engintron)

If you already have another Nginx plugin for cPanel installed on your server, it's best to remove it first, before installing Engintron. This way you'll have zero downtime and you essentially need not change any configuration file.

Below you can find uninstall methods for such plugins as users report them.

### For Cpnginx (commercial)
Login to your server as root user via a terminal and then execute this to uninstall Cpnginx:
```
sh /etc/cpnginx/uninstall.sh
```

Or according to this [https://cpnginx.com/documentation/introduction.php#uninstallation](https://cpnginx.com/documentation/introduction.php#uninstallation) if you can locate the installer file (install.py), then execute this:
```
chmod 755 install.py &&  ./install.py remove
```

### For Nginx Admin (also know as NginxCP) (free)
Login to your server as root user via a terminal and then execute this to uninstall Nginx Admin:
```
cd /usr/local/src
wget http://nginxcp.com/latest/nginxadmin.tar
tar xf nginxadmin.tar
cd publicnginx
./nginxinstaller uninstall
```
(taken from [https://www.nginxcp.com/installation-instruction/](https://www.nginxcp.com/installation-instruction/))
