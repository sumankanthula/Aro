using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataService
{
    public class HotelDataService
    {
        private readonly IMongoCollection<Hotel> _hotelCollection;

        public HotelDataService(IOptions<HotelDatabaseSettings> hotelDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                hotelDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                hotelDatabaseSettings.Value.DatabaseName);

            _hotelCollection = mongoDatabase.GetCollection<Hotel>(
                hotelDatabaseSettings.Value.HotelsCollectionName);
        }

        public async Task<List<Hotel>> GetAsync() =>
            await _hotelCollection.Find(_ => true).ToListAsync();

        public async Task<Hotel?> GetAsync(string id) =>
            await _hotelCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Hotel newHotel) =>
            await _hotelCollection.InsertOneAsync(newHotel);

    }
}
