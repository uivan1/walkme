using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using walkme.Models;

namespace walkme.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MascotaController : ControllerBase
    {
        private WalkmeContext _context;
        public MascotaController(WalkmeContext context)
        {
            _context=context;
        }

        [HttpGet]
        public IEnumerable<Mascota> Get()
        {
            var mascotas=_context.Mascotas.Include(mascota => mascota.Dueño).ToList();
            return mascotas;
        }
        [HttpGet("{idMascota}")]
        public IEnumerable<Mascota> Get(string idMascota)
        {
            return _context.Mascotas.Where(mascota => mascota.MascotaId == idMascota).Include(mascota=>mascota.Dueño).ToList();
        }
        [HttpPost]
        public IEnumerable<Dueño> Post([FromBody] Usuario u)
        {
            return _context.Dueños.Where(usuario => usuario.Id == u.Id).Include(usuario=>usuario.Mascotas).ToList();
        }
        [HttpPost("infoCard")]
        public IEnumerable<Mascota> Postnot([FromBody] dynamic data)
        {
            Console.WriteLine("data");
            Console.WriteLine(data);
            string _id = data.Id;
            string  _paseoId= data.PaseoId;
            var mascotas=_context.Mascotas.Include(m => m.PaseoMascota).Where(m=>m.PaseoMascota.Any(i=>i.PaseoId==_paseoId));
            var misMascotas=_context.Mascotas.Where(mascota=>mascota.DueñoId==_id).ToList();
            var mascotasIds = mascotas.Select(x => x.MascotaId).ToArray();

            var x=misMascotas.Where(miMascota => !mascotasIds.Contains(miMascota.MascotaId)).ToList();
       
            return x;
        }
        [HttpPost("Crear")]
        public int CreateMascota([FromBody]Mascota mascota){
            Console.WriteLine("Se agrega mascota");
            _context.Mascotas.Add(mascota);
            _context.SaveChanges();
            return 1;
        }
        [HttpPut("Editar")]
        public int Edit(Mascota mascota)
        {
            _context.Entry(mascota).State=EntityState.Modified;
            _context.SaveChanges();
            return 1;
        }
        [HttpDelete("{idMascota}")]
        public int DeleteMascota(string idMascota)
        {
                Mascota emp = _context.Mascotas.Find(idMascota);
                _context.Mascotas.Remove(emp);
                _context.SaveChanges();
                return 1;
        }
    }
}
