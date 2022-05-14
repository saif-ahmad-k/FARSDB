
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using FMS.Common.Contracts;

namespace FMS.Common
{
    /// <summary>
    /// file disk saving .Net Core
    /// </summary>
    /// <returns></returns>
    public class FileStorage : IStorage
    {
        private static IHostingEnvironment _env;

        public FileStorage(IHostingEnvironment env)
        {
            _env = env;
        }

        /// <summary>
        /// save image on disk
        /// </summary>
        /// <returns></returns>
        public bool Save(string path, byte[] bytes)
        {
            path = MapPath(path);

            // If directory does not exists, then create directory and sub-directories
            if (Directory.Exists(Path.GetDirectoryName(path)) == false)
            {
                Directory.CreateDirectory(Path.GetDirectoryName(path));
            }

            // Create new file and write fileContent in fileStream
            using (FileStream fileStream = new FileStream(path, FileMode.Create))
            {
                fileStream.Write(bytes, 0, bytes.Length);
                fileStream.Flush(true);
            }

            return true;
        }

        /// <summary>
        /// Read file text
        /// </summary>
        /// <returns></returns>
        public string Read(string path)
        {
            path = MapPath(path);

            return File.Exists(path) ? File.ReadAllText(path) : null;
        }

        /// <summary>
        /// Delete image
        /// </summary>
        /// <returns></returns>
        public bool Delete(string path)
        {
            path = MapPath(path);

            if (File.Exists(path))
            {
                File.Delete(path);

                return true;
            }

            return false;
        }

        /// <summary>
        /// Map relative path to physical disk path
        /// </summary>
        private static String MapPath(String relativePath)
        {
            String physicalPath = _env.WebRootPath;

            if (relativePath.StartsWith("/") || relativePath.StartsWith("~"))
            {
                relativePath = relativePath.Remove(0, 1);
            }

            // return physical path back to caller
            return Path.Combine(physicalPath, relativePath);
        }
    }
}
