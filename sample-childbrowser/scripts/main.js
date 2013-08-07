//NOTE: Cordova File api has some issues with file reading in iOS 6
document.addEventListener("deviceready", onDeviceReady, false);
//Activate :active state
document.addEventListener("touchstart", function() {
}, false);

function onDeviceReady() {
    navigator.splashscreen.hide();
    var childbrowserApp = new ChildbrowserApp();
    childbrowserApp.run();
}

function ChildbrowserApp() {
}

ChildbrowserApp.prototype = {
    urlField: null,
    resultsField: null,
     
    run: function() {
        var that = this,
        showWebPageButton = document.getElementById("showWebPageButton"),
        openExternalButton = document.getElementById("openExternalButton");
        
        that.urlField = document.getElementById("urlInput");
        that.resultsField = document.getElementById("result");
        
        showWebPageButton.addEventListener("click",
                                           function() { 
                                               that._showWebPage.call(that); 
                                           });
        
        openExternalButton.addEventListener("click",
                                            function() {
                                                that._openExternal.call(that);
                                            });
        
        //Childbrowser events
        window.plugins.childBrowser.onClose = function () {
            var message = "[event] onClose raised";
            
            that._addMessageToLog.call(that, message);
        };

        window.plugins.childBrowser.onLocationChange = function (url) {
            var message = "[event] onLocationChange raised with url : " + url ;
            
            that._addMessageToLog.call(that, message);
        };
        
        window.plugins.childBrowser.onOpenExternal = function () {
            var message = "[event] onOpenExternal raised";
            that._addMessageToLog.call(that, message);
        };
    },
    
    _showWebPage: function() {
        var that = this,
        url = that.urlField.value;
        if (device.uuid == "e0101010d38bde8e6740011221af335301010333" || device.uuid == "e0908060g38bde8e6740011221af335301010333") {
            alert("Not Supported in Simulator.");
        }
        else
            window.plugins.childBrowser.showWebPage(url,
                                                    { showLocationBar: true },
                                                    { showAddress : true },
                                                    { showNavigationBar : true });
    },
	
    _openExternal: function () {
        var that = this,
        url = that.urlField.value;
        if (device.uuid == "e0101010d38bde8e6740011221af335301010333" || device.uuid == "e0908060g38bde8e6740011221af335301010333") {
            alert("Not Supported in Simulator.");
        }
        else {
            if (device.platform == 'Android') {
                window.plugins.childBrowser.openExternal(url);
            }
            else {
                //open external is Android only
                window.open(url, "_system");
            }
        }
    },

    _addMessageToLog: function(message) {
        var that = this,
        currentMessage = that.resultsField.innerHTML;
        
        that.resultsField.innerHTML = currentMessage + message + '<br />'; 
    }
}