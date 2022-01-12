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
        var notice = '<div style="font-size:12px;text-align:center;padding:10px;background:#00b243;color:#fff;opacity:0.9;position:absolute;top:0;left:0;right:0;border-bottom:2px solid #008d23;z-index:999999;"><div style="width:92%;margin:auto;padding:0;">A newer version of Engintron (v'+CURRENT_VERSION+') is now available. Update Engintron to the latest version <a style="color:#fff;font-weight:bold;" href="engintron.php?op=engintron_update_stable">for Nginx "stable"</a> or <a style="color:#fff;font-weight:bold;" href="engintron.php?op=engintron_update_mainline">for Nginx "mainline"</a>.<br />For more information please have a look at the <a style="color:#fff;font-weight:bold;" target="_blank" href="https://engintron.com/docs/#/pages/Changelog">Engintron release changelog</a>.</div></div>';
        var mountNotice = document.createElement('div');
        mountNotice.innerHTML = notice;
        b.appendChild(mountNotice);
    }
})();
