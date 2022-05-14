using System;
using System.Linq;
using System.Text;
using System.Net;
using System.Net.Mail;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Net.Http;

namespace FMS.Common
{
    public static class Helper
    {


        #region EMAIL
        /// <summary>
        /// Send Email
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="subject"></param>
        /// <param name="body"></param>
        public static void SendEmail(string to, string subject, string body, string[] cc = null)
        {
            SendEmail(AppSettings.FromEmail, to, subject, body, AppSettings.SmtpUser, Encryption.Decrypt(AppSettings.SmtpPwd), cc);
        }

        public static void SendEmail(string to, string subject, string body, string cc)
        {
            SendEmail(AppSettings.FromEmail, to, subject, body, AppSettings.SmtpUser, Encryption.Decrypt(AppSettings.SmtpPwd), new[] { cc });
        }

        /// <summary>
        /// Send Email
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="subject"></param>
        /// <param name="body"></param>
        public static void SendEmail(string from, string to, string subject, string body, string smtpUser, string smtpPwd, string[] cc = null)
        {
            MailMessage mailMessage = new MailMessage(from, to, subject, body);
            mailMessage.IsBodyHtml = true;

            if (cc != null)
            {
                cc.ToList().ForEach(ccmail =>
                {
                    if (!string.IsNullOrWhiteSpace(ccmail))
                    {
                        mailMessage.CC.Add(new MailAddress(ccmail));
                    }
                });
            }

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(smtpUser, smtpPwd);

            smtpClient.Send(mailMessage);
        }
        #endregion

        ////#region IMAGE
        ///// <summary>
        ///// Resize the image to the specified width and height.
        ///// </summary>
        ///// <param name="image">The image to resize.</param>
        ///// <param name="width">The width to resize to.</param>
        ///// <param name="height">The height to resize to.</param>
        ///// <returns>The resized image.</returns>
        public static Bitmap ResizeImage(Image image, int width, int height)
        {
            Bitmap newImage = new Bitmap(width, height);
            using (Graphics gr = Graphics.FromImage(newImage))
            {
                gr.SmoothingMode = SmoothingMode.HighQuality;
                gr.InterpolationMode = InterpolationMode.HighQualityBicubic;
                gr.PixelOffsetMode = PixelOffsetMode.HighQuality;
                gr.Clear(Color.White);
                gr.DrawImage(image, new Rectangle(0, 0, width, height));
            }

            return newImage;

        }

        /// <summary>
        /// Search string with full text and ignore case
        /// </summary>
        /// <returns></returns>
        public static bool ContainsFullText(this string source, string toCheck)
        {
            if (string.IsNullOrWhiteSpace(toCheck))
                return false;

            var listWords = toCheck.Trim().Split(' ');

            foreach (var word in listWords)
            {
                if (source?.IndexOf(word, StringComparison.OrdinalIgnoreCase) >= 0)
                    return true;
            }

            return false;
        }
        public static byte[] ResizeImage(byte[] bytes, int width, int height)
        {
            Image img = BytesToImage(bytes);

            Bitmap bitmap = ResizeImage(img, width, height);

            byte[] destBytes = ImageToBytes(bitmap);

            return destBytes;
        }

        public static byte[] ImageToBytes(System.Drawing.Image imageIn)
        {
            MemoryStream ms = new MemoryStream();
            imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
            return ms.ToArray();
        }

        public static Image BytesToImage(byte[] byteArrayIn)
        {
            MemoryStream ms = new MemoryStream(byteArrayIn);
            Image returnImage = Image.FromStream(ms);
            return returnImage;
        }

        public static DateTime FromUnixTimestamp(this double timestamp)
        {
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            return origin.AddSeconds(timestamp);
        }

        public static double ToUnixTimestamp(this DateTime date)
        {
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            TimeSpan diff = date.ToUniversalTime() - origin;
            return Math.Floor(diff.TotalSeconds);
        }

        public static string ApiPost(string url, string payload)
        {
            var client = new HttpClient();

            string result = "";

            StringContent stringContent = new StringContent(payload, Encoding.UTF8, "application/json");

            var task = client.PostAsync(url, stringContent)

                  .ContinueWith((taskwithresponse) =>
                  {
                      var response = taskwithresponse.Result;
                      result = response.Content.ReadAsAsync<string>().Result;
                  });

            task.Wait();

            return result;

        }
    }
}
