using DataService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AroTech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly HotelDataService _hotelService;

        public HotelsController(HotelDataService hotelService) =>
            _hotelService = hotelService;

        //[HttpGet]
        //public async Task<List<Hotel>> Get() =>
        //    await _hotelService.GetAsync();

        [HttpGet]
        public async Task<List<Hotel>> Get()
        {
            var list = await _hotelService.GetAsync();
            if (list.Count == 0)
            {
                using (StreamReader r = new StreamReader("sampleData.json"))
                {
                    string json = r.ReadToEnd();
                    List<Hotel> items = JsonConvert.DeserializeObject<List<Hotel>>(json);

                    foreach (Hotel item in items)
                    {
                        await _hotelService.CreateAsync(item);
                    }
                }
                list = await _hotelService.GetAsync();
            }
            return list;
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Hotel>> Get(string id)
        {
            var hotel = await _hotelService.GetAsync(id);

            if (hotel is null)
            {
                return NotFound();
            }

            return hotel;
        }

        //[HttpGet]
        //public async Task<ActionResult<List<Hotel>>> GetList()
        //{
        //    var book = await _hotelService.GetAsync();

        //    if (book is null)
        //    {
        //        return NotFound();
        //    }

        //    return book;
        //}

        [HttpPost]
        public async Task<IActionResult> Post(Hotel newHotel)
        {

            var newHotel1 = new Hotel();
            newHotel1.HotelName = "Hampton By Hilton Dublin City Centre";
            newHotel1.Address = new Address { City = "Galway", Country = "Ireland", StreetName1 = "New Street", ZipCode = "12345" };
            newHotel1.Description =
            "Boasting a fitness centre, bar, shared lounge and free WiFi, Hampton By Hilton Dublin City Centre is situated in Dublin, 200 m from St. Michan's Church and 500 m from Jameson Distillery. This property is located a short distance from attractions such as St Patrick's Cathedral, National Museum of Ireland - Decorative Arts & History, and Trinity College. Guests can have a drink at the snack bar." +

"The hotel will provide guests with air - conditioned rooms offering a desk, a kettle, a fridge, a safety deposit box, a flat-screen TV and a private bathroom with a shower.At Hampton By Hilton Dublin City Centre the rooms come with bed linen and towels." +
"Guests at the accommodation can enjoy a continental or a buffet breakfast." +
 " Non-stop advice is available at the reception, where staff speak English, Spanish, Irish and Portuguese." +

  "Popular points of interest near Hampton By Hilton Dublin City Centre include The City Hall, Dublin Castle " +
  "and Chester Beatty Library. The nearest airport is Dublin Airport, 11 km from the hotel." +
  "This is our guests' favourite part of Dublin, according to independent reviews." +


"  Couples particularly like the location — they rated it 9.1 for a two-person trip.`;";

            newHotel1.Images = new List<Image> { };
            newHotel1.Images.Add(new Image { Url = "/images/316591144.webp" });
            newHotel1.Images.Add(new Image { Url = "/images/44358273.webp" });
            await _hotelService.CreateAsync(newHotel1);

            return CreatedAtAction(nameof(Get), new { id = newHotel.Id }, newHotel);
        }

       
    }
}
