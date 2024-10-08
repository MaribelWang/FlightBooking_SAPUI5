sap.ui.define([
    "sap/ui/core/format/DateFormat"
], function (DateFormat) {
    "use strict";
    return {
        formatDateTime: function (sDate) {
            if (!sDate) {
                return "";
            }
            var oDateFormat = DateFormat.getDateTimeInstance({
                pattern: "MMM dd, yyyy, h:mm:ss a"
            });
            return oDateFormat.format(new Date(sDate));
        }
    };
});
