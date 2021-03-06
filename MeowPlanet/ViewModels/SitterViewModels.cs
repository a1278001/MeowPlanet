using MeowPlanet.Models;
namespace MeowPlanet.ViewModels
{
    public class SitterViewModels
    {
        public Sitter? sitter { get; set; }
        public SitterFeature? sitterfeature { get; set; }
        public Orderlist? orderlist{ get; set; }

        public List<SitterFeature> sitterfeatureList { get; set; }

        public List<Orderlist> OrderCommentList { get; set; }
    }
}
