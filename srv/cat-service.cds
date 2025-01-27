

service CatalogService {
    entity CompanyCode @readonly {
    PERSONID   :  UUID ;
    LASTNAME : String;
    FIRSTNAME : String;
    ADDRESS : String;
    CITY : String;
    ID : String;
  };

  entity HeaderSet @readonly{
    Project    : String;
    Contract   : String; 
    PO         : String;
    Vendor     : String;
    CreatedBy : String;
    LastChangedBy : String;
    Status : String;
  }
}
