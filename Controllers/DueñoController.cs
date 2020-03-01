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
    public class DueñoController : ControllerBase
    {
        private WalkmeContext _context;
        public DueñoController(WalkmeContext context)
        {
            _context=context;
        }

        [HttpGet]
        public IEnumerable<Dueño> Get()
        {
            return _context.Dueños.Include(dueño=>dueño.Mascotas).ToList();
        }

        [HttpGet("{idDueño}")]
        public IEnumerable<Dueño> Get(string idDueño)
        {
            return _context.Dueños.Where(dueño => dueño.Id == idDueño).Include(dueño=>dueño.Mascotas).ToList();
        }

        // [HttpPost("/Mascotas")]

        // public IEnumerable<Mascota> Post()
        // {
        //     return _context.Mascotas.Where(mascota => mascota.MascotaId == idMascota).Include(mascota=>mascota.Dueño).ToList();
        // }
    }
}
