using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Zadanko3.Data;
using Zadanko3.DTO;
using Zadanko3.Entities;
using Zadanko3.Entity;

namespace Zadanko3.Repository
{
    public class UserRepository : IUserRepository
    {

        private readonly DataContext dataContext;

        public UserRepository(DataContext _context)
        {
            dataContext = _context;
        }

        public async Task<Guid> addUser(UserPostDto userPostDto)
        {
            Users user = new Users()
            {
                UserId = Guid.NewGuid(),
                FirstName = userPostDto.FirstName,
                LastName = userPostDto.LastName,
                ImgPath = userPostDto.ImgPath,
                UserName = userPostDto.UserName,
                Password = userPostDto.Password,
                Role = Roles.User,
                SortAsc = 1,
                SortField = "FirstName"
            };

            await dataContext.Users.AddAsync(user);
            await saveAll();
            return user.UserId;

        }

        public async Task<bool> deleteUser(Users userEntity)
        {

            dataContext.Users.Remove(userEntity);
            await saveAll();
            return true;

        }


        public async Task<IEnumerable<Users>> getUsersOnPage(int take, int skip, SortDto sortDto)
        {
            //  return await dataContext.UsersEntity.ToListAsync();


            if (sortDto.SortAsc == 1)
            {
                switch (sortDto.SortField)
                {
                    case "FirstName":
                        return await dataContext.Users.OrderByDescending(o => o.FirstName).Skip(skip).Take(take).ToListAsync();

                    case "LastName":
                        return await dataContext.Users.OrderByDescending(o => o.LastName).Skip(skip).Take(take).ToListAsync();
                }

            }
            else
            {
                switch (sortDto.SortField)
                {
                    case "FirstName":
                        return await dataContext.Users.OrderBy(o => o.FirstName).Skip(skip).Take(take).ToListAsync();

                    case "LastName":
                        return await dataContext.Users.OrderBy(o => o.LastName).Skip(skip).Take(take).ToListAsync();
                }
            }

            return await dataContext.Users.ToListAsync();

        }

        public async Task<IEnumerable<Users>> getAllUsers()
        {
            return await dataContext.Users.ToListAsync();
        }

        public async Task<SortDto> getSortingById(Guid userId)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            SortDto sortDto = new SortDto();
            sortDto.SortAsc = user.SortAsc;
            sortDto.SortField = user.SortField;

            return sortDto;
        }


        public async Task<Users> getUserById(Guid id)
        {

            var user = await dataContext.Users.FirstOrDefaultAsync(x => x.UserId == id);
            return user;
        }

        /*   public Task<IEnumerable<UserEntity>> getUsersOnPage(int take, int skip, SortDto sortDto)
           {
               throw new NotImplementedException();
           }*/

        public async Task<Boolean> saveAll()
        {
            return await dataContext.SaveChangesAsync() > 0;
        }
    }
}
