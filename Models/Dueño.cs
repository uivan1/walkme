using System.Collections.Generic;
namespace walkme.Models
{
    public class Dueño: Usuario
    {
        public List<Mascota> Mascotas { get; set; }=new List<Mascota>();

    }
}