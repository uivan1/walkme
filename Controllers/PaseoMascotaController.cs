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
    public class PaseoMascotaController : ControllerBase
    {
        private WalkmeContext _context;
        public PaseoMascotaController(WalkmeContext context)
        {
            _context=context;
        }
        [HttpPost("Crear")]
        public int AgregarMascota([FromBody]PaseoMascota pm){
            Console.WriteLine("Se agrega mascota");
            var res = (from p in _context.Paseos
                       where p.PaseoId==pm.PaseoId
                       select p.Cupo).Take(1);
            var limit=_context.PaseoMascotas.Where(x => x.PaseoId == pm.PaseoId).Count();
            var count =Convert.ToInt32(res.FirstOrDefault());

            if(limit<count){
                _context.PaseoMascotas.Add(pm);
                _context.SaveChanges();
                return 1;
            }else{
                var p=_context.Paseos.Where(x=>x.PaseoId==pm.PaseoId).First();
                if(p.Estado==TipoEstadoPaseo.Creado){
                    p.Estado=TipoEstadoPaseo.Lleno;
                    _context.Entry(p).State=EntityState.Modified;
                    _context.SaveChanges();
                }
                return 0;
            }   
        }
        [HttpPut("Aprobar")]
        public int Edit(PaseoMascota pm)
        {
            _context.Entry(pm).State=EntityState.Modified;
            _context.SaveChanges();
            return 1;
        }
        [HttpGet("{idPaseo}")]
        public IEnumerable<PaseoMascota> Get(string idPaseo)
        {
            return _context.PaseoMascotas.Where(pm => pm.PaseoId == idPaseo).Include(pm=>pm.Mascota).Include(pm=>pm.Paseo).ToList();
        }
        
        [HttpDelete("{idPaseoMascota}")]
        public int DeletePaseoMascota(string idPaseoMascota)
        {
                PaseoMascota p = _context.PaseoMascotas.Find(idPaseoMascota);
                _context.PaseoMascotas.Remove(p);
                _context.SaveChanges();
                return 1;
        }

    }
}
