using DataService;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace DataImport
{
    class Program
    {
        public IConfigurationRoot Configuration { get; set; }
        static void Main(string[] args)
        {

            // var configuration = new ConfigurationBuilder().SetBasePath();
            ////.SetBasePath(System.IO.Directory.GetCurrentDirectory())
            ////.AddJsonFile($"appsettings.json");
            //configuration.AddConfiguration()

            //var config = configuration.Build();
            //var connectionString = config.GetConnectionString("ConnectionString");

            var configBuilder = new ConfigurationBuilder();
            var config = configBuilder.Build();
            var services = new ServiceCollection();
            var test = config.GetSection("AroTechHotelDatabase");
            //services.Configure<HotelDatabaseSettings>(;

            services.AddSingleton<HotelDataService>();


            Console.WriteLine("Hello World!");
        }
    }
}
