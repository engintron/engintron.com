## Engintron vs. cPanel Nginx

### Not so fast buddy... cPanel officially added support for Nginx in 2021. Why should I use Engintron?

cPanel indeed added support for Nginx back in 2021. In fact, they integrate Nginx in 2 ways: as a proxy (like Engintron) and as a direct replacement for Apache.

Engintron is different for 3 + 1 reasons really:

* Engintron has a kick-ass, flexible proxy configuration for Nginx, which has powered hundreds of thousands of sites worldwide since 2014, unlike any other system, even cPanel's own proxy option in Nginx. The latter also follows an entirely different logic to Engintron. We'd like to think Engintron's is more flexible and also truly plug-n-play. Performance wise, Engintron's proxy configuration for Nginx is also faster compared to cPanel's (not our word, cPanel's... have a look [here](https://web.archive.org/web/20210420034851/https://blog.cpanel.com/how-to-install-and-manage-nginx-on-cpanel/) or [here](https://archive.ph/NOI2v)...).
* Engintron uses the official Nginx packages, provided by Nginx.org. So you get instant Nginx updates and don't have to wait for cPanel to bundle Nginx separately.
* Because of Engintron's kick-ass proxy configuration for Nginx, you can continue using Apache as your main web server. That's a huge plus for existing webhosts. The alternative of using cPanel's Nginx as a direct Apache replacement opens up all kinds of issues, as Nginx was never really built to support shared hosting environments for which Apache is more suitable.
* And finally, Engintron has a cool WHM dashboard (and CLI interface) which is not tied exclusively to Nginx. Instead you get additional options and utilities to make managing your cPanel server much more efficient. And these options and utilities are regularly updated and expanded. Once you use Engintron for a while, it'll become your go-to dashboard in WHM.
