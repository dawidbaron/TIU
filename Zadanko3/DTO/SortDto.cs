using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Zadanko3.DTO
{
    public class SortDto
    {
        public Guid UserId { get; set; }
        public int SortAsc { get; set; }
        public string SortField { get; set; }
    }
}
