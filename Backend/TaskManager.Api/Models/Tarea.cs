using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Models
{
    public class Tarea
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Titulo { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? Descripcion { get; set; }

        [Required]
        public string Estado { get; set; } = "Pendiente";

        public DateTime FechaCreacion { get; set; } = DateTime.Now;
    }
}
