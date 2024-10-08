
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "convista/flightbookingui5/utils/formatter"

], function (Controller, Filter, FilterOperator, JSONModel, formatter) {
    "use strict";
    return Controller.extend("convista.flightbookingui5.controller.BookingInformation", {
        formatter: formatter,
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("BookingInformation").attachPatternMatched(this._onRouteMatch, this);
            // Initialize a JSON model to store the selected flight date
            var oViewModel = new JSONModel({
                selectedFlightDate: ""
            });
            this.getView().setModel(oViewModel, "viewModel");
        },
        _onRouteMatch: function(oEvent) {
            var oArguments = oEvent.getParameter("arguments");
            this.AirLineID = oArguments.AirLineID;
            this.FlightConnectionID = oArguments.FlightConnectionID;
            this.FlightDate = decodeURIComponent(oArguments.FlightDate);

            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "yyyy-MM-dd'T'HH:mm:ss"
            });
            var oParsedDate = oDateFormat.parse(this.FlightDate);
            var sFormattedDate = "/Date(" + oParsedDate.getTime() + ")/";

            var flightCollectionPath = "/" + this.getView().getModel().createKey("FlightCollection", {
                AirLineID: this.AirLineID,
                FlightConnectionID: this.FlightConnectionID,
                FlightDate: sFormattedDate
            });

            this.getView().bindElement({
                path: flightCollectionPath,
                events: {
                    dataReceived: function() {
                        this.getView().byId("smartTable").rebindTable();
                    }.bind(this)
                }
            });
        },

        onBeforeRebindTable: function(oEvent) {
            var mBindingParams = oEvent.getParameter("bindingParams");
            mBindingParams.filters.push(new Filter("AirLineID", FilterOperator.EQ, this.AirLineID));
            mBindingParams.filters.push(new Filter("FlightConnectionID", FilterOperator.EQ, this.FlightConnectionID));
            mBindingParams.filters.push(new Filter("FlightDate", FilterOperator.EQ, this.FlightDate));
        },
        onBookingRowPress: function(oEvent) {
            // Get the source of the event (the list item)
            var oListItem = oEvent.getParameter('listItem') || oEvent.getSource();
        
            // Get the binding context of the pressed list item
            var oContext = oListItem.getBindingContext().getObject();
            
            // Get the router instance
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        
            // Format and encode the FlightDate
            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "yyyy-MM-dd'T'HH:mm:ss"
            });
            var sFormattedDate = oDateFormat.format(new Date(oContext.FlightDate));
            var sEncodedDate = encodeURIComponent(sFormattedDate);
        
            // Navigate to the FlightDetails route with the encoded parameters
            oRouter.navTo("FlightDetails", {
                AirLineID: oContext.AirLineID,
                FlightDate: sEncodedDate,
                FlightConnectionID: oContext.FlightConnectionID,
                BookingID: oContext.BookingID
            });
        }
        
        
    });
});
