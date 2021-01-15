using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HTML5CSS3Essential.lessons_advanced.lesson01 {
  public partial class Task2 : System.Web.UI.Page {
    private const string nmFileMaxxRoyalKemerResort = @"Hotels\Maxx-Royal-Kemer-Resort\maxx-royal-kemer-resort.txt";
    private const string nmFileMaxxRoyalBelekGolfResort = @"Hotels\Maxx-Royal-Belek-Golf-Resort\maxx-royal-belek-golf-resort.txt";
    private const string nmFileGloriaSerenityResort = @"Hotels\Gloria-Serenity-Resort\gloria-serenity-resort.txt";
    private const string nmFileHiltonDalamanSarigermeResortSpa = @"Hotels\Hilton-Dalaman-Sarigerme-Resort-Spa\hilton-dalaman-sarigerme-resort-spa.txt";
    protected void Page_Load(object sender, EventArgs e) {
      if (File.Exists(Server.MapPath(nmFileMaxxRoyalKemerResort))) {
        try {
          maxxRoyalKemerResort.Text = File.ReadAllText(Server.MapPath(nmFileMaxxRoyalKemerResort));
        } catch (Exception exp) {
          errorLoadDescription01.Text = exp.Message;
        }
      }
      if (File.Exists(Server.MapPath(nmFileMaxxRoyalBelekGolfResort))) {
        try {
          maxxRoyalBelekGolfResort.Text = File.ReadAllText(Server.MapPath(nmFileMaxxRoyalBelekGolfResort));
        } catch (Exception exp) {
          errorLoadDescription02.Text = exp.Message;
        }
      }
      if (File.Exists(Server.MapPath(nmFileGloriaSerenityResort))) {
        try {
          gloriaSerenityResort.Text = File.ReadAllText(Server.MapPath(nmFileGloriaSerenityResort));
        } catch (Exception exp) {
          errorLoadDescription03.Text = exp.Message;
        }
      }
      if (File.Exists(Server.MapPath(nmFileHiltonDalamanSarigermeResortSpa))) {
        try {
          hiltonDalamanSarigermeResortSpa.Text = File.ReadAllText(Server.MapPath(nmFileHiltonDalamanSarigermeResortSpa));
        } catch (Exception exp) {
          errorLoadDescription04.Text = exp.Message;
        }
      }
    }
  }
}