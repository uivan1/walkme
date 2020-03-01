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
    public class Example : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        // private readonly ILogger<Example> _logger;

        // public Example(ILogger<Example> logger)
        // {
        //     _logger = logger;
        // }
        private WalkmeContext _context;
         public Example(WalkmeContext context)
        {
            _context=context;
        }

        [HttpGet]
        public IEnumerable<Paseador> Get()
        {
            return _context.Paseadores.Include(paseador => paseador.Paseos).ToList();
        }
    }
}
