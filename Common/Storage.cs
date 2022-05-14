
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FMS.Common.Contracts;

namespace FMS.Common
{
    public static class Storage
    {
        public static IHostingEnvironment Environment { get; set; }

        public static IStorage Provider
        {
            get
            {
                return new FileStorage(Environment);
            }
        }
    }
}
