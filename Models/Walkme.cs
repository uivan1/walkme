// using System;
// using System.Collections;
// using System.Collections.Generic;
// using System.Linq;


// namespace walkme.Models

// {
//     public class Walkme
//     {
//         string[] nombre1 = { "Alba", "Felipa", "Eusebio", "Farid", "Donald", "Alvaro", "Nicolás" };
//         string[] apellido1 = { "Ruiz", "Sarmiento", "Uribe", "Maduro", "Trump", "Toledo", "Herrera" };
//         string[] nombre2 = { "Freddy", "Anabel", "Rick", "Murty", "Silvana", "Diomedes", "Nicomedes", "Teodoro" };
//         string[] correos={"@hotmail.com","@gmail.com","@outlook.com","@algo.com"};
//         Random generator = new Random();  
//         public List<Dueño> Dueños { get; set; }
//         public List<Paseador> Paseadores { get; set; }
//         public void crearUsuarios(int cantidad,TiposUsuario tipo)
//         {
//             switch (tipo)
//             {
//                 case TiposUsuario.Dueño:
//                     Dueños=CrearDueños(cantidad,tipo);
//                     AsignarMascotas();
//                 break;
//                 case TiposUsuario.Paseador:
//                     Paseadores=CrearPaseadores(cantidad,tipo);
//                     CrearPaseos();
//                 break;
//             }
//         }
      
//         private List<Dueño> CrearDueños(int cantidad,TiposUsuario tipo)
//         {
//             var listaUsuarios = from n1 in nombre1
//                                from n2 in nombre2
//                                from a1 in apellido1
//                                from c in correos
//                                select new Dueño { Nombre = $"{n1} {n2} {a1}", Correo=$"{n1+c}",Teléfono=generator.Next(0,1000000),TipoUsuario=tipo};

//             return listaUsuarios.OrderBy((al) => al.UsuarioId).Take(cantidad).ToList();
//         }
//         private List<Paseador> CrearPaseadores(int cantidad,TiposUsuario tipo)
//         {
//             var listaUsuarios = from n1 in nombre1
//                                from n2 in nombre2
//                                from a1 in apellido1
//                                from c in correos
//                                select new Paseador { Nombre = $"{n1} {n2} {a1}", Correo=$"{n1+c}",Teléfono=generator.Next(0,1000000),TipoUsuario=tipo};

//             return listaUsuarios.OrderBy((al) => al.UsuarioId).Take(cantidad).ToList();
//         }
//         private Mascota obtenerMascotaAlAzar(){
//             var dueño = Dueños.ElementAt(generator.Next(0, Dueños.Count())); 
//             int intRandomMascota = generator.Next(0, dueño.Mascotas.Count-1);
//             return dueño.Mascotas[intRandomMascota];          
//         }
//         public void AsignarPaseosMascotas(){
//             foreach (var paseador in Paseadores)
//             {
//                 foreach (var paseo in paseador.Paseos)
//                 {
//                     int cantRandom = generator.Next(0, paseo.Cupo);
//                    for (int i = 0; i <= cantRandom; i++)
//                    {
//                        new PaseoMascota(paseo,obtenerMascotaAlAzar(),generator.NextDouble()>0.5,generator.NextDouble()>0.5);
                       
//                    }
//                 }
//             }
//         }



//         private void AsignarMascotas(){
//             foreach (var dueño in Dueños)
//             {
//                 int cantRandom = generator.Next(1, 5);
//                 dueño.Mascotas = GenerarMascotasAlAzar(cantRandom,dueño);
//             }
//         }
//          private void CrearPaseos(){
//             foreach (var paseador in Paseadores)
//             {
//                 int cantRandom = generator.Next(1, 5);
//                 paseador.Paseos = GenerarPaseosAlAzar(cantRandom,paseador);
//             }
//         }

//         private List<Paseo> GenerarPaseosAlAzar(int cantidad, Paseador paseador)
//         {
//             var origenes1 = new List<Ubicación>(){
//                 new Ubicación("20.5814762", "-100.3925567"),
//                 new Ubicación("20.5818622", "-100.3922695"),
//                 new Ubicación("20.580275","-100.389394"),
//                 new Ubicación("20.592408","-100.387141"),
//                 new Ubicación("20.582043","-100.404371"),
//                 new Ubicación("20.588953","-100.407761"),
//                 new Ubicación("20.593834","-100.403899"),
//                 new Ubicación("20.586101","-100.393170"),
//                 new Ubicación("20.579311","-100.394930"),
//                 new Ubicación("20.590636","-100.381812")
//             };

//            var destinos1 = new List<Ubicación>(){
//                 new Ubicación("20.586417","-100.418676"),
//                 new Ubicación("20.581912","-100.416907"),
//                 new Ubicación("20.584728","-100.418640"),
//                 new Ubicación("20.575983","-100.410255"),
//                 new Ubicación("20.587377","-100.415102"),
//                 new Ubicación("20.579395","-100.406823"),
//                 new Ubicación("20.572472","-100.396350"),
//                 new Ubicación("20.574559","-100.406009"),
//                 new Ubicación("20.585655","-100.407495"),
//                 new Ubicación("20.574161","-100.392600")
//            };
//             TipoEstadoPaseo[] tipox={TipoEstadoPaseo.Cancelado,TipoEstadoPaseo.Creado,TipoEstadoPaseo.Finalizado,TipoEstadoPaseo.Iniciado,TipoEstadoPaseo.Proceso};
//             var listaPaseo = from o in origenes1
//                                 from d in destinos1
//                                 from ti in tipox
//                                 select new Paseo(o,d,generator.Next(0,500),ti,generator.Next(1,5),paseador,DateTime.Now.AddDays( 1 ));
         
//             return listaPaseo.OrderBy((p) => p.PaseoId).Take(cantidad).ToList();
//         }

//         private List<Mascota> GenerarMascotasAlAzar(int cantidad,Dueño dueño)
//         {
//              string[] nombre1 = { "Perro1", "Perro2", "Perro3" };
//              string[] nombre2 = { "Negro", "Café", "Blanco", "Manchas", "Gris"};
//              string[] raza={"Fina","Chafa","Media"};
//              string[] foto={"foto1.jpg","foto2.jpg","foto3.jpg"};
//              string[] comentario={"Se espanta","Es rudo","Corre cerca de los carros"};

//                 var listaAlumnos = from n1 in nombre1
//                                 from n2 in nombre2
//                                 from r in raza
//                                 from f in foto
//                                 from c in comentario
//                                 select new Mascota(f,$"{n1} {n2}",r,c,dueño);

//                 return listaAlumnos.OrderBy((m) => m.MascotaId).Take(cantidad).ToList();
//         }

//         public List<Dueño> ObtenerDueños(){
//             return Dueños;
//         }
//         public List<Paseador> ObtenerPaseadores(){
//             return Paseadores;
//         }
//     }
// }