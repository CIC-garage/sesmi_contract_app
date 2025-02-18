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
  
	  return BaseController.extend("com.cicre.po.controller.WorkList", {
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
		//   const tableModel = this.getOwnerComponent().getModel();
  
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
		  this.sCoCode = "1000";
		  this.sCoText = "EDSCO";
		  this.getView().byId("idSearchByCompany").setValue(this.sCoText);
		  
		  this.sDocType = "ZSES";
		  this.sDocTypeText = "SESMI CONTRACTS";
		  this.getView().byId("idSearchByDecTy").setValue(this.sDocTypeText);
		  
		  this.setModel(oViewModel, "worklistView");
		  this.getView().setModel(dataModel, "dataModel");
		  this.sPOrg = "1000";
		  this.POrgText = "TMG CENTRAL Purch.";
		  this.getView().byId("idPurchaseOrganization").setValue(this.POrgText);
  
		  // Make sure, busy indication is showing immediately so there is no
		  // break after the busy indication for loading the view's meta data is
		  // ended (see promise 'oWhenMetadataIsLoaded' in AppController)
		  oTable.attachEventOnce("updateFinished", function () {
			// Restore original busy indicator delay for worklist's table
			oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
		  });
		  this.onSearch();
		},
		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
  
		/**
		 * Triggered by the table's 'updateFinished' event: after new table
		 * data is available, this handler method updates the table counter.
		 * This should only happen if the update was successful, which is
		 * why this handler is attached to 'updateFinished' and not to the
		 * table's list binding's 'dataReceived' method.
		 * @param {sap.ui.base.Event} oEvent the update finished event
		 * @public
		 */
		onUpdateFinished: function (oEvent) {
			// update the worklist's object counter after the table update
			var sTitle,
			  oTable = oEvent.getSource(),
			  iTotalItems = oEvent.getParameter("total");
			// only update the counter if the length is final and
			// the table is not empty
			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
			  sTitle = this.getResourceBundle().getText("Contract", [iTotalItems]);
			} else {
			  sTitle = this.getResourceBundle().getText("Contract");
			}
			this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
		  },
	
		  /**
		   * Event handler when a table item gets pressed
		   * @param {sap.ui.base.Event} oEvent the table selectionChange event
		   * @public
		   */
		  onPress: function (oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		  },
		  onSearch: function (oEvent) {
			var oController = this;
			var oModel = oController.getOwnerComponent().getModel();
			oModel.bindList("/HeaderSet")
        .requestContexts()
        .then((aContexts) => {
            const aData = aContexts.map(oContext => oContext.getObject());
            console.log("HeaderSet Data:", aData);

            // Set data to a JSON model for local use
            // const oJsonModel = new sap.ui.model.json.JSONModel(aData);
            // this.getView().setModel(oJsonModel, "localModel");
			oController.getView().getModel("dataModel").setProperty("/HeaderSet", aData);
        })
        .catch((oError) => {
            console.error("Error fetching HeaderSet data:", oError);
        });
		},
        
		////////////////////////////// company code search value help ////////////////////////////////
		onDisplaySearchCompDialog: function (oEvent) {
			this.compInd = oEvent.getSource().getId();
			
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.cicre.po.view.fragments.CompanySearchDialog", this);
				this.getView().addDependent(this._oDialog);
			}
		
			const oModel = this.getOwnerComponent().getModel();
			this._oDialog.setModel(oModel, "dialog");
		
			// Ensure correct binding path
			this._oDialog.bindAggregation("items", {
				path: "/ValueHelpSet", // Ensure this matches your entity
				filters: [new sap.ui.model.Filter("ValueHelpType", sap.ui.model.FilterOperator.EQ, "CompCode")],
				template: new sap.m.StandardListItem({
					title: "{IdText}",
					description: "{IdNumber}",
					type: "Active"
				})
			});
		
			this._oDialog.open();
		},
		onCreateContractPress: function (oItem) {
			this.getView().setBusy(true);
			this.getRouter().navTo("createContract");
			this.getView().setBusy(false);
		  }
    
    })
    });