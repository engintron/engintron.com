/**
 * @service    Engintron Web Services
 * @author     Fotis Evangelou (https://kodeka.io)
 * @url        https://engintron.com
 * @copyright  Copyright (c) 2014 - 2022 Kodeka OÜ. All rights reserved.
 * @license    GNU/GPL license: https://www.gnu.org/copyleft/gpl.html
 */

(function(){
    var CURRENT_VERSION = '2.0';
    var b = document.getElementsByTagName('body')[0];
    function versionCompare(left, right) {
        if (typeof left + typeof right != 'stringstring') return false;
        var a = left.split('.'),
            b = right.split('.'),
            i = 0,
            len = Math.max(a.length, b.length);
        for (; i < len; i++) {
            if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
                return 1;
            } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
                return -1;
            }
        }
        return 0;
    }
    if(versionCompare(CURRENT_VERSION, ENGINTRON_VERSION) > 0){
        var notice = '<div style="position:absolute;top:0;left:20%;right:20%;z-index:999999;width:60%;margin:15px auto;padding:15px;background:#00b243;opacity:0.95;border-bottom:5px solid #008d23;border-radius:15px;font-family:monospace;font-size:15px;color:#fff;text-align:center;line-height:160%;">A newer version of Engintron (v'+CURRENT_VERSION+') is now available.<br />Update Engintron to the latest version <a style="color:#fff;font-weight:bold;text-decoration:underline #73e36b 5px;" href="engintron.php?op=engintron_update_stable">for Nginx "stable"</a> or <a style="color:#fff;font-weight:bold;" href="engintron.php?op=engintron_update_mainline">for Nginx "mainline"</a>.<br />For more information please have a look at the <a style="color:#fff;font-weight:bold;" target="_blank" href="https://engintron.com/docs/#/pages/Changelog">Engintron release changelog</a>.</div>';
        var mountNotice = document.createElement('div');
        mountNotice.innerHTML = notice;
        b.appendChild(mountNotice);
    }
})();
