import flappie from 'flappie';
import rootController from 'controllers/root'

console.log('testapp loaded...');
document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);
window.addEventListener("load", pageFullyLoaded, false);
 
function theDomHasLoaded(e) {
    flappie();
    rootController();
    console.log($.find('body'));
}
 
function pageFullyLoaded(e) {
}
