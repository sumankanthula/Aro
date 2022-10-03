using System;

namespace DataService
{
    public class HotelDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string HotelsCollectionName { get; set; } = null!;
    }
}
