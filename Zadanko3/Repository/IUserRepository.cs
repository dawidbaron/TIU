using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Zadanko3.DTO;
using Zadanko3.Entities;

namespace Zadanko3.Repository
{
    public interface IUserRepository
    {

        Task<IEnumerable<Users>> getAllUsers();
        Task<IEnumerable<Users>> getUsersOnPage(int take, int skip, SortDto sortDto);

        Task<Guid> addUser(UserPostDto userPostDto);
        Task<Users> getUserById(Guid userId);
        Task<Boolean> saveAll();
        Task<Boolean> deleteUser(Users userEntity);
        Task<SortDto> getSortingById(Guid userId);

    }
}
