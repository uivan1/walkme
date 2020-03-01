using System.Collections.Generic;
using System;

namespace walkme.Models
{
    public class Paseo
    {
    
        public string PaseoId { get; set; }
        public string InicioViajeId { get; set; }
        public string DestinoViajeId { get; set; }
        public Ubicación InicioViaje { get; set; }
        public Ubicación DestinoViaje { get; set; }
        public float Precio { get; set; }
        public TipoEstadoPaseo Estado { get; set; }
        public string estadoPaseo {
            get { return Enum.GetName(typeof(TipoEstadoPaseo),Estado); }
        }
        public DateTime FechaCreación { get; set; }
        public int Cupo { get; set; }
        public Paseador Paseador { get; set; }
        public string PaseadorId { get; set; }
        public DateTime FechaInicioPaseo { get; set; }
        public DateTime FechaFinPaseo { get; set; }
        public List<PaseoMascota> PaseoMascota { get; set; }= new List<PaseoMascota>();
        public Paseo()
        {
            PaseoId = Guid.NewGuid().ToString();
        }
        // public Paseo(Ubicación inicioViaje, Ubicación destinoViaje, float precio,
        //             TipoEstadoPaseo estado, int cupo,
        //              Paseador paseador,DateTime fechaInicioPaseo)
        // {
        //     PaseoId = Guid.NewGuid().ToString();
        //     InicioViaje = inicioViaje;
        //     DestinoViaje = destinoViaje;
        //     Precio = precio;
        //     Estado = estado;
        //     FechaCreación = DateTime.Now;
        //     Cupo = cupo;
        //     Paseador = paseador;
        //     FechaInicioPaseo = fechaInicioPaseo;
        // }
        // DateTime.Now

    }
}