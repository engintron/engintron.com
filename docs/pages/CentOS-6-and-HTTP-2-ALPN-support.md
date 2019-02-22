## CentOS 6 and HTTP 2 ALPN support

_The following was contributed by user [@Technopope](https://github.com/Technopope)_

HTTP/2 ALPN is not yet supported by Engintron on CentOS 6 because Engintron installs Nginx from the official nginx.org repositories, which do not have updated builds for CentOS 6.

However there is a custom build of Nginx made by CodeIT which you can use: [https://codeit.guru/en_US/](https://codeit.guru/en_US/)

Run this as root:
```
$ cd /etc/yum.repos.d && wget https://repo.codeit.guru/codeit.el`rpm -q --qf "%{VERSION}" $(rpm -q --whatprovides redhat-release)`.repo
```

Then re-install Engintron from its WHM app or simply execute this as root from a terminal:
```
$ /engintron.sh update
```

You should now have HTTP/2 ALPN support enabled on your CentOS 6 server.