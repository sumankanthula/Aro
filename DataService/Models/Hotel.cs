using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DataService
{
    public class Hotel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [JsonPropertyName("Name")]
        [BsonElement("Name")]
        public string HotelName { get; set; } = null!;
        public string Description { get; set; }
        public decimal Price { get; set; }
        public Address Address { get; set; }
        public List<Image> Images { get; set; }
        public List<Feature> Features { get; set; }
        public List<Feature> RoomCategorey { get; set; }
    }
    public class Feature
    {
        public string Name { get; set; }
    }

    public class Image
    {
        public string Url { get; set; }
    }
    public class Address
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string StreetName1 { get; set; } = null!;
        public string StreetName2 { get; set; } = null!;
        public string StreetName3 { get; set; } = null!;
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }

    }
}
