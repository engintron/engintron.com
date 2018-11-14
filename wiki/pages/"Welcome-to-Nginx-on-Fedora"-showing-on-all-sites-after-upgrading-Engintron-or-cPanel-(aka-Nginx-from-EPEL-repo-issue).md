This issue surfaced after March 2018 and it basically boils down to Nginx being replaced by a copy referenced in the EPEL repository that some cPanel users/admins have added to their server.

Since the EPEL repo is quite popular in the CentOS community, it may be installed in your system by some other cPanel plugin or software package that required that repo.

The solution is to disable that behaviour obviously and stop the official Nginx build being replaced by the one from the EPEL repository.

So if you have the EPEL repository configured on your cPanel server (`ls /etc/yum.repos.d/epel.repo` returns the epel.repo file = EPEL is present), execute the following in a terminal as root user, line by line:
```
sed -i "s/enabled=1/enabled=1\nexclude=nginx\*/" /etc/yum.repos.d/epel.repo
yum remove nginx
yum clean all
/engintron.sh remove
cd /
rm -f engintron.sh
wget --no-check-certificate https://raw.githubusercontent.com/engintron/engintron/master/engintron.sh
bash engintron.sh install
```

Or use this one-liner instead (triple-click below to select everything):
```
sed -i "s/enabled=1/enabled=1\nexclude=nginx\*/" /etc/yum.repos.d/epel.repo; yum remove nginx; yum clean all; /engintron.sh remove; cd /; rm -f engintron.sh; wget --no-check-certificate https://raw.githubusercontent.com/engintron/engintron/master/engintron.sh; bash engintron.sh install
```