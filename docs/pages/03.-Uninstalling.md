## Uninstalling

Login as root user in your server using an SSH connection and execute the following commands:

`$ engintron remove`

This process will completely uninstall Engintron, as well as all configuration files, including the WHM app dashboard.

It will also revert your system back to its previous state.

To be more exact, the Apache HTTP port will switch from 8080 back to 80 and the Apache module installed by Engintron to pass visitor IP info from Nginx to Apache will also be removed.

If for some reason Apache fails to start after you uninstall Engintron, simply open up WHM and navigate to "Tweak Settings", then look up Apache's HTTP port field and if the value there is 0.0.0.0:8080, simply change it to 0.0.0.0:80. Hit save and then restart Apache from within WHM.
