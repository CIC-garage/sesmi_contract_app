

service CatalogService {

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
}
}
