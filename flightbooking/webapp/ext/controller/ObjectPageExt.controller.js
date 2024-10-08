sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        NavigationToSubpage: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});