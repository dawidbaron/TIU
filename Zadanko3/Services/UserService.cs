using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Zadanko3.DTO;
using Zadanko3.Entities;
using Zadanko3.Helpers;
using Zadanko3.Repository;

namespace Zadanko3.Services
{
    public interface IUserService
    {
        UserDto Authenticate(string username, string password);
        
        public Task<Users> updateUser(Users userEntity);
        public Task<Users> deleteByUserId(Guid u1serId);
        public Task<Users> updateSort(SortDto sortDto);
        public Task<SortDto> getSortById(Guid id);
    }

    public class UserService : IUserService
    {   
        private readonly Settings _appSettings;
        private readonly IUserRepository userRepository;
        public UserService(IOptions<Settings> appSettings, IUserRepository _userRepository)
        {
            _appSettings = appSettings.Value;
            userRepository = _userRepository;
        }


        public UserDto Authenticate(string username, string password)
        {
            var users = userRepository.getAllUsers().Result;
            var user = users.SingleOrDefault(x => x.UserName == username && x.Password == password);
                      
            if (user == null)
                return null;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            UserDto userDto = new UserDto();
           
            userDto.Token = tokenHandler.WriteToken(token);
            userDto.Role = user.Role;
            return userDto;
        }


        public async Task<Users> deleteByUserId(Guid userId)
        {
            var user = await userRepository.getUserById(userId);

            await userRepository.deleteUser(user);

            return user;
        }

        public async Task<Users> updateUser(Users userEntity)
        {

            var user = await userRepository.getUserById(userEntity.UserId);

            user.LastName = userEntity.LastName;
            user.FirstName = userEntity.FirstName;

            await userRepository.saveAll();

            return user;
        }
        public async Task<Users> updateSort(SortDto sortDto)
        {

            var user = await userRepository.getUserById(sortDto.UserId);

            user.SortField = sortDto.SortField;
            user.SortAsc = sortDto.SortAsc;

            await userRepository.saveAll();

            return user;
        }

        public async Task<SortDto> getSortById(Guid userId)
        {

            var user = await userRepository.getUserById(userId);
            SortDto sortDto = new SortDto();
            sortDto.UserId = user.UserId;
            sortDto.SortField = user.SortField;
            sortDto.SortAsc = user.SortAsc;

            return sortDto;
        }
    }
}
