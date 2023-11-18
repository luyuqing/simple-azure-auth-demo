using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TodoList.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Todo>> Get()
    {
        List<Todo> Todos = new()
        {
            new Todo {
                Id = 1,
                Task = "Rename the Cat",
                Description = "Spend at least 30 minutes brainstorming a new, majestic name for the cat. Consider royal titles."
            },

            new Todo {
                Id = 2,
                Task = "Sock Sorting Championship",
                Description = "Organize all mismatched socks into a gladiatorial arena and let them battle for the title of 'Ultimate Sock Pair'."
            },
             new Todo {
                Id = 3,
                Task = "Converse with a Plant",
                Description = "Have a deep, philosophical conversation with the nearest houseplant. Discuss photosynthesis ethics."
            },
            new Todo {
                Id = 4,
                Task = "DIY Spaceship",
                Description = "Using only household items, construct a spaceship. Bonus points for making 'beep-boop' sounds."
            },
            new Todo {
                Id = 5,
                Task = "Nap Time Evaluation",
                Description = "Conduct a thorough assessment of the couch's napping potential. Prepare a detailed report."
            },
            new Todo {
                Id = 6,
                Task = "Dance Like a Chicken",
                Description = "Perform an impromptu chicken dance in the living room. Evaluate your performance."
            },
            new Todo {
                Id = 7,
                Task = "Become a Time Traveler",
                Description = "Set all the clocks in the house to different times. Live in multiple time zones simultaneously."
            },
            new Todo {
                Id = 8,
                Task = "Pirate Day",
                Description = "Talk like a pirate for an hour. Extra points for wearing a pirate hat."
            },
            new Todo {
                Id = 9,
                Task = "Sock Puppet Saga",
                Description = "Create an epic saga using sock puppets. Record the performance for future generations."
            },
            new Todo {
                Id = 10,
                Task = "Dinner Roulette",
                Description = "Spin a globe and wherever your finger lands, cook a dish from that country."
            }
        };
        return Todos;
    }
}