using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace PokemonApi.Controllers;

[ApiController]
[Route("pokemon")]
public class PokemonController(ILogger<PokemonController> logger, HttpClient pokeApiClient) : ControllerBase
{
    readonly string PokeApiBaseUrl = "https://pokeapi.co/api/v2/pokemon/";

    /*
        Some types were missing from the assessment doc but could still be pulled from the pokeapi.
        I've added them here for completenes. Most types have multiple other types they're strong against!
        But just going with one type each here to follow the guideline set by the spec.
    */
    readonly Dictionary<string, string> StrongAgainst = new() { 
        { "grass", "electric"},
        { "water", "fire" }, 
        { "electric", "water" }, 
        { "fire", "grass" }, 
        { "ghost", "psychic" },
        { "psychic", "fighting" },
        { "fighting", "dark"},
        { "dark", "ghost"},
        { "ground", "electric"},
        { "normal", ""}, //Poor normal types!
        { "rock", "normal"},
        { "bug", "grass"},
        { "flying", "bug"},
        { "ice", "grass"},
        { "poison", "fairy"},
        { "fairy", "dark"},
        { "dragon", "dragon"}
        
    };
    private readonly HttpClient _pokeApiClient = pokeApiClient;

    [HttpGet("tournament/statistics")]
    public async Task<IActionResult> GetPokemon([FromQuery] string sortBy, [FromQuery] string? sortDirection = "asc")
    {
        //Verify the query params
        if (string.IsNullOrEmpty(sortBy))
        {
            return BadRequest("sortBy parameter is required");
        }

        if (sortBy != "wins" && sortBy != "losses" && sortBy != "ties" && sortBy != "name" && sortBy != "id")
        {
            return BadRequest("sortBy parameter is invalid");
        }

        if (sortDirection != "asc" && sortDirection != "desc")
        {
            return BadRequest("sortDirection parameter is invalid");
        }


        //Pokemon IDs range from 1 to 151, must fetch 16 random IDs
        //Ensure that the random IDs are unique
        HashSet<int> randomIds = [];
        Random random = new();

        for (int r=0; r<16; r++)
        {    
            int randomId = random.Next(1, 152);
            while (randomIds.Contains(randomId)) randomId++;
            randomIds.Add(randomId);
        }

        //Fetch 16 random Pokemon using those IDs from the pokeapi
        List<Pokemon> pokemonList = [];
        foreach (int id in randomIds)
        {
            try
            {
                var response = await _pokeApiClient.GetAsync($"{PokeApiBaseUrl}/{id}");
                var json = await response.Content.ReadAsStringAsync();
                Pokemon? pokemon = JsonSerializer.Deserialize<Pokemon>(json) ?? throw new Exception("Failed to deserialize a pokemon");
                pokemonList.Add(pokemon);
            } catch (Exception e)
            {
                logger.LogError("Exception caught: {}", e.Message);
            }
            
        }

        //Round-Robin style, all 16 pokemon will fight each other
        for (int p=0; p<pokemonList.Count; p++)
        {
            for (int q=p+1; q<pokemonList.Count; q++)
            {
                Battle(pokemonList[p], pokemonList[q]);
            }
        }

        //Return the results of the tournament, including wins, losses, and draws for each Pokemon
        IEnumerable<PokemonDto> pokemonDtos = pokemonList.Select(pkmn => new PokemonDto()
        {
            Id = pkmn.Id,
            Name = pkmn.Name,
            Type = pkmn.Types[0].Type.Name,
            Wins = pkmn.Wins,
            Losses = pkmn.Losses,
            Ties = pkmn.Ties
        });

    //Order it properly before sending back
        return Ok(OrderPokemonDtoList(pokemonDtos, sortBy, sortDirection));
    }


    private static List<PokemonDto> OrderPokemonDtoList(IEnumerable<PokemonDto> pokemonDtos, string sortBy, string sortDirection)
    {
        return $"{sortBy}-{sortDirection}" switch
        {
            "wins-asc" => [.. pokemonDtos.OrderBy(pdto => pdto.Wins)],
            "wins-desc" => [.. pokemonDtos.OrderByDescending(pdto => pdto.Wins)],
            "losses-asc" => [.. pokemonDtos.OrderBy(pdto => pdto.Losses)],
            "losses-desc" => [.. pokemonDtos.OrderByDescending(pdto => pdto.Losses)],
            "ties-asc" => [.. pokemonDtos.OrderBy(pdto => pdto.Ties)],
            "ties-desc" => [.. pokemonDtos.OrderByDescending(pdto => pdto.Ties)],
            "name-asc" => [.. pokemonDtos.OrderBy(pdto => pdto.Name)],
            "name-desc" => [.. pokemonDtos.OrderByDescending(pdto => pdto.Name)],
            "id-asc" => [.. pokemonDtos.OrderBy(pdto => pdto.Id)],
            "id-desc" => [.. pokemonDtos.OrderByDescending(pdto => pdto.Id)],
            _ => [.. pokemonDtos],
        };
        ;
    }

    private void Battle(Pokemon pokemon1, Pokemon pokemon2)
    {
        string pokemon1Type = pokemon1.Types.First(t => t.Slot == 1).Type.Name;
        string pokmeon2Type = pokemon2.Types.First(t => t.Slot == 1).Type.Name;

        if (StrongAgainst[pokemon1Type] == pokmeon2Type) 
        {
            pokemon1.Wins++;
            pokemon2.Losses++;
        } else if (StrongAgainst[pokmeon2Type] == pokemon1Type)
        {
            pokemon2.Wins++;
            pokemon1.Losses++;
        } else if (pokemon1.BaseExperience > pokemon2.BaseExperience)
        {
            pokemon1.Wins++;
            pokemon2.Losses++;
        } else if (pokemon2.BaseExperience > pokemon1.BaseExperience)
        {
            pokemon2.Wins++;
            pokemon1.Losses++;
        } else
        {
            pokemon1.Ties++;
            pokemon2.Ties++;
        }
    }
}
