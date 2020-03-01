using System;
using System.Collections.Generic;

namespace walkme.Models
{
    public class Mascota
    {
        public string MascotaId { get; set; }   
        public string Foto { get; set; }
        public string Nombre { get; set; }
        public string Raza { get; set; }
        public string Comentario { get; set; }
        public string DueñoId { get; set; }
        public Dueño Dueño { get; set; }
        public int PaseoMascotaId { get; set; }
        public List<PaseoMascota> PaseoMascota { get; set; } = new List<PaseoMascota>();
        public Mascota()
        {
            MascotaId = Guid.NewGuid().ToString();
        }
        public Mascota(string nombre, string raza,string comentario,string dueñoId)
        {
            MascotaId = Guid.NewGuid().ToString();
            Nombre = nombre;
            Raza = raza;
            Foto="foto1.jpg";
            Comentario = comentario;
            DueñoId=dueñoId;
        }
        // public Mascota(string foto, string nombre,
        //                  string raza, string comentario, Dueño dueño)
        // {
        //     MascotaId = Guid.NewGuid().ToString();
        //     Foto = foto;
        //     Nombre = nombre;
        //     Raza = raza;
        //     Comentario = comentario;
        //     Dueño = dueño;
        // }


        // this.idMascota = Guid.NewGuid().ToString();
    }
}