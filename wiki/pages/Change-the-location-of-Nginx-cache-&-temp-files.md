For some users, the default /tmp directory used by Engintron's Nginx for cache & temp files may quickly fill up either because of many/busy sites hosted on the server or because it is small in size.

In such a case, you can easily move the location of Nginx's cache & temp files elsewhere.


Execute the following one at a time:

```
mkdir -p /var/engintron/tmp
chown -R nginx:nginx /var/engintron/tmp
sed -i "s:/tmp:/var/engintron/tmp:" /etc/nginx.conf
sed -i "s:find /tmp:find /var/engintron/tmp:" /engintron.sh
nginx -t
service nginx restart
```

Or in line (for simplicity):
```
mkdir -p /var/engintron/tmp; chown -R nginx:nginx /var/engintron/tmp; sed -i "s:/tmp:/var/engintron/tmp:" /etc/nginx.conf; sed -i "s:find /tmp:find /var/engintron/tmp:" /engintron.sh; nginx -t; service nginx restart
```

The above command changes the root location of Nginx's cache & temp files from /tmp to /var/engintron/tmp.

Remember to re-apply this command every time you update Engintron.

_This will be configurable in future releases of Engintron._