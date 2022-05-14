using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;

namespace FMS.Common
{
    public static class AppSettings
    {
        public static IConfigurationRoot Configuration { get; set; }
        public static IHostingEnvironment Environment { get; set; }

        public static string CacheConnection => Configuration["AppSettings:CacheConnectionString"];

        public static BuildMode BuildMode
        {
            get
            {
                return (BuildMode)Convert.ToInt32(Configuration["AppSettings:build-mode"]);
            }
        }

        public static bool UseMinify => Configuration["AppSettings:use-minify"].Equals("1");

        public static string EnvironmentName
        {
            get
            {
                return Configuration["AppSettings:environment-name"];
            }
        }

        public static string FromEmail
        {
            get
            {
                return Configuration["AppSettings:from-email"];
            }
        }

        public static string GoogleReCaptchaKey
        {
            get
            {
                return Configuration["AppSettings:GoogleReCaptchaKey"];
            }
        }

        public static string ToEmail
        {
            get
            {
                return Configuration["AppSettings:to-email"];
            }
        }

        public static string ToEmailCC
        {
            get
            {
                return Configuration["AppSettings:to-email-cc"];
            }
        }

        public static string ApiUrl
        {
            get
            {
                return Configuration["AppSettings:ApiUrl"];
            }
        }

        public static string AppVersion
        {
            get
            {
                return Configuration["AppSettings:app-version"];
            }
        }

        public static string SmtpUser
        {
            get
            {
                return Configuration["AppSettings:smtp-user"];
            }
        }

        public static string SmtpPwd
        {
            get
            {
                return Configuration["AppSettings:smtp-pwd"];
            }
        }

        public static string ExceptionEmail
        {
            get
            {
                return Configuration["AppSettings:exception-email"];
            }
        }

        public static string JwtSigningKey
        {
            get
            {
                return Configuration["AppSettings:JwtSigningKey"];
            }
        }

        public static int JwtLifeMins
        {
            get
            {
                return Convert.ToInt32(Configuration["AppSettings:JwtLifeMins"]);
            }
        }

        public static string InstanceName
        {
            get
            {
                return Configuration["AppSettings:instance-name"];
            }
        }

        public static string PathAssetDir => Configuration["AppSettings:pathAssetDir"];
        public static string PathAppData => Configuration["AppSettings:path-app-data"];
        public static string PathSeo => Path.Combine(Configuration["AppSettings:path-app-data"], "seo");
        public static string PathTemplatesDir => Path.Combine(AppSettings.PathAssetDir, $"templates");
        public static string WebPathData => Configuration["AppSettings:web-path-data"];
        public static string SiteUrl => Configuration["AppSettings:siteUrl"];
        public static string ConnectionStringDefault => Configuration["ConnectionStrings:default"];
        // public static string ConnectionStringHangfire => Configuration["ConnectionStrings:hangfire"];

    }
}
