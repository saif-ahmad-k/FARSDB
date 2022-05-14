using System;
using Newtonsoft.Json;

namespace FMS.Common
{
    public class Constants
    {
        public static string AppDirectory = AppDomain.CurrentDomain.BaseDirectory;
        public static string StorageConnectionString = "StorageConnectionString";
        public const string AppName = "FMS";
        public const string AppCulture = "en-US";
        public const string DateFormat = "MM/dd/yyyy";
        public const string DateTimeFormat = "yyyy/MM/dd";
    }

    public class Pages
    {
        public static string ContactUs = "ContactUs";
        public static string Global = "global";
    }
}
