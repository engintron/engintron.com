## Redirect webmail.domain.tld from HTTP to HTTPS

Nginx will not redirect any webmail.domain.tld request from HTTP to HTTPS by default (at the time of writing).

If you wish to have this feature enabled, open up the Engintron WHM app to edit your Nginx "custom rules". In that file, append at the end the following configuration snippet.

```
if ($scheme = "http") {
    set $redirToSSL "yes";
}

if ($host ~* "^webmail\.") {
    set $isWebmail "please";
}

set $webmailRedirection $redirToSSL$isWebmail;

if ($webmailRedirection = "yesplease") {
	return 301 https://$host$request_uri;
}
```

Save and you're done.