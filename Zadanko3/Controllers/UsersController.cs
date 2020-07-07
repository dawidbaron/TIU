using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Zadanko3.DTO;
using Zadanko3.Entities;
using Zadanko3.Entity;
using Zadanko3.Helpers;
using Zadanko3.Models;
using Zadanko3.Repository;
using Zadanko3.Services;

namespace Zadanko3.Controllers
{
    [Authorize]
    [Route("user")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IUserRepository _userRepository;

        public UsersController(IUserService userService, IUserRepository userRepository)
        {
            _userService = userService;
            _userRepository = userRepository;

        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreatePerson(UserPostDto personToAdd)
        {
            try
            {
                var guid = await _userRepository.addUser(personToAdd);
                return guid == Guid.Empty ? (IActionResult)StatusCode(500) : Ok(guid);
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }

        [Authorize(Roles = Roles.User)]
        [HttpGet("all")]
        public async Task<IActionResult> getAllUser()
        {
            var people = await _userRepository.getAllUsers();
            return Ok(people.ToList());
        }

        [Authorize(Roles = Roles.User)]
        [HttpPut("sort")]
        public async Task<IActionResult> updateSort(SortDto sortDto)
        {
            var edited = await _userService.updateSort(sortDto);
            return Ok(edited);
        }

        [HttpGet("sort/{id}")]
        public async Task<IActionResult> getSort(Guid id)
        {
            var sort = await _userService.getSortById(id);
            return Ok(sort);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> getUserById(Guid id)
        {
            var user = await _userRepository.getUserById(id);
            return Ok(user);
        }



        [AllowAnonymous]
        [HttpGet("/sort/pagable/{take}/{skip}")]
        public async Task<IActionResult> getUserWithSortingAndPagable(int take, int skip, SortDto sortDto)
        {
            var users = await _userRepository.getUsersOnPage(take, skip, sortDto);

            return Ok(users);
        }



        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> updateUser(Users userEntity)
        {

            var edited = await _userService.updateUser(userEntity);
            return Ok(edited);
        }

        [AllowAnonymous]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePerson(Guid id)
        {
            var user = _userService.deleteByUserId(id);
            return Ok(user);
        }


        [Produces("text/csv")]
        [HttpGet("csv")]
        public async Task<IActionResult> GetAllPeopleCsv()
        {
            try
            {
                var peoplePaged = await _userRepository.getAllUsers();
                if (peoplePaged == null)
                    return (IActionResult)NotFound();

                var peoplePagedCsvString = MapperToCSV.CsvConverter(peoplePaged);
                var peoplePagedCsv = System.Text.Encoding.UTF8.GetBytes(peoplePagedCsvString);
                string fileName = "users.csv";

                return File(peoplePagedCsv, "text/csv", fileName);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

    }
}
