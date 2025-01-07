using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.LostDto;
using API.Entities;
using AutoMapper;

namespace API.Mappings
{
    public class ComplaintProfile:Profile
    {
         public ComplaintProfile()
        {
            CreateMap<Complaint, ComplaintDto>()
             .ForMember(dest => dest.CreatedBy, opt =>
                    opt.MapFrom(src => src.CreatedBy != null ? src.CreatedBy.DisplayName : null))
                .ForMember(dest => dest.UpdatedBy, opt =>
                    opt.MapFrom(src => src.UpdatedBy != null ? src.UpdatedBy.DisplayName : null));
            CreateMap<ComplaintSaveDto, Complaint>();
        }
    }
}