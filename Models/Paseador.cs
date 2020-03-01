using System.Collections.Generic;

namespace walkme.Models
{
    public class Paseador: Usuario
    {
        public List<Paseo> Paseos { get; set; }=new List<Paseo>();
    }
}