using System;

namespace walkme.Models
{
    public class Usuario
    {
        public string Id { get; set; }
        public string Foto { get; set; }
        public string Nombre { get; set; }
        public int Teléfono { get; set; }
        public string Correo { get; set; }
        public string Contraseña { get; set; }
        public Ubicación Ubicación { get; set; }
        public TiposUsuario TipoUsuario { get; set; }
        public Usuario()
        {
            Id = Guid.NewGuid().ToString();
        }
        public Usuario(string correo,string contraseña)
        {
            Correo = correo;
            Contraseña = contraseña;
        }
        public Usuario(string nombre, int teléfono,
                        string correo, string contraseña, Ubicación ubicación,
                        TiposUsuario tipoUsuario)
        {
            Id = Guid.NewGuid().ToString();
            Nombre = nombre;
            Teléfono = teléfono;
            Correo = correo;
            Contraseña = contraseña;
            Ubicación = ubicación;
            TipoUsuario = tipoUsuario;
        }
    }
}