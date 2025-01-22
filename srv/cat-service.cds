using my.bookshop as my from '../db/schema';

service CatalogService {
    @readonly entity Books as projection on my.Books;
    entity CompanyCode @readonly {
    PERSONID   :  UUID ;
    LASTNAME : String;
    FIRSTNAME : String;
    ADDRESS : String;
    CITY : String;
    ID : String;
  };
}
