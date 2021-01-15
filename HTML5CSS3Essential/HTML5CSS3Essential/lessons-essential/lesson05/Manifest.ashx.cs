using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HTML5CSS3Essential.lessons.lesson05 {
  /// <summary>
  /// Summary description for Manifest
  /// </summary>
  public class Manifest : IHttpHandler {

    public void ProcessRequest(HttpContext context) {
      //context.Response.ContentType = "text/plain";
      context.Response.ContentType = "text/cache-manifest";
      context.Response.WriteFile(context.Server.MapPath("Manifest.appcache"));
    }

    public bool IsReusable {
      get {
        return false;
      }
    }
  }
}