using System.ComponentModel.DataAnnotations;

namespace Zadanko3.Models
{
    public class AuthModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
