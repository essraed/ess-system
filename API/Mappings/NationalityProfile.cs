using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.LostDto;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class NationalityProfile:Profile
    {
         public NationalityProfile()
        {
            CreateMap<Nationality, NationalityDto>();
        }
    }
}