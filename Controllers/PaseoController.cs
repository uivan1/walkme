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
    public class PaseoController : ControllerBase
    {
        private WalkmeContext _context;
        public PaseoController(WalkmeContext context)
        {
            _context=context;
        }
        [HttpPost("Crear")]
        public int CreatePaseo([FromBody]Paseo paseo){
            paseo.FechaCreación=DateTime.Now;
            Console.WriteLine("Se agrega paseo");
            _context.Paseos.Add(paseo);
            _context.SaveChanges();
            return 1;
        }
        [HttpPost("Info")]
        public IEnumerable<Paseo> InfoPaseosByUserType([FromBody]Usuario usuario){
            Console.WriteLine(usuario.TipoUsuario);
            var paseos=new List<Paseo>();
            switch (usuario.TipoUsuario)
            {
                case TiposUsuario.Dueño:
                    paseos=_context.Paseos.Include(paseo => paseo.Paseador).Include(paseo => paseo.InicioViaje).Include(paseo => paseo.DestinoViaje).Include(paseo => paseo.PaseoMascota).Where(paseo=>paseo.Estado==TipoEstadoPaseo.Creado).Take(10).ToList();
                break;
                case TiposUsuario.Paseador:
                    paseos=_context.Paseos.Include(paseo => paseo.Paseador).Include(paseo => paseo.InicioViaje).Include(paseo => paseo.DestinoViaje).Where(paseo=>paseo.PaseadorId==usuario.Id).ToList();
                break;
                default:
                    paseos=_context.Paseos.Include(paseo => paseo.Paseador).Include(paseo => paseo.InicioViaje).Include(paseo => paseo.DestinoViaje).Take(10).ToList();
                break;
            }
            return paseos;
        }
        [HttpGet("{idPaseo}")]
        public IEnumerable<Paseo> Get(string idPaseo)
        {
            return _context.Paseos.Where(paseo => paseo.PaseoId == idPaseo).Include(paseo=>paseo.Paseador).Include(paseo=>paseo.DestinoViaje).Include(paseo=>paseo.InicioViaje).ToList();
        }

        [HttpGet]
        public IEnumerable<Paseo> Get()
        {
            // _context.Paseos.GetType().GetField()
            var paseos=_context.Paseos.Include(paseo => paseo.Paseador).Include(paseo => paseo.InicioViaje).Include(paseo => paseo.DestinoViaje).Take(10).ToList();
            // var paseos=_context.Paseos.Select(p=>new{p.PaseoId,p.ini}).ToList();
            // var paseos=_context.Paseos.Include(paseo => paseo.InicioViaje).ToList();
            return paseos;
        }

        [HttpPut("Editar")]
        public int Edit(Paseo paseo)
        {
            _context.Entry(paseo).State=EntityState.Modified;
            var ubicaI=paseo.InicioViaje;
            _context.Entry(ubicaI).State=EntityState.Modified;
            var ubicaF=paseo.DestinoViaje;
            _context.Entry(ubicaF).State=EntityState.Modified;
            _context.SaveChanges();
            return 1;
        }
        [HttpDelete("{idPaseo}")]
        public int DeletePaseo(string idPaseo)
        {
                Paseo emp = _context.Paseos.Find(idPaseo);
                _context.Paseos.Remove(emp);
                _context.SaveChanges();
                return 1;
        }

    }
}
