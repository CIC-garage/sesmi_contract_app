

service CatalogService {

    function GetCurrencyExecuteAction(Vendor: String) returns CurrencyResult;

    type CurrencyResult {
        Currency: String;
    }

  entity HeaderSet @readonly{
    Project    : String;
    Contract   : String; 
    PO         : String;
    Vendor     : String;
    CreatedBy : String;
    LastChangedBy : String;
    Status : String;
  }
 entity ValueHelpSet {
    key IdNumber         : String(10);
    IdText              : String(255);
    ValueHelpType       : String(20);
    SelectionParameter  : String(20);
    SelectionParameter2  : String(20);
    SelectionParameter3  : String(20);
    SelectionParameter4  : String(20);
    SelectionParameter5  : String(20);
    SelectionParameter6  : String(20);
    SelectionParameter7  : String(20);
}

  entity ContractPONote  {
    Flag          : String;
    key PoNumber      : String;
    NoteText      : String;
}

entity PCContratual  {
    DocNo                   : String;
    ContractualIndicator    : String;
    key ContractNo              : String;
}


entity BoqTree  {
    key ID                   : UUID;
    Boq                     : String;
    Model                   : String;
    UsageType               : String;
    DelInd                  : Boolean;
    ModelType               : String;
    Flag                    : String;
    Description             : String;
    Project                 : String;
    CompCode                : String;
    TotalQty                : Decimal(15,2);
    Status                  : String;

    // Navigations
    BoqHeaderToBoqItem      : Association to many BoqItem;
    BoqHeaderToBoqMatGtp    : Association to many BoqMatGrp;
    BoqHeadertoSubBoqItem   : Association to many BoqSubItem;
}

entity BoqSubItem  {
    key ID        : UUID;
    Boq          : String;
    BoqDesc      : String;
    UsageType    : String;
    Zused        : String;
    Project      : String;
    Status       : String;
    BoqSub       : String;
    ModelType    : String;
    DelInd       : Boolean;
    Flag         : String;
    CompCode     : String;
}

entity BoqMatGrp  {
    Boq          : String;
    BoqDesc      : String;
    Compcode     : String;
    Matdesc      : String;
    Project      : String;
    SubBoq       : String;
    UnitMeas     : String;
    Item         : String;
}

entity BoqItem  {
    Boq                  : String;
    ServiceCategory      : String;
    Servicedesc         : String;
    ServiceGroup        : String;
    ServiceShortText    : String;
    ValuationClass      : String;
    BoqDesc            : String;
    ServiceUsage       : String;
    EanCat             : String;
    SrvDesc           : String;
    UsageType         : String;
    CompCode          : String;
    Status           : String;
    SubBoq           : String;
    DelInd           : Boolean;
    ModelType        : String;
    LongText         : String;
    Project         : String;
    Matdesc         : String;
    Serviceno       : String;
    Flag            : String;
    UnitMeas        : String;
    Qty             : Decimal(15,2);
    Item            : String;
}
entity WFContractInbox  {
    OrderText        : String;
    RoleDesc         : String;
    WfText           : String;
    Workitem         : String;
    Flag             : String;
    UserName         : String;
    GroupId          : String;
    WorkflowId       : String;
    ContIntNo        : String;
    ReqId            : String;
    Version          : String;
    CreationDate     : Date;
    CreationTime     : Time;
    Description      : String;
    Status           : String;
    StepNo          : Integer;
    DecisionDate     : Date;
    DecisionTime     : Time;
    DecisionBy       : String;
    Comments         : String;
}

entity Permission  {
    key ID        : UUID;
    CompCode     : String;
    PermKey      : String;
    UserName     : String;
    PoNumber     : String;
    AuthInd      : String;
}

entity ReleaseError  {
    PoHeader   : String;
    Type       : String;
    ErrItem    : String;
    ErrMsg1    : String;
    ErrMsg2    : String;
}

entity POBuilding  {
    ActivityNumber          : String;
    PoHeader               : String;
    SrvStatus              : String;
    Type                   : String;
    Buildingno             : String;
    Network                : String;
    Zone                   : String;
    Model                  : String;
    Submodel               : String;
    ContractualIndicator   : String;
    TextContInd            : String;
    VariationOrder         : String;
    ChangeIndicator        : String;
    DeleteIndicator        : String;
}

entity OrderHeader  {
    AddValues         : Decimal(15,2);
    DaysNo           : Integer;
    ChangeInd        : String;
    MonthNo         : Integer;
    OmissionValues  : Decimal(15,2);
    WfStatus        : String;
    ChangeAmount    : Decimal(15,2);
    Currency        : String;
    ContractNo      : String;
    OrderNo         : String;
    VarStatus       : String;
    UserOrder       : String;
    OrderType       : String;
    OrderDesc       : String;
    Type            : String;
    OrderDate       : Date;
    MonthIndex      : Integer;
    Action          : String;
    Status          : String;
    Meins           : String;
}

entity Attachment  {
    key AttachmentId      : UUID;
    CreatedBy           : String;
    LinkedToStandard   : Boolean;
    Objtp              : String;
    DocNo              : String;
    Objyr              : Integer;
    CreationDate       : Date;
    Objno              : String;
    Value              : Decimal(15,2);
    CreationTime       : Time;
    Filename           : String;
    Flag               : String;
    Extension          : String;
}
entity ContractPOItem  {
    key ID                 : UUID;
    IuidRelevant          : String;
    PrItem                : String;
    PriceUnit             : Integer;
    SrvType               : String;
    Amount                : Decimal(15,2);
    ProvisionRate         : Decimal(5,2);
    BoqStxt              : String;
    Network              : String;
    ActivityNumber       : String;
    Currency             : String;
    Buildingno           : String;
    ContractualIndicator : String;
    Matdesc              : String;
    ServiceType          : String;
    SrvStatus            : String;
    Txt                  : String;
    BoqLtxt              : String;
    ChangeIndicator      : String;
    SubBoq               : String;
    SubboqStxt          : String;
    VariationOrder       : String;
    Flag                 : String;
    SubboqLtxt          : String;
    OvfTol               : Decimal(5,2);
    Project              : String;
    Servicedesc         : String;
    SrvNo                : String;
    PoItem               : String;
    LongText             : String;
    PurchDoc             : String;
    Boq                  : String;
    DeleteInd            : String;
    PoHeader             : String;
    Plant                : String;
    MatlGroup           : String;
    Qty                  : Decimal(15,3);
    PoUnit               : String;
    ItemCat              : String;
    Acctasscat          : String;
    ShortText           : String;
    Serviceno           : String;
    BaseUom             : String;
    WbsElement          : String;
    NoLimit             : Boolean;
    DeliveryDate        : Date;
}

entity Building  {
    key ID                  : UUID;
    ActivityNumber         : String;
    AsBuild2              : String;
    Boq                   : String;
    BoqDesc               : String;
    BuildingTxt           : String;
    CompCode              : String;
    ContractualIndicator  : String;
    Filterall             : String;
    Network               : String;
    PoHeader              : String;
    SrvStatus             : String;
    SrvType               : String;
    Txt                   : String;
    Type                  : String;
    Zzgroup               : String;
    ModelDesc             : String;
    SubBoq                : String;
    Usagetype             : String;
    ZoneTxt               : String;
    GroupTxt              : String;
    Wbs                   : String;
    Model                 : String;
    BoqStatus             : String;
    Project               : String;
    Zone                  : String;
    Group                 : String;
    ModelType             : String;
    BuildingNo            : String;
}


entity ContractPOSrvItem  {
    key ID                  : UUID;
    AsBuild2               : String;
    DeletePo               : Boolean;
    MatlGroupDesc          : String;
    PrItem                 : String;
    PriceUnit              : Integer;
    Amount                 : Decimal(15,2);
    ProvisionRate          : Decimal(5,2);
    SrvType                : String;
    Currency               : String;
    Network                : String;
    ActivityNumber         : String;
    AsbuildVar             : String;
    AsBuilt                : String;
    ChangeIndicator        : String;
    SrvLongText            : String;
    SrvStatus              : String;
    Status                 : String;
    Txt                    : String;
    VariationOrder         : String;
    AsBuild                : String;
    Change                 : String;
    ContractualIndicator   : String;
    Project               : String;
    ServiceType           : String;
    SubBoq                : String;
    PurchDoc              : String;
    Servicedesc           : String;
    PoHeader              : String;
    PoItem                : String;
    SrvNo                 : String;
    Serviceno             : String;
    DeleteInd             : String;
    Plant                 : String;
    MatlGroup             : String;
    Qty                   : Decimal(15,3);
    PoUnit                : String;
    ItemCat               : String;
    Acctasscat            : String;
    ShortText             : String;
    BaseUom               : String;
    WbsElement            : String;
    NoLimit               : Boolean;
    DeliveryDate          : Date;
    LongText              : String;
    Boq                   : String;
    OvfTol                : Decimal(5,2);
    Buildingno            : String;
}

entity ContractPOHeaderSet  {
    AsBuilt                         : String;
    CommencementId                  : String;
    ContDurationMonth               : Integer;
    ContractTermsInd                : String;
    LastChangedAsBuiltBy            : String;
    ProcessContractValue            : Decimal(15,2);
    ProjectDesc                     : String;
    ContDurationDays                : Integer;
    DateOfApplying                  : Date;
    Version                         : Integer;
    CommencementDate                : Date;
    EstimatedContractValue          : Decimal(15,2);
    OriginalContractValue           : Decimal(15,2);
    Userstatus                      : String;
    TotalContractValue              : Decimal(15,2);
    Workitem                        : String;
    Exempted                        : Boolean;
    VariationOrderValue             : Decimal(15,2);
    AddendumValue                   : Decimal(15,2);
    Overviewstatus                  : String;
    ReleaseStatus                   : String;
    RevisedContractValue            : Decimal(15,2);
    SerType                         : String;
    ContractTypeTxt                 : String;
    SerTypeDesc                     : String;
    VariationOrderPre               : String;
    CompDesc                        : String;
    PurchOrgTxt                     : String;
    ConsultantName                  : String;
    ProjetTemp                      : String;
    StatusOr                        : String;
    SuperiorWbs                     : String;
    TempStatus                      : String;
    VendorName                      : String;
    WbsDesc                         : String;
    CreatedOn                       : Date;
    CreationType                    : String;
    MarkUp                          : Decimal(5,2);
    LastChangedOn                   : DateTime;
    DocDate                         : Date;
    VperStart                       : Date;
    CreationDate                    : Date;
    VperEnd                         : Date;
    SigninDate                      : Date;
    ValidFrom                       : Date;
    ValidTo                         : Date;
    RevisedValidTo                  : Date;
    Project                         : String;
    CreatedBy                       : String;
    Message                         : String;
    DocParNo                        : String;
    LastChangedBy                   : String;
    Status                          : String;
    DocumentId                      : String;
    Flag                            : String;
    PoStatus                        : String;
    PurchDoc                        : String;
    DocType                         : String;
    key PoNumber                        : String;
    Vendor                          : String;
    PurchOrg                        : String;
    PurGroup                        : String;
    CompCode                        : String;
    MeasMethod                      : String;
    ConstructionType                : String;
    RefContract                     : String;
    DeleteInd                       : String;
    Currency                        : String;
    IndexMonth                      : String;
    Consultant                      : String;
    Ss                              : String;
    Ir                              : String;
    ContractDesc                    : String;
    LongDesc                        : String;

    // Navigations
    ContractPONoteNav               : Association to many ContractPONote;
    POHeaderToPCContratualNav       : Association to many PCContratual;
    POPurchaseRequisitionTreeNav    : Association to many BoqTree;
    WFContractInboxNAV              : Association to many WFContractInbox;
    PermissionNav                   : Association to many Permission;
    ReleaseerrorSet                 : Association to many ReleaseError;
    POHeaderToPOBuildingNav         : Association to many POBuilding;
    HeadToHeadVariationNav          : Association to many OrderHeader;
    AttachmentSet                   : Association to many Attachment;
    POHeaderToPOItem                : Association to many ContractPOItem;
    POHeaderToPOGetbuildingNav      : Association to many Building;
    ContractPOSrvItemSet            : Association to many ContractPOSrvItem;
    POHeaderToBoqItem               : Association to many BoqItem;
}


}
