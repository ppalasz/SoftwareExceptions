using System;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using SoftwareExceptions.DB.Data;
using SoftwareExceptions.DB.Services;


namespace SoftwareExceptions.Startup
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			var connectionString = Configuration.GetConnectionString("Default");

			services
				.AddDbContext<SoftExceptionsDbContext>(option => option
					.UseSqlServer(connectionString));

			services.AddControllers();

			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo
				{
					Title = "WebApi",
					Version = "v1"
				});
			});

			services.AddScoped<ISoftwareExceptionService, SoftwareExceptionService>();
			services.AddScoped<ICustomerService, CustomerService>();
			services.AddScoped<ISoftwareVersionService, SoftwareVersionService>();
			services.AddResponseCaching();
			services.AddHttpContextAccessor();

			services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
				.AddMicrosoftIdentityWebApp(Configuration.GetSection("AzureAd"));

			var mapperConfig = new MapperConfiguration(mc =>
			{
				mc.AddProfile(new MappingProfile());
			});

			var mapper = mapperConfig.CreateMapper();
			services.AddSingleton(mapper);

		}

		public void Configure(
			IApplicationBuilder app,
			IWebHostEnvironment env,
			SoftExceptionsDbContext productsDbContext)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c
					.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApi v1")
				);
			}
			else
			{
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseRouting();
			//app.UseResponseCaching();
			app.UseAuthorization();
			app.UseAuthentication();

			app.UseEndpoints(endpoints =>
			{
				//endpoints.MapControllers();

				endpoints.MapControllerRoute(
					name: "default",
					pattern: "api/{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.Options.StartupTimeout = TimeSpan.FromSeconds(120);
					spa.UseReactDevelopmentServer(npmScript: "start");
				}
			});


			//productsDbContext.Database.EnsureCreated();
		}
	}
}
