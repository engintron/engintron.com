## Optimizing the system

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
*       soft    nofile  999999
*       hard    nofile  999999
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
net.core.somaxconn = 65535
net.ipv4.ip_local_port_range = 10000 65535
net.ipv4.ip_nonlocal_bind = 1
net.ipv4.tcp_max_syn_backlog = 3240000
net.ipv4.tcp_max_tw_buckets = 1440000
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_window_scaling = 1
net.netfilter.nf_conntrack_tcp_timeout_established = 600
vm.swappiness = 0
```

The value of "net.core.somaxconn" should not exceed 65535 for up to CentOS 7.

However if you use an Enterprise Linux 8 variant like AlmaLinux 8 or Rocky Linux 8 (or even the EOL'ed CentOS 8), you can bump the value of "net.core.somaxconn" to 100000.

To apply these changes, simply type this command as root user via SSH:

```
$ sysctl -p
```

The changes are now active and your system is able to handle more concurrent network connections (always limited by your server's available uplink though) as well as keep more open files at the same time, which is inevitable when serving lots of page views per month (in total) and generally have a busy server.
