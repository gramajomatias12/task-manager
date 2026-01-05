using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.DTOs
{
    public class TareaCreateDto
    {
        [Required]
        public string Titulo { get; set; } = string.Empty;

        public string? Descripcion { get; set; }

        [Required]
        public string Estado { get; set; } = "Pendiente";
    }
}
