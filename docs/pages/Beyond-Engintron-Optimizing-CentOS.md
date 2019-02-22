## Optimizing CentOS

Every Linux based distribution includes some resource limits one way or the other. These limits usually pose some restrictions for stability purposes on networking as well as how many open files the server can handle at any time.

When you operate a web server under significant traffic (we're talking about millions of page views per month for all sites combined), these limits can often be reached.

The process to optimize CentOS specifically involves updating some system files. I'm assuming you are already using Nginx (via Engintron) cause if you don't, well, you got other things to worry first :)

Nginx, as provided by Engintron, is already optimized to handle a large number of connections.

So what remains to be done is tweak a couple of system files in CentOS (these files also exist in other Linux distributions like Ubuntu or Debian).

The first file to edit is: **/etc/security/limits.conf**

At the very bottom of this file, add the following lines:

```
# Performance Tuning
*       soft    nproc   32768
*       hard    nproc   65535
*       soft    nofile  32768
*       hard    nofile  65535
root    soft    nproc   32768
root    hard    nproc   65535
root    soft    nofile  32768
root    hard    nofile  65535
```

Now edit the file: **/etc/sysctl.conf**

At the very bottom of this file, add the following lines:

```
# Performance Tuning
fs.file-max = 2097152
net.core.netdev_max_backlog = 131070
net.core.somaxconn = 131070
net.ipv4.tcp_max_syn_backlog = 3240000
net.ipv4.tcp_max_tw_buckets = 1440000
net.ipv4.tcp_window_scaling = 1
vm.swappiness = 30
```

To apply these changes, simply type this command as root user via SSH:

```
$ sysctl -p
```

If you get an error about "net.core.somaxconn" not being merged, change its value to "65535" and then re-merge with:
```
$ sysctl -p
```

The changes are now active and your system is able to handle more concurrent network connections (always limited by your server's available uplink though) as well as keep more open files at the same time, which is inevitable when serving lots of page views per month (in total) and generally have a busy server.