
using System;
using System.Collections.Generic;
using FMS.Common.Contracts;

namespace FMS.Common.Entities
{
    public class ViewVehicleListing : IEntity
    {
       public int Id { get; set; }
        public string STATENAME { get; set; }
        public string MAKE_ID { get; set; }
        public string MAKENAME { get; set; }
        public string MODEL_ID { get; set; }
        public string MODEL { get; set; }
        public string MAK_MOD { get; set; }
        public string MAK_MODNAME { get; set; }
        public string MOD_YEAR { get; set; }
        public string M_HARNAME { get; set; }
        public string DR_PRES { get; set; }
        public string L_TYPENAME { get; set; }
        public string L_STATUSNAME { get; set; }
        public string DEATHS { get; set; }
        public string DATA_YEAR { get; set; }

    }

    public class ViewModelVehicleListing
    {
        public List<ViewVehicleListing> Vehicle = new List<ViewVehicleListing>();
        public int Count { get; set; }
    }
    
}
