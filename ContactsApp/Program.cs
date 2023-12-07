using ContactsApp;
using ContactsApp.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ContactsDbContext>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ContactsDbContext>();
    // db.Database.EnsureDeleted();
    db.Database.EnsureCreated();
}

app.MapContactsEndpoints();

app.Run();
