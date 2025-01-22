sap.ui.define(
	[
	  "com/cicre/po/controller/BaseController",
	  "sap/ui/model/json/JSONModel",
	  "sap/ui/core/routing/History",
	  "com/cicre/po/model/formatter",
	  "sap/ui/model/Filter",
	  "sap/ui/model/FilterOperator",
	  "sap/ui/export/Spreadsheet",
	  "sap/m/MessageToast",
	],
	function (BaseController, JSONModel, History, formatter, Filter, FilterOperator, Spreadsheet, MessageToast) {
	  "use strict";
  
	  return BaseController.extend("com.cicre.po.controller.Worklist", {
		formatter: formatter,
		sCoCode: "",
		sPONO: "",
		sVendor: "",
		sProj: "",
		sPGrp: "",
		sPOrg: "",
		POrgText: "",
		POrgCode: "",
		sProjectCode: "",
		ContractCode: "",
		sDocType: "",
		SupeiorWBSCode: "",
		sVendor: "",
		SERTYPE: "",
		SERTYPEText: "",
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
  
		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
		  var oViewModel,
			iOriginalBusyDelay,
			oTable = this.byId("table");
		  //	this.getRouter().getRoute("worklist").attachPatternMatched(this._onObjectMatched, this);
  
		  // Put down worklist table's original value for busy indicator delay,
		  // so it can be restored later on. Busy handling on the table is
		  // taken care of by the table itself.
		  iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
		  // keeps the search state
		  this._oTableSearchState = [];
		  var  dataModel = new JSONModel();
  
		  // Model used to manipulate control states
		  oViewModel = new JSONModel({
			worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
			saveAsTileTitle: this.getResourceBundle().getText("worklistViewTitle"),
			shareOnJamTitle: this.getResourceBundle().getText("worklistViewTitle"),
			shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
			shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
			tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
			tableBusyDelay: 0,
		  });
		//   this.sCoCode = "1000";
		//   this.sCoText = "EDSCO";
		  this.getView().byId("idSearchByCompany").setValue(this.sCoText);
		  
		//   this.sDocType = "ZSES";
		//   this.sDocTypeText = "SESMI CONTRACTS";
		  this.getView().byId("idSearchByDecTy").setValue(this.sDocTypeText);
		  
		  this.setModel(oViewModel, "worklistView");
		  this.getView().setModel(dataModel, "dataModel");
		//   this.sPOrg = "1000";
		//   this.POrgText = "TMG CENTRAL Purch.";
		  this.getView().byId("idPurchaseOrganization").setValue(this.POrgText);
  
		  // Make sure, busy indication is showing immediately so there is no
		  // break after the busy indication for loading the view's meta data is
		  // ended (see promise 'oWhenMetadataIsLoaded' in AppController)
		  oTable.attachEventOnce("updateFinished", function () {
			// Restore original busy indicator delay for worklist's table
			oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
		  });
		},
        
		////////////////////////////// company code search value help ////////////////////////////////
		onDisplaySearchCompDialog: function () {
            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("com.cicre.po.view.fragments.CompanySearchDialog", this);
                this.getView().addDependent(this._oDialog); // Add the dialog as a dependent to ensure proper lifecycle handling.
                this._oDialog.setModel(this.getView().getModel()); // Bind the same model to the dialog.
              }
            
              // Fetch data programmatically to populate the dialog
              const oModel = this.getOwnerComponent().getModel(); // OData V4 model
              const oBinding = oModel.bindList("/CompanyCode"); // Bind the list to the entity
            
              oBinding.requestContexts(0, 100).then((aContexts) => {
                const aData = aContexts.map((oContext) => oContext.getObject());
            
                // Create a JSON model for the dialog
                const oDialogModel = new sap.ui.model.json.JSONModel();
                oDialogModel.setData(aData);
                this._oDialog.setModel(oDialogModel, "dialog"); // Set the JSON model for the dialog
              }).catch((oError) => {
                console.error("Error fetching data:", oError);
              });
            
              // Open the dialog
              this._oDialog.open();
		}
    
    })
    });