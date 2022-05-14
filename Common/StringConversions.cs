using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FMS.Common
{
    public static class StringConversions
    {
        public static string CustomPascalCase(this string s)
        {
            var words = s.Split(new[] { '-', '_' }, StringSplitOptions.RemoveEmptyEntries)
                         .Select(word => word.Substring(0, 1).ToUpper() +
                                         word.Substring(1));
            var result = String.Concat(words);
            return result;
        }
    }
}
