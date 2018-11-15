The default Apache configuration that ships with cPanel is probably too restrictive. We can adjust Apache's basic configuration settings to improve both speed and CPU/RAM usage.

First things first though...

Make sure you are using Apache 2.4. It's way better and faster than Apache 2.2. You'll have to rebuild your server to do this via EasyApache.

After you rebuild Apache, you can have a look at Linode's knowledge base as a starting point [https://www.linode.com/docs/websites/apache-tips-and-tricks/tuning-your-apache-server](https://www.linode.com/docs/websites/apache-tips-and-tricks/tuning-your-apache-server) or better still, try using ApacheBuddy to get insights on your existing configuration: [https://github.com/gusmaskowitz/apachebuddy.pl](https://github.com/gusmaskowitz/apachebuddy.pl)

To give you an idea, this is a good starting point (for most servers):

	StartServers        5  
	MinSpareServers     5  
	MaxSpareServers     10  
	ServerLimit         500  
	MaxRequestWorkers   500 (this option was previously called MaxClients in Apache v2.2)  
	MaxRequestsPerChild 4000  
	Timeout             300

Especially the "Timeout" setting, can be lowered to say 120 or 60 (seconds) and make a huge difference in terms of CPU/RAM load.

In WHM, these Apache directives can be configured under "Service Configuration" >> "Apache Configuration" >> "Global Configuration".