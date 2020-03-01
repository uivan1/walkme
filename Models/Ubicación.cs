namespace walkme.Models
{
    public class Ubicación
    {
        public string Latitud { get; set; }
        public string Longitud { get; set; }
        public string UbicaciónId { get; set; }
        public Ubicación(string latitud, string longitud)
        {
            this.Latitud = latitud;
            this.Longitud = longitud;
            UbicaciónId = System.Guid.NewGuid().ToString();
        }
    }
}