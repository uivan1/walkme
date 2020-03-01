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
    public class UsuarioController : ControllerBase
    {
        private WalkmeContext _context;
        public UsuarioController(WalkmeContext context)
        {
            _context=context;
        }

        [HttpGet]
        public IEnumerable<Usuario> Get()
        {
            Console.WriteLine("GET");
            return _context.Usuarios.ToList();
        }

        [HttpPost]
        public IEnumerable<Usuario> Post([FromBody] dynamic data)
        {
            string correo = data.correo;
            string contraseña = data.contraseña;
            Console.WriteLine(data);
            var res=from user in _context.Usuarios
                    where user.Correo == correo
                    && user.Contraseña == contraseña
                    select user;
            return res.ToList();
        }
    }
}
