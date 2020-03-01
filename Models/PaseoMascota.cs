using System;
using System.Collections.Generic;

namespace walkme.Models
{
    public class PaseoMascota
    {
        public string PaseoMascotaId { get; set; }
        public string MascotaId { get; set; }
        public Mascota Mascota { get; set; }
        public string PaseoId { get; set; }
        public Paseo Paseo { get; set; }
        public bool Pagado { get; set; } 
        public bool Aprobado { get; set; }
        public PaseoMascota()
        {
            PaseoMascotaId = Guid.NewGuid().ToString();
        }
        // public PaseoMascota(Paseo paseo,Mascota mascota,bool pagado,bool aprobado)
        // {
        //     Paseo=paseo;
        //     Mascota=mascota;
        //     Pagado=pagado;
        //     Aprobado=aprobado;
        //     IdPaseoVisaje = Guid.NewGuid().ToString();
        //     Mascota.PaseoMascota.Add(this);
        //     Paseo.PaseoMascota.Add(this);
        // }


    }
}