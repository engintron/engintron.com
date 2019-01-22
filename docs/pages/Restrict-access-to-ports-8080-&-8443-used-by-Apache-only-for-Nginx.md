_(originally posted by Engintron user [@speegs](https://github.com/speegs) in Engintron's Issues)_

To restrict access to ports 8080 & 8443 used by Apache only for Nginx, follow these steps:

1. Install ConfigServer Firewall (CSF) from [https://configserver.com/cp/csf.html](https://configserver.com/cp/csf.html) - it's the best IPTables GUI for cPanel (and not only)!

2. Edit the file /etc/csf/csf.allow (either via terminal or via CSF's WHM app) and append these lines:
```
tcp|in|d=8080|s=127.0.0.1 # The loopback address
tcp|in|d=8080|s=1.2.3.4 # Replace 1.2.3.4 with your server's shared IP - if you have multiple IPs, clone this line and edit the IP
tcp|in|d=8443|s=127.0.0.1 # The loopback address
tcp|in|d=8443|s=1.2.3.4 # Replace 1.2.3.4 with your server's shared IP - if you have multiple IPs, clone this line and edit the IP
```

3. Edit /etc/csf/csf.deny (either via terminal or via CSF's WHM app) and append this line:
```
# Block all connections to port 8080 except those already allowed in csf.allow
tcp|in|d=8080|s=0.0.0.0/0 # do not delete
# Block all connections to port 8443 except those already allowed in csf.allow
tcp|in|d=8443|s=0.0.0.0/0 # do not delete
```
