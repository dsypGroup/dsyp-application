import utils from '../utils/utils';

export default (function () {
    var requestFullScreen = function (element) {
        // Supports most browsers and their versions.
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen ||
            element.msRequestFullscreen;

        if (requestMethod) { // Native full screen.
            requestMethod.call(element);
        } else { // Older IE.
            try {
                // Ignore from JSHint and ESLint, this is only available in IE and this is how it should be invoked
                /*eslint-disable */
                var wScript = new ActiveXObject('WScript.Shell'); // jshint ignore:line
                /*eslint-enable */

                wScript.SendKeys('{F11}');
            } catch (e) {
                utils.logger.logError('Full screen mode not supported by the browser');

                showMessage();
            }
        }
    };

    var cancelFullScreen = function (element) {
        var requestMethod = element.cancelFullScreen || element.webkitCancelFullScreen || element.mozCancelFullScreen ||
            element.exitFullscreen || element.webkitExitFullscreen || element.msExitFullscreen;

        if (requestMethod) { // cancel full screen.
            requestMethod.call(element);
        } else { // Older IE.
            try {
                // Ignore from JSHint and ESLint, this is only available in IE and this is how it should be invoked
                /*eslint-disable */
                var wScript = new ActiveXObject('WScript.Shell'); // jshint ignore:line
                /*eslint-enable */

                wScript.SendKeys('{F11}');
            } catch (e) {
                utils.logger.logError('Full screen mode not supported by the browser');

                showMessage();
            }
        }
    };

    var showMessage = function () {
        // TODO: [Sahan] Find a way to pass the message in current language
        utils.messageService.showMessage('Full screen mode not supported by the browser. Please press F11.', utils.Constants.MessageTypes.Warning, false, 'Warning', [{
            type: utils.Constants.MessageBoxButtons.Ok
        }]);
    };

    return {
        requestFullScreen: requestFullScreen,
        cancelFullScreen: cancelFullScreen
    };
})();