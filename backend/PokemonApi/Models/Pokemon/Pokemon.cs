using System.Text.Json.Serialization;

namespace PokemonApi;

public class Pokemon
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    [JsonPropertyName("name")]
    public string Name { get; set; } = "";
    [JsonPropertyName("types")]
    public List<PokemonTypeSlot> Types { get; set; } = [];
    public int Wins { get; set; } = 0;
    public int Losses { get; set; } = 0;
    public int Ties { get; set; } = 0;
    [JsonPropertyName("base_experience")]
    public int BaseExperience { get; set; } = 0;
}


public class PokemonTypeSlot
{
    [JsonPropertyName("type")]
    public PokemonType Type { get; set; } = default!;
    [JsonPropertyName("slot")]
    public int Slot {get; set;}
}

public class PokemonType
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
}