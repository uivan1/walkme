using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace walkme.Models
{
    public class WalkmeContext: DbContext
    {       
        string[] nombre1 = { "Alba", "Felipa", "Eusebio", "Farid", "Donald", "Alvaro", "Nicolás" };
        string[] apellido1 = { "Ruiz", "Sarmiento", "Uribe", "Maduro", "Trump", "Toledo", "Herrera" };
        string[] nombre2 = { "Freddy", "Anabel", "Rick", "Murty", "Silvana", "Diomedes", "Nicomedes", "Teodoro" };
        string[] correos={"@hotmail.com","@gmail.com","@outlook.com","@algo.com"};
        Random generator = new Random();  
              public DbSet<Usuario> Usuarios { get; set; }
              public DbSet<Paseador> Paseadores { get; set; }
              public DbSet<Dueño> Dueños { get; set; }
              public DbSet<Mascota> Mascotas { get; set; }
              public DbSet<Paseo> Paseos { get; set; }
              public DbSet<PaseoMascota> PaseoMascotas { get; set; }
              public DbSet<Ubicación> Ubicaciones { get; set; }
              public WalkmeContext(DbContextOptions<WalkmeContext> options): base(options){

              }
              protected override void OnModelCreating(ModelBuilder modelBuilder){
                  base.OnModelCreating(modelBuilder);
                    var dueños=CrearDueños(50,TiposUsuario.Dueño);
                    var paseadores=CrearPaseadores(50,TiposUsuario.Paseador);
                    //Test
                    var prueba=new Dueño(){Correo="ulises@walkme.com",Contraseña="qwerty", Nombre="Ulises",Teléfono=427108119,TipoUsuario=TiposUsuario.Dueño};
                    dueños.Add(prueba);
                    var paseadorPrueba=new Paseador(){Correo="perla@walkme.com",Contraseña="qwerty", Nombre="Perla",Teléfono=442589587,TipoUsuario=TiposUsuario.Paseador};
                    paseadores.Add(paseadorPrueba);
                    //
                    var mascotas=AsignarMascotas(dueños);
                    
                    
                var ubicaciones = new List<Ubicación>(){
                new Ubicación("20.5814762", "-100.3925567"),
                new Ubicación("20.5818622", "-100.3922695"),
                new Ubicación("20.580275","-100.389394"),
                new Ubicación("20.592408","-100.387141"),
                new Ubicación("20.582043","-100.404371"),
                new Ubicación("20.588953","-100.407761"),
                new Ubicación("20.593834","-100.403899"),
                new Ubicación("20.586101","-100.393170"),
                new Ubicación("20.579311","-100.394930"),
                new Ubicación("20.590636","-100.381812")
            };

           var destinos1 = new List<Ubicación>(){
                new Ubicación("20.586417","-100.418676"),
                new Ubicación("20.581912","-100.416907"),
                new Ubicación("20.584728","-100.418640"),
                new Ubicación("20.575983","-100.410255"),
                new Ubicación("20.587377","-100.415102"),
                new Ubicación("20.579395","-100.406823"),
                new Ubicación("20.572472","-100.396350"),
                new Ubicación("20.574559","-100.406009"),
                new Ubicación("20.585655","-100.407495"),
                new Ubicación("20.574161","-100.392600")
           };
           ubicaciones.AddRange(destinos1);
           var paseos=CrearPaseos(paseadores,ubicaciones);

           var paseosMascota=CrearPaseosMascota(mascotas,paseos);

                    modelBuilder.Entity<Dueño>().HasData(dueños.ToArray());
                    modelBuilder.Entity<Paseador>().HasData(paseadores.ToArray());
                    modelBuilder.Entity<Mascota>().HasData(mascotas.ToArray());
                    modelBuilder.Entity<Paseo>().HasData(paseos.ToArray());
                    modelBuilder.Entity<Ubicación>().HasData(ubicaciones.ToArray());
                    //
                    modelBuilder.Entity<Dueño>().HasBaseType<Usuario>();
                    modelBuilder.Entity<Paseador>().HasBaseType<Usuario>();
                    //
                    modelBuilder.Entity<PaseoMascota>().HasData(paseosMascota.ToArray());

              }
      
        private List<Dueño> CrearDueños(int cantidad,TiposUsuario tipo)
        {
            var listaUsuarios = from n1 in nombre1
                               from n2 in nombre2
                               from a1 in apellido1
                               from c in correos
                               select new Dueño { Nombre = $"{n1} {n2} {a1}", Correo=$"{n1+c}",Teléfono=generator.Next(1000000000,2000000000),TipoUsuario=tipo};

            return listaUsuarios.OrderBy((al) => al.Id).Take(cantidad).ToList();
        }
        private List<Paseador> CrearPaseadores(int cantidad,TiposUsuario tipo)
        {
            var listaUsuarios = from n1 in nombre1
                               from n2 in nombre2
                               from a1 in apellido1
                               from c in correos
                               select new Paseador { Nombre = $"{n1} {n2} {a1}", Correo=$"{n1+c}",Teléfono=generator.Next(1000000000,2000000000),TipoUsuario=tipo};

            return listaUsuarios.OrderBy((al) => al.Id).Take(cantidad).ToList();
        }
        private List<Mascota> AsignarMascotas(List<Dueño> dueños){
            var listaCompleta=new List<Mascota>();
            foreach (var dueño in dueños)
            {
                int cantRandom = generator.Next(1, 5);
                var tempList=GenerarMascotasAlAzar(cantRandom,dueño);
                // dueño.Mascotas = tempList;
                listaCompleta.AddRange(tempList);
            }
            return listaCompleta;
        }
        private List<Mascota> GenerarMascotasAlAzar(int cantidad,Dueño dueño)
        {
             string[] nombre1 = { "Perro1", "Perro2", "Perro3" };
             string[] nombre2 = { "Negro", "Café", "Blanco", "Manchas", "Gris"};
             string[] raza={"Fina","Chafa","Media"};
             string[] foto={"https://res.cloudinary.com/dzcuuyc2e/image/upload/v1574661261/foto1_piyvlb","https://res.cloudinary.com/dzcuuyc2e/image/upload/v1574661261/foto2_q5xpuq","https://res.cloudinary.com/dzcuuyc2e/image/upload/v1574661261/foto3_k3b0q5"};
             string[] comentario={"Se espanta","Es rudo","Corre cerca de los carros"};

                var listaMascotas = from n1 in nombre1
                                from n2 in nombre2
                                from r in raza
                                from f in foto
                                from c in comentario
                                select new Mascota{Foto=f,Nombre=$"{n1} {n2}",Raza=r,Comentario=c,DueñoId=dueño.Id};

                return listaMascotas.OrderBy((m) => m.MascotaId).Take(cantidad).ToList();
        }
        private List<Paseo> CrearPaseos(List<Paseador> paseadores,List<Ubicación> ubicaciones){
            var listaCompleta=new List<Paseo>();
            foreach (var paseador in paseadores)
            {
                int cantRandom = generator.Next(1, 5);
                var paseotemp = GenerarPaseosAlAzar(cantRandom,paseador,ubicaciones);
                listaCompleta.AddRange(paseotemp);
            }
            return listaCompleta;
        }

        private List<Paseo> GenerarPaseosAlAzar(int cantidad, Paseador paseador,List<Ubicación> ubicaciones)
        {
            TipoEstadoPaseo[] tipox={TipoEstadoPaseo.Cancelado,TipoEstadoPaseo.Creado,TipoEstadoPaseo.Finalizado,TipoEstadoPaseo.Disponible,TipoEstadoPaseo.Proceso};
            var listaPaseo = from o in ubicaciones
                                from d in ubicaciones
                                from ti in tipox
                                select new Paseo{InicioViajeId=o.UbicaciónId,DestinoViajeId=d.UbicaciónId,Precio=generator.Next(0,500),Estado=ti,Cupo=generator.Next(1,5),PaseadorId=paseador.Id,FechaInicioPaseo=DateTime.Now.AddDays( 1 ),FechaFinPaseo=DateTime.Now.AddHours( 1 )};

            return listaPaseo.OrderBy((p) => p.PaseoId).Take(cantidad).ToList();
        }
        private List<PaseoMascota> CrearPaseosMascota(List<Mascota> mascotas,List<Paseo> paseos){
            var listaCompleta=new List<PaseoMascota>();
            foreach (var paseo in paseos)
            {
                int cantRandom = generator.Next(1, paseo.Cupo);
                var paseomastemp = GenerarPaseosMascotaAlAzar(cantRandom,paseo,mascotas);
                listaCompleta.AddRange(paseomastemp);
            }
            return listaCompleta;
        }

        private List<PaseoMascota> GenerarPaseosMascotaAlAzar(int cantidad, Paseo paseo,List<Mascota> mascotas)
        {
            bool[] pagado = new bool[2];
            pagado[0] = false; 
            pagado[1] = true;
            bool[] aprovado = new bool[2];
            aprovado[0] = false; 
            aprovado[1] = true;
            var listaPaseoMascota = from m in mascotas
                                from p in pagado
                                from a in aprovado
                                select new PaseoMascota{Aprobado=a,MascotaId=m.MascotaId,Pagado=p,PaseoId=paseo.PaseoId};

            return listaPaseoMascota.OrderBy((p) => p.PaseoMascotaId).Take(cantidad).ToList();
        }
    }
}