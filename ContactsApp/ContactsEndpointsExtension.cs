using ContactsApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsApp
{
    public static class ContactsEndpointsExtension
    {
        public static void MapContactsEndpoints(this WebApplication app)
        {
            app.MapGet("/contacts", async (ContactsDbContext contactsDbContext) =>
            {
                var contacts = await contactsDbContext.Contacts.ToListAsync();
                return Results.Ok(contacts);
            });

            app.MapGet("/contacts/{id}", async (int id, ContactsDbContext contactsDbContext) =>
            {
                var contact = await contactsDbContext.Contacts.FindAsync(id);
                return Results.Ok(contact);
            });

            app.MapPost("/contacts", async([FromBody] Contact contact, ContactsDbContext contactsDbContext) =>
            {
                await contactsDbContext.Contacts.AddAsync(contact);
                await contactsDbContext.SaveChangesAsync();
                return Results.Ok(contact);
            });

            app.MapPut("/contacts", async([FromBody] Contact contact, ContactsDbContext contactsDbContext) =>
            {
                var contactToUpdate = await contactsDbContext.Contacts.FindAsync(contact.Id);
                if (contactToUpdate == null)
                {
                    return Results.NotFound();
                }
                contactToUpdate.Name = contact.Name;
                contactToUpdate.PhoneNumber = contact.PhoneNumber;
                contactToUpdate.JobTitle = contact.JobTitle;
                contactToUpdate.BirthDate = contact.BirthDate;
                await contactsDbContext.SaveChangesAsync();
                return Results.NoContent();
            });

            app.MapDelete("/contacts/{id}", async(int id, ContactsDbContext contactsDbContext) =>
            {
                var contactToDelete = await contactsDbContext.Contacts.FindAsync(id);
                if (contactToDelete == null)
                {
                    return Results.NotFound();
                }
                contactsDbContext.Remove(contactToDelete);
                await contactsDbContext.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}
