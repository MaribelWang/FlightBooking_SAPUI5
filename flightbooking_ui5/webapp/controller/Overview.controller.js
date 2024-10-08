sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],
function (Controller, History, UIComponent) {
    "use strict";
    return Controller.extend("convista.flightbookingui5.controller.Overview", {
        onInit: function () {
        },
        onRowPress: function(oEvent){
            // Handler for row selection in the SmartTable
            var oContext = oEvent.getParameter('listItem').getBindingContext().getObject();
            var oRouter = UIComponent.getRouterFor(this);

            // Format and encode FlightDate
            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "yyyy-MM-dd'T'HH:mm:ss"
            });
            var sFormattedDate = oDateFormat.format(new Date(oContext.FlightDate));
            var sEncodedDate = encodeURIComponent(sFormattedDate);

            // Navigation to another route with parameters
            oRouter.navTo("BookingInformation", {
                AirLineID: oContext.AirLineID,
                FlightDate: sFormattedDate, 
                FlightConnectionID: oContext.FlightConnectionID
            });
        }
    });
});