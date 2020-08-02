using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.DirectoryServices;
using System.Drawing;
using System.IO;

namespace WebAsesores.Utils
{
    public class Ldap
    {
        private bool _success;

        public bool success
        {
            get { return _success; }
        }

        private DirectoryEntry root { get; set; }
        private DirectorySearcher search { get; set; }
        private string dc { get; set; }

        public Ldap()
        {
            dc = ConfigurationManager.AppSettings["domain"].ToString();
        }

        public bool FindMemberOfGroup(string user, string pass, string groupName)
        {
            DirectoryEntry rootEntry = this.ConnectLdap(user, pass);
            string filter = "(&(objectClass=user)(|(cn=" + user + ")(sAMAccountName=" + user + ")))";
            using (rootEntry)
            {
                DirectorySearcher searcher = new DirectorySearcher();
                searcher.SearchRoot = rootEntry;
                searcher.Filter = filter;
                searcher.PropertiesToLoad.Add("memberOf");
                SearchResult res = searcher.FindOne();
                foreach (string group in res.Properties["memberOf"])
                {
                    if (group.ToLower().Contains(groupName.ToLower()))
                    {
                        return true;
                    }
                }
                    return false;
            }
        }

        public bool FindUser(string User, string Password)
        {
            using (DirectoryEntry root = ConnectLdap(User, Password))
            {
                _success = false;
                //BUSQUEDA EN ACTIVE DIRECTORY
                string query = $"(sAMAccountName={User})";
                DirectorySearcher search = new DirectorySearcher(root, query);
                try
                {
                    search.FindOne();
                   _success = true;
                    return _success;
                }
                catch
                {
                   _success = false;
                    return _success;
                }

            }

        }

        private DirectoryEntry ConnectLdap(string user, string pass)
        {
            using (DirectoryEntry root = new DirectoryEntry($"LDAP://{dc}", user, pass))
            {
                this.root = root;
                return root;
            }
        }

        public Image GetUserPicture(string userName, string Pass)
        {

            using (DirectoryEntry root = ConnectLdap(userName, Pass))
            {
                using (var dsSearcher = new DirectorySearcher(root))
                {

                    dsSearcher.Filter = $"(&(objectClass=user)(objectCategory=Person)(samaccountname={userName}))";
                    dsSearcher.PropertiesToLoad.Add("thumbnailPhoto");
                    SearchResult result = dsSearcher.FindOne();

                    if (result != null)
                    {
                        byte[] data = result.Properties["thumbnailPhoto"][0] as byte[];

                        if (data != null)
                            using (var s = new MemoryStream(data))
                                return Bitmap.FromStream(s);

                    }

                    return null;
                }
            }

        }
    }
}