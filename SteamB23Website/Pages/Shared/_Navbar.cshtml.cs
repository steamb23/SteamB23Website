using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SteamB23Website.Pages.Shared
{
    public class NavbarModel : PageModel
    {
        public string PageLink { get; set; } = "";
        public NavbarInfo[] PageInfos { get; } = new NavbarInfo[]
        {
            new NavbarInfo("홈", "/"),
        };
        public NavbarInfo[]? SectionInfos { get; set; }
        public void OnGet()
        {
        }
    }
}
