As you probably know already, cPanel's AutoSSL feature supports "Let's Encrypt" certificates for some time now. However, because there is some sort of business partnership between cPanel and Comodo, "Let's Encrypt" is only available as a plugin which you have to install.

That being said, here are some overall considerations to have your server work smoothly with Engintron and TLS/SSL certificates for all your domains...

a) If you can choose between "Let's Encrypt" and "Comodo" in AutoSSL, **PREFER** the "Let's Encrypt" option and use the associated plugin by cPanel. More info is available here https://documentation.cpanel.net/display/CKB/The+Let's+Encrypt+Plugin and the installation is a matter of simply executing this as root user:
```
/scripts/install_lets_encrypt_autossl_provider
```

b) In WHM's **AutoSSL** option, make sure all your domains have AutoSSL enabled and make sure auto-updating is also enabled. If you have certificates from previous providers for domain validation only (which you don't really need now), delete them from the SSL Manager and re-issue using AutoSSL.

c) Once done with (a) and (b), cleanup Nginx's cache/temp files and restart Apache/Nginx.

Everything should work as expected now.

The free Comodo certificates in AutoSSL seem to cause chain issues in Nginx for reasons unknown. The solution above is simpler.