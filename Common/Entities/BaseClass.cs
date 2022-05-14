using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace FMS.Common.Entities
{
    public class BaseClass
    {
        public bool IsDeleted { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public int? DeletedBy { get; set; }
        public DateTime? CreateStamp { get; set; }
        public DateTime? UpdateStamp { get; set; }
        public DateTime? DeleteStamp { get; set; }
    }


}
